// eslint-disable-next-line no-var
// eslint-disable-next-line no-var
var configs = {
  urlConfigBase: 'configBase.json',
  urlLayers: 'layersConfig.json',
  includes: {
    urlAPI: '',
    urlPhoto: '',
    urlWsUsig: '',
    urlApiServicioGeo: '',
    urlPDF: '',
    urlCAD: ''
  },
  replaces: [
    {
      key: '{{urlVectorTile}}',
      value: ''
    },
    {
      key: '{{urlBsAs}}',
      value: ''
    },
    {
      key: '{{urlCDN2}}',
      value: ''
    },
    {
      key: '{{urlBoletin}}',
      value: ''
    },
    {
      key: '{{urlBsAsData}}',
      value: ''
    },
    {
      key: '{{urlBcra}}',
      value: ''
    },
    {
      key: '{{urlTAD}}',
      value: ''
    },
    {
      key: '{{urlUsig}}',
      value: ''
    },
    {
      key: '{{urlCedom}}',
      value: ''
    },
    {
      key: '{{urlEpsg}}',
      value: 'https://epsg.org/'
    }
  ]
}
// var configs = {
//   urlConfigBase: 'configBase.json',
//   urlLayers: 'layersConfig.json',
//   includes: {
//     urlAPI: 'https://epok.buenosaires.gob.ar',
//     urlPhoto: 'https://fotos.usig.buenosaires.gob.ar',
//     urlWsUsig: 'https://ws.usig.buenosaires.gob.ar',
//     urlApiServicioGeo: 'https://ws.usig.buenosaires.gob.ar',
//     urlPDF: 'http://ssplan.buenosaires.gov.ar/man_atipicas/imagenes',
//     urlCAD: 'https://epok.buenosaires.gob.ar/cur3d/dxf'
//   },
//   replaces: [
//     {
//       key: '{{urlVectorTile}}',
//       value: 'https://vectortiles.usig.buenosaires.gob.ar/cur3d/'
//     },
//     {
//       key: '{{urlBsAs}}',
//       value: 'https://www.buenosaires.gob.ar/'
//     },
//     {
//       key: '{{urlCDN2}}',
//       value: 'https://cdn2.buenosaires.gob.ar/'
//     },
//     {
//       key: '{{urlBoletin}}',
//       value: 'https://documentosboletinoficial.buenosaires.gob.ar/publico/'
//     },
//     {
//       key: '{{urlBsAsData}}',
//       value: 'https://data.buenosaires.gob.ar/'
//     },
//     {
//       key: '{{urlBcra}}',
//       value: 'https://www.bcra.gov.ar/'
//     },
//     {
//       key: '{{urlTAD}}',
//       value: 'https://lbapw.agip.gob.ar/claveciudad'
//     },
//     {
//       key: '{{urlUsig}}',
//       value: 'https://servicios.usig.buenosaires.gob.ar'
//     },
//     {
//       key: '{{urlCedom}}',
//       value: 'http://www2.cedom.gob.ar/'
//     },
//     {
//       key: '{{urlEpsg}}',
//       value: 'https://epsg.org/'
//     }
//   ]
// }
