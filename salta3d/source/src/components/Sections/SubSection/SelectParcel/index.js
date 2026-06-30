import React from 'react'

import { Paper, Typography } from '@mui/material'

import styles from './styles'

const LayerGroup = () => {
  return (
    <Paper sx={styles.paper}>
      <Typography variant="body1" sx={styles.body1}>
        Seleccione una parcela
      </Typography>
    </Paper>
  )
}

export default LayerGroup
