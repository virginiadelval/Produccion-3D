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
        Su parcela no cuenta con un FOT determinado, por lo tanto no podrá
        simular la cantidad de UVAs a pagar en concepto de DDHUS. Deberá
        solicitar una interpretación morfológica para poder determinar la
        capacidad constructiva según el Código anterior (CPU).
      </Typography>
    </Box>
  )
}

export default Model3
