import React, { useState } from 'react'

import PropTypes from 'prop-types'

import ActiveLayers from 'components/ActiveLayers'
import Map from 'components/Map'
import Marker from 'components/Marker'
import Parcel from 'components/Parcel'
import Sections from 'components/Sections'
import SideBar from 'components/SideBar'
import LeyPopUp from 'components/LeyPopUp'

import { useSelector } from 'react-redux'

import 'maplibre-gl/dist/maplibre-gl.css'

const Home = ({ token }) => {
  const placeLat = useSelector(
    (state) =>
      state.seeker.place &&
      state.seeker.place.data &&
      state.seeker.place.data.coordenadas &&
      state.seeker.place.data.coordenadas.y
  )
  const placeLng = useSelector(
    (state) =>
      state.seeker.place &&
      state.seeker.place.data &&
      state.seeker.place.data.coordenadas &&
      state.seeker.place.data.coordenadas.x
  )

  const [openPopUp, setOpenPopUp] = useState(true)

  return (
    <>
      {/* <LeyPopUp openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} /> */}
      <Sections />
      <SideBar />
      <Map logged={!!token}>
        <ActiveLayers />
        <Parcel />
        {placeLat && placeLng && (
          <>
            <Marker coords={{ lat: placeLat, lng: placeLng }} />
          </>
        )}
      </Map>
    </>
  )
}
Home.propTypes = {
  token: PropTypes.string
}
Home.defaultProps = {
  token: null
}

export default Home
