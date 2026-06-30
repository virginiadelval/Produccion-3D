import React, { useEffect } from 'react'

import PropTypes from 'prop-types'

import { Box, Typography, Grid, makeStyles, Paper } from '@mui/material'

import decorators from 'theme/fontsDecorators'

import ContainerBar from 'components/Sections/ContainerBar'
import SelectParcel from 'components/Sections/SubSection/SelectParcel'

import { actions as affectationsActions } from 'state/ducks/affectations'

import { useDispatch, useSelector } from 'react-redux'

import styles from './styles'

export const AffectationDetails = ({
  styles,
  title,
  subtitle,
  fill,
  decorators
}) => (
  <Box>
    <Box sx={styles.card}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={decorators.bold}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">{subtitle}</Typography>
        </Grid>
        <Grid item xs={12} sx={styles.gridItem}>
          <Typography variant="body2" sx={styles.gridText}>
            {fill}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Box>
)

const Affectations = () => {
  const data = useSelector((state) => state.affectations.data)
  const dispatch = useDispatch()
  const smp = useSelector((state) => state.parcel.smp)
  const isLoading = useSelector((state) => state.affectations.isLoading)

  useEffect(() => {
    dispatch(affectationsActions.clickOnParcel(smp))
  }, [dispatch, smp])

  return (
    <ContainerBar type="list">
      {!isLoading &&
        smp &&
        data &&
        data.map(({ id, title, subtitle, desc }) => (
          <AffectationDetails
            key={id}
            styles={styles}
            decorators={decorators}
            subtitle={subtitle}
            title={title}
            fill={desc}
          />
        ))}
      {!isLoading && smp && data && data.length === 0 && (
        <Typography variant="body1" sx={styles.body1}>
          No posee afectaciones
        </Typography>
      )}
      {smp && data === null && !isLoading && (
        <Paper sx={styles.paper}>
          <Typography variant="body1" sx={styles.body1}>
            No hay datos disponibles
          </Typography>
        </Paper>
      )}
      {isLoading && (
        <Typography variant="body1" sx={styles.body1}>
          Cargando...
        </Typography>
      )}
      {!isLoading && !smp && <SelectParcel />}
    </ContainerBar>
  )
}

AffectationDetails.propTypes = {
  styles: PropTypes.objectOf(makeStyles).isRequired,
  decorators: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  fill: PropTypes.string
}
AffectationDetails.defaultProps = {
  fill: ''
}

export default Affectations
