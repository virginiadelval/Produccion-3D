# Memoria Técnica de Modificaciones Realizadas

Este documento registra los archivos de configuración, lógica y UI modificados durante el día de hoy, detallando sus secciones y propósitos específicos.

---

### 1. Cambio de Color de la Parcela Seleccionada
Define el color de realce de la parcela seleccionada por el usuario (tanto en la extrusión 3D como en el plano 2D de fondo).

* **Archivo de Configuración:** [configBase.json](file:///D:/DGEM/IDEMSA/WEB/salta3d-OLD/source/public/configBase.json)
* **Sección:** `"parcelLayers"`
* **Detalle del Objeto:**
  * **Capa 3D (`edif`):**
    ```json
    "edif": {
      "id": "edif_smp",
      "type": "fill-extrusion",
      "paint": {
        "fill-extrusion-color": "#05C9FA",  // <-- Color celeste actualizado
        "fill-extrusion-opacity": 0.6
      }
    }
    ```
  * **Capa 2D (`parcel`):**
    ```json
    "parcel": {
      "id": "parcel_smp",
      "type": "fill",
      "paint": {
        "fill-color": "#05C9FA",            // <-- Color celeste de fondo 2D
        "fill-opacity": 0.4
      }
    }
    ```

---

### 2. Incorporación de Capa Base OSM Gris
Configuración, lógica y visualización de la nueva opción de mapa base en escala de grises.

* **Archivo de Configuración de Estilo:** [configBase.json](file:///D:/DGEM/IDEMSA/WEB/salta3d-OLD/source/public/configBase.json)
  * **Sección:** `"baseLayers"`
  * **Detalle del Objeto:** Se creó la definición `"baseLayer_gris"` utilizando OpenStreetMap y aplicando una saturación de `-1` en los estilos de renderizado raster para forzar el color gris.
    ```json
    "baseLayer_gris": {
      "id": "baseLayer_gris",
      "type": "raster",
      "source": "osm",
      "paint": {
        "raster-saturation": -1             // <-- Desaturación completa (Gris)
      }
    }
    ```

* **Archivo de Lógica y UI:** [Map/index.js](file:///D:/DGEM/IDEMSA/WEB/salta3d-OLD/source/src/components/Map/index.js)
  * **Sección useEffect (Líneas 141-160):** Lógica encargada de alternar la propiedad `'visibility'` del mapa de MapLibre de las capas base (`baseLayer_principal`, `baseLayer_secundario`, `baseLayer_argenmap`, `baseLayer_gris`) según la variable de estado `activeBaseLayer`.
  * **Sección Render / bottomMenu (Líneas 344-355):** Componente `<MinimapOption>` que añade el botón del menú inferior de capas base, con la acción de seleccionar `'baseLayer_gris'` y aplicando un filtro CSS `filter: 'grayscale(100%)'` sobre su vista previa.

---

### 3. Imágenes de Vista Previa de Capas Base
Actualización de los iconos de los "cuadraditos" de las capas base en el menú inferior del mapa.

* **Directorio de Assets:** `src/img/`
* **Archivos:** 
  * `capabase_1.png` (Vista previa OSM)
  * `capabase_2.png` (Vista previa Google Maps)
  * `capabase_3.png` (Vista previa Argenmap)
* **Archivo de Consumo:** [Map/index.js](file:///D:/DGEM/IDEMSA/WEB/salta3d-OLD/source/src/components/Map/index.js)
  * Importaciones en la cabecera del archivo:
    ```javascript
    import imgCapaBasePrincipal from 'img/capabase_1.png'
    import imgCapaBaseSecundaria from 'img/capabase_2.png'
    import imgCapaBaseArgenmap from 'img/capabase_3.png'
    ```

---

### 4. Corrección de Compilación en Node.js (OpenSSL v3)
Solución al fallo de compilación en producción (`npm run build`) causado por la incompatibilidad de algoritmos criptográficos obsoletos en versiones de Node.js v17+.

* **Archivo:** [package.json](file:///D:/DGEM/IDEMSA/WEB/salta3d-OLD/source/package.json)
* **Sección:** `"scripts"` -> `"build"`
* **Detalle del Objeto:** Se incorporó el flag `--openssl-legacy-provider` para instruir a Node.js que use el proveedor criptográfico heredado de OpenSSL.
  ```json
  "scripts": {
    "build": "env-cmd -f .env react-scripts --openssl-legacy-provider build"
  }
  ```

---

### 5. Estilización y Estructura del Panel de Capas (WMS)
Define la estructura del panel lateral que agrupa y despliega las distintas capas geográficas (WMS) del proyecto.

#### A. Estructura de los Acordeones y Categorías del Panel
Define la jerarquía visual de los grupos (acordeones) y el comportamiento de sus elementos de control e información.
* **Archivo de Lógica y UI:** [WmsGroup.js](file:///D:/DGEM/IDEMSA/WEB/salta3d-OLD/source/src/components/Sections/SubSection/LayerGroup/WmsGroup.js)
* **Flujo de Renderizado (`WmsGroup` - Línea 341):**
  * Obtiene el listado de capas desde el estado global de Redux (`state.map.wmsLayers`).
  * Clasifica de forma interactiva las capas iterando sobre la constante `CATEGORIES`.
  * Renderiza cada grupo usando el componente `<Accordion>` de Material UI.
  * Incorpora la propiedad `defaultExpanded={true}` en el acordeón del grupo `'Código de Planeamiento Urbano Ambiental (CPUA)'` (Línea 378) para que este se muestre abierto por defecto al cargar el panel de capas.
  * Agrupa las capas no catalogadas bajo una sección comodín llamada `"Otras Capas"`.
* **Organización de Categorías (`CATEGORIES` - Línea 281):**
  Es el listado que asocia títulos descriptivos con arreglos de IDs técnicos de las capas:
  * **Barrios:** `['wms_barrios', 'wms_loteos']`
  * **Espacios verdes:** `['wms_espacios_verdes']`
  * **Código de Planeamiento Urbano Ambiental (CPUA):** `['wms_ejido', 'wms_puc', 'wms_catastros', 'wms_manzanas', 'wms_zonificacion', ...]`
  * **Zonificación Tributaria:** `['wms_zonificacion_ii', 'wms_zonificacion_tgi', 'wms_zonificacion_comercial']`
  * **Control Ciudadano:** `['wms_carteleria', 'wms_reclamos', 'wms_mico_macocentro']`
* **Interactividad por Fila (`WmsItem` - Línea 32):**
  Representa cada capa individual dentro de la lista. Incorpora los siguientes controles y lógica interna:
  * **Visibilidad (Checkbox):** Conectado al manejador `layerChangeHandler`, dispara la acción de Redux `actions.toggleWmsLayer({ id })` para mostrar/ocultar los datos geográficos en el mapa interactivo.
  * **Ajustes de Capa (Engranaje - `<Popover>`):** Abre una ventana flotante de ajustes (`SettingsIcon`) con las siguientes funciones:
    1. **Acercar a la capa (Zoom):** Icono `<ZoomInIcon>` que dispara la acción `actions.zoomToWmsLayer({ id })`, re-enfocando la cámara de MapLibre en los límites (`boundingBox`) específicos de dicha capa.
    2. **Orden de Renderizado (Subir/Bajar):** Iconos de flechas que disparan la acción `actions.moveWmsLayer({ id, direction: 'up' | 'down' })` para modificar la superposición de capas en el mapa. Se deshabilitan mediante las propiedades `isFirst` e `isLast`.
    3. **Opacidad (Slider):** Componente `<Slider>` que ajusta el nivel de transparencia de la capa en tiempo real. Dispara `actions.changeWmsLayerOpacity({ id, opacity: newValue })` en pasos de `0.05`.
    4. **Descargas (WFS):** Botones que convierten dinámicamente el endpoint del servicio WMS a WFS (reemplazando `/wms` por `/wfs`) y estructuran las URLs para la descarga directa en formatos vectoriales:
       * **GeoJSON:** `[URL_WFS]?request=GetFeature&service=WFS&version=1.0.0&typeName=[capa]&outputFormat=application/json`
       * **Shapefile:** `[URL_WFS]?request=GetFeature&service=WFS&version=1.0.0&typeName=[capa]&outputFormat=SHAPE-ZIP`
    5. **Leyenda Dinámica (GetLegendGraphic):** Genera y renderiza una imagen de leyenda llamando directamente al endpoint del servidor de mapas con los parámetros de personalización:
       `[URL_WMS]?service=WMS&request=GetLegendGraphic&format=image/png&width=20&height=20&layer=[capa]&legend_options=forceRuleLabel:on;fontSize:11`

#### B. Datos Estáticos de Capas del Panel
Archivo de datos estáticos en formato JSON con la definición e inicialización de cada recurso geográfico del servidor.
* **Archivo de Datos:** [wmsConfig.json](file:///D:/DGEM/IDEMSA/WEB/salta3d-OLD/source/public/wmsConfig.json)
* **Propiedades del Esquema JSON:**
  * `id`: Identificador único usado para el mapeo con categorías y visibilidad (ej: `"wms_zonificacion"`).
  * `name`: Título descriptivo de la capa mostrado en el panel (ej: `"Zonificación de Usos del Suelo"`).
  * `url`: Endpoint base del servidor de mapas GeoServer (ej: `"https://geocloud.municipalidadsalta.gob.ar/geoserver/wms"`).
  * `layers`: Nombre técnico de la capa publicada en GeoServer (ej: `"public:Zonificacion_CPUA2025_CGO_15102025"`).
  * `format`: Formato de salida de imagen solicitado al servidor (ej: `"image/png"`).
  * `transparent`: Define si el renderizado del mapa de fondo debe ser transparente (`true`).
  * `visible`: Estado de visibilidad inicial al cargar la aplicación (`true` o `false`).
  * `opacity`: Opacidad por defecto configurada en un rango numérico de `0` a `1` (ej: `0.6`).
  * `getFeatureInfo`: Define si la capa acepta peticiones interactivas de información al hacer clic sobre ella en el mapa (`true`).
  * `boundingBox`: Array de arrays que delimita el rectángulo envolvente de coordenadas geográficas `[[min_lng, min_lat], [max_lng, max_lat]]`, utilizado para el auto-zoom de la capa.
