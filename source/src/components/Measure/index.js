import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { actions as mapActions } from 'state/ducks/map'

import { ButtonBase } from '@mui/material'
import Timeline from '@mui/icons-material/Timeline'

import Lines from 'components/Lines'

const Measure = () => {
  const isActive = useSelector((state) => !!state?.map?.isMeasureActive)
  const [coordinates, setCoordinates] = useState([])
  const coord = useSelector((state) => state?.map?.selectedCoords)
  const refMenu = useRef(null)
  const dispatch = useDispatch()
  const [isFirstMount, setIsFirstMount] = useState(true)
  const isParcelSelected = useSelector((state) => state.parcel.isParcelSelected)

  useEffect(() => {
    if (isParcelSelected && isFirstMount) return
    if (isActive && coord) {
      const { lng, lat } = coord
      if (!coordinates.find(([ln, la]) => ln === lng && la === lat)) {
        setCoordinates([...coordinates, [lng, lat]])
      }
    }
  }, [isActive, coord, coordinates, isFirstMount, isParcelSelected])

  useEffect(() => {
    if (!isActive) {
      dispatch(mapActions.clickOnMap(null))
      setCoordinates([])
    }
  }, [isActive])

  useEffect(() => {
    if (coord && isFirstMount && isActive && isParcelSelected) {
      setIsFirstMount(false)
      dispatch(mapActions.clickOnMap(null))
    }
  }, [coord, isFirstMount, isActive, isParcelSelected])

  const controlGroup = document.querySelector(
    '.maplibregl-ctrl-top-right .maplibregl-ctrl-group'
  )
  useEffect(() => {
    if (controlGroup) {
      controlGroup.appendChild(refMenu.current)
    }
  }, [refMenu, controlGroup])

  const handleMeasure = () => {
    setIsFirstMount(true)
    dispatch(mapActions.isMeasureActive(!isActive))
  }
  return (
    <>
      {isActive && <Lines points={coordinates} />}
      <ButtonBase ref={refMenu}>
        <Timeline
          sx={{ color: isActive ? '#EECE2F!important;' : 'inherit' }}
          onClick={handleMeasure}
        />
      </ButtonBase>
    </>
  )
}

export default Measure
