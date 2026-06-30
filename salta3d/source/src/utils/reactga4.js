import ReactGA from 'react-ga4'

export const IFCAnalytics = (action, options = {}) =>
  ReactGA.event({
    category: 'IFC',
    action,
    ...options
  })
export const sectionsAnalytics = (action, options = {}) =>
  ReactGA.event({
    category: 'Secciones',
    action,
    ...options
  })
export const CADAnalytics = (action, options = {}) =>
  ReactGA.event({
    category: 'CAD',
    action,
    ...options
  })
