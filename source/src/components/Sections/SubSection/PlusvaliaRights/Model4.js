import React from 'react'
import { Typography, Box } from '@mui/material'
import decorators from 'theme/fontsDecorators'

const Model3 = () => {
  return (
    <Box>
      <Typography sx={[{ marginBottom: '30px' }, decorators.bold]}>
        PLUSVALÍA
      </Typography>

      <Typography>
        Parcela que no generó mayor aprovechamiento de su capacidad
        constructiva, luego del cambio de normativa.
        <br /> Deberá solicitar una interpretación morfológica para poder
        determinar la capacidad constructiva según el Código anterior (CPU).
      </Typography>
    </Box>
  )
}

export default Model3
