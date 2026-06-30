import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actions as mapActions } from 'state/ducks/map'

import { Explore } from '@mui/icons-material/icons'

import { Box, IconButton } from '@mui/material'

import styles from './styles'

const North = () => {
  const dispatch = useDispatch()
  const cameraPitch = useSelector((state) => state.map.camera?.pitch)
  const cameraBearing = useSelector((state) => state.map.camera?.bearing)
  const [isNorth, setIsNorth] = useState(
    cameraPitch === 0 && cameraBearing === 0
  )

  useEffect(() => {
    setIsNorth(cameraPitch === 0 && cameraBearing === 0)
  }, [cameraBearing, cameraPitch])

  const handleNorth = () => {
    dispatch(
      mapActions.cameraUpdated({
        pitch: 0,
        bearing: 0
      })
    )
  }

  return (
    <Box>
      <IconButton
        color={isNorth ? 'primary' : 'secondary'}
        onClick={handleNorth}
        sx={styles.button}
      >
        <Explore sx={isNorth && styles.northOrientation} />
      </IconButton>
    </Box>
  )
}
export default North
