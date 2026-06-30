import React from 'react'

// eslint-disable-next-line import/prefer-default-export
export const largeScreenSteps = [
  {
    selector: '',
    content: () => (
      <div>
        <p>
          <b>

            Bienvenida/o!!
            <br />
           Desde este sitio podrá consultar de manera interactiva 
           información vinculada al Código de Planeamiento Urbano Ambiental 
           (CPUA), Obras Privadas y datos catastrales de interés de la Ciudad 
           de Salta.
            <br />


          </b>
        </p>
      </div>
    )
  },
  {
    selector: '.makeStyles-logo-5',
    content: () => (
      <div>
        <p>
          <b>
            AVISO LEGAL
          </b> <br />
          La información publicada tiene carácter orientativo y tiene por finalidad facilitar la comprensión de la normativa urbanística vigente.
          <b><br /><br />
          Su contenido es exclusivamente informativo, no reemplaza los procedimientos administrativos correspondientes ni constituye una certificación oficial.
         </b> <br /><br />
          Se recomienda verificar la información mediante las instancias administrativas pertinentes.
          <br /><br />
          <b>
          La información contenida en este portal es de carácter no vinculante para los trámites realizados ante la Municipalidad de la Ciudad de Salta.
        </b></p>
      </div>
    )
  },
  {
    selector: '[data-tour="Information"]',
    content: () => (
      <div>
        <p>
          La sección  <b>Información  </b>permite acceder a los datos de una parcela a partir de la búsqueda por Número de Catastro o Cuenta.

<br /><br />
          En <b>Datos Básicos</b> se presenta información sobre el inmueble, incluyendo dirección, barrio, servicios disponibles, código urbanístico, zonificación tributaria, actividades permitidas, altura máxima y otros parámetros urbanísticos de interés.

        </p>
      </div>
    )
  },

  {
    selector: '[data-tour="Buildable"]',
    content: () => (
      <div>
        <p>
          Acá vas a poder conocer el <b>Potencial Constructivo</b> de la Parcela.
        </p>
      </div>
    )
  },
  {
    selector: '[data-tour="Transfer"]',
    content: () => (
      <div>
        <p>
          Acá vas a poder realizar una <b>Simulación </b> previa de la <b>Transferencia de Potencial Constructivo</b> de la Parcela.
        </p>
      </div>
    )
  },
  {
    selector: '[data-tour="Report"]',
    content: () => (
      <div>
        <p>
          Acá vas a poder descargar un <b>Reporte</b> con datos básicos de la parcela
          en PDF.
        </p>
      </div>
    )
  },
  {
    selector: '[data-tour="PrivateWorks"]',
    content: () => (
      <div>
        <p>
          Acá vas a poder conocer si una parcela tiene un <b>Expediente de Obras Privadas</b> y obtener un <b>Reporte</b> con datos básicos del expediente en PDF.
        </p>
      </div>
    )
  },
 
  {
    selector: '[data-tour="LayerGroup"]',
    content: () => (
      <div>
        <p>
          Aca podrás navegar de manera interactiva por distintos <b>Capas temáticas</b>, accediendo a 
          información geográfica por categorías y podes descargarlas. 
        </p>
      </div>
    )
  },
  {
    selector: '[data-tour="search-bar"]',
    content: () => (
      <div>
        <p>
          Acá vas a poder buscar por Dirección y ubicarlo en el Mapa.
        </p>
      </div>
    )
  },
  {
    selector: '.maplibregl-ctrl-zoom-in',
    highlightedSelectors: ['.maplibregl-ctrl-zoom-out'],
    content: () => (
      <div>
        <p>Acá vas a poder hacer zoom en el mapa.</p>
      </div>
    )
  },
  {
    selector: '.maplibregl-ctrl-compass',
    content: () => (
      <div>
        <p>Acá vas a poder orientar el norte en el mapa.</p>
      </div>
    )
  },

  {
    selector: '.maplibregl-ctrl-group button:nth-child(5)',
    content: () => (
      <div>
        <p>Acá vas a poder cambiar la vista de 2D a 3D.</p>
      </div>
    )
  },
  {
    selector: '[data-tour="minimap"]',
    content: () => (
      <div>
        <p>Acá vas a poder cambiar a Modo Claro el Mapa.</p>
      </div>
    )
  }
]
