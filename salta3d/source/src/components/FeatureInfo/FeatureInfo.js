import React from 'react'

import PropTypes from 'prop-types'

import { Box } from '@mui/material'

import styles from './styles'

const FeatureInfo = ({ contenido }) => {
  const titulo = contenido.filter((p) => p.nombreId === 'nombre')[0].valor
  return (
    <Box sx={styles.featureInfo}>
      <h4>{titulo}</h4>
      <Box sx={styles.markerProperties}>
        {contenido.map((p) =>
          p.nombreId !== 'nombre' &&
          p.nombreId[0] !== '_' &&
          p.valor[0] !== '<' &&
          p.valor !== '' ? (
            <Box sx={styles.markerProperty} key={p.nombreId}>
              <Box component="span" sx={styles.markerPropertiesKey}>
                {p.nombre}:{' '}
              </Box>
              <Box component="span" sx={styles.ultimaActualizacion}>
                {p.valor}
              </Box>
            </Box>
          ) : null
        )}
      </Box>
    </Box>
  )
}

FeatureInfo.propTypes = {
  contenido: PropTypes.arrayOf(PropTypes.object)
}

FeatureInfo.defaultProps = {
  contenido: []
}
export default FeatureInfo
