import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'

import Polygon from './Polygon'

const Parcel = () => {
  const smpParcel = useSelector((state) => state.parcel.smp)
  const geomCoords = useSelector((state) => state.parcel.geomCoords)
  const isBuildableLoading = useSelector((state) => state.buildable.isLoading)
  const IFCModelBlob = useSelector((state) => state.IFC.IFCModelBlob)
  const isParcelSelected = useSelector((state) => state.parcel.isParcelSelected)
  const isVolumetriaChecked = useSelector(
    (state) => state.IFC.isVolumetriaChecked
  )
  const [smpList, setSmpList] = useState([])

  useEffect(() => {
    if (isBuildableLoading) return

    if (!isVolumetriaChecked && !IFCModelBlob) {
      setSmpList([smpParcel])
    }
    if (isVolumetriaChecked) {
      setSmpList((prev) =>
        smpParcel ? [...new Set([...prev, smpParcel])] : []
      )
    }
  }, [smpParcel, isVolumetriaChecked, IFCModelBlob, isBuildableLoading])

  return (
    <>
      {isParcelSelected && geomCoords?.length && (
        <Polygon smpList={smpList} geomCoords={geomCoords} />
      )}
    </>
  )
}

export default Parcel
