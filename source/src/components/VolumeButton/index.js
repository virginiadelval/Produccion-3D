import React, { useEffect, useRef } from 'react'
import { ButtonBase } from '@mui/material'
import styles from './styles'
import MapaInteractivoGL from 'utils/MapaInteractivoGL'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
import { actions as smpActions } from 'state/ducks/parcel'
import { useDispatch } from 'react-redux'

const VolumenButton = () => {
  const refMenu = useRef(null)
  const dispatch = useDispatch()
  const mapGL = MapaInteractivoGL()

  const dimensionChange = () => {
    if (mapGL.map.getLayer('edif_smp')) {
      dispatch(smpActions.clean())
      dispatch(smpActions.setIsParcelSelected(false))
    }
  }

  const controlGroup = document.querySelector('.maplibregl-ctrl-top-right')
  useEffect(() => {
    if (controlGroup) {
      controlGroup.appendChild(refMenu.current)
    }
  }, [refMenu, controlGroup])

  return (
    <ButtonBase
      sx={styles.Button}
      ref={refMenu}
      onClick={() => dimensionChange()}
    >
      <CleaningServicesIcon />
    </ButtonBase>
  )
}

export default VolumenButton
