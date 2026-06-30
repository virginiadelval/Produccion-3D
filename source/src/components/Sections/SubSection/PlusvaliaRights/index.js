import React from 'react'
import ContainerBar from 'components/Sections/ContainerBar'
import Model1 from './Model1'
import Model2 from './Model2'
import Model3 from './Model3'
import Model4 from './Model4'
import { useSelector } from 'react-redux'
import SelectParcel from 'components/Sections/SubSection/SelectParcel'
import usePlusvaliaRights from './usePlusvaliaRights'
import { CircularProgress, Box } from '@mui/material'
import styles from './styles'

const PlusvaliaRights = () => {
  const isParcelSelected = useSelector((state) => state.parcel.isParcelSelected)

  const {
    isLoading,
    isModel1,
    isModel2,
    isModel3,
    isModel4
  } = usePlusvaliaRights()

  return (
    <ContainerBar type="table">
      {!isParcelSelected && !isLoading && <SelectParcel />}
      {isLoading && (
        <Box sx={styles.loadingContainer}>
          <CircularProgress />
        </Box>
      )}
      {isParcelSelected && !isLoading && isModel1 && <Model1 />}
      {isParcelSelected && !isLoading && isModel2 && <Model2 />}
      {isParcelSelected && !isLoading && isModel3 && <Model3 />}
      {isParcelSelected && !isLoading && isModel4 && <Model4 />}
    </ContainerBar>
  )
}

export default PlusvaliaRights
