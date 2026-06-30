import React, { useEffect } from 'react'

import PropTypes from 'prop-types'

import {
  Box,
  Typography,
  Grid,
  makeStyles,
  TextField,
  Autocomplete
} from '@mui/material'

import decorators from 'theme/fontsDecorators'

import { useDispatch, useSelector } from 'react-redux'

import ContainerBar from 'components/Sections/ContainerBar'
import SelectParcel from 'components/Sections/SubSection/SelectParcel'

import { getAlert, getUsesLink } from 'utils/configQueries'

import { actions as usesActions } from 'state/ducks/uses'

import styles from './styles'

const Details = ({ styles, title, fill, afluencia, iconsData, decorators }) => (
  <Box>
    <Box sx={styles.card}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={decorators.bold}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption">{fill}</Typography>
        </Grid>
      </Grid>
    </Box>
  </Box>
)

const Uses = () => {
  const data = useSelector((state) => state.uses.data)
  const isParcelaEnMicrocentro = useSelector(
    (state) => state.uses.isParcelaEnMicrocentro
  )
  const dispatch = useDispatch()
  const smp = useSelector((state) => state.basicData.data.smp)
  const isLoading = useSelector((state) => state.uses.isLoading)

  const categories =
    data?.length > 0 &&
    data[0].usesCategories.map(({ id, nombre: title }) => ({ id, title }))

  const rubros =
    data?.length > 0 &&
    data[0].rubros?.length > 0 &&
    data[0].rubros.map(({ rubro_id: id, rubro: title }) => ({ id, title }))

  const references =
    data?.length > 0 && data[0].references ? data[0].references : null

  useEffect(() => {
    dispatch(usesActions.clickOnParcel(smp))
  }, [dispatch, smp])

  const handleCategoriaChange = (e, value) => {
    dispatch(usesActions.categorySelected(value.id))
  }

  const handleRubroChange = (e, value) => {
    dispatch(usesActions.rubroSelected(value.id))
  }

  return (
    <ContainerBar type="list">
      {data?.length > 0 &&
        data.map(({ id, title, desc, afluencia, iconsData }) => (
          <Details
            key={id}
            styles={styles}
            decorators={decorators}
            title={title}
            fill={desc}
            afluencia={afluencia}
            iconsData={iconsData}
          />
        ))}
      {isParcelaEnMicrocentro && (
        <Details
          decorators={decorators}
          styles={styles}
          title={'Parcelas dentro del Área Central'}
          fill={
            'Esta parcela se encuentra dentro del Área Central según el artículo 3.14.3. Se encuentra prohibida la construcción, ampliación y autorización de garajes y/o playas de estacionamiento cubiertas o descubiertas.'
          }
        />
      )}
      {categories?.length > 0 && (
        <Autocomplete
          sx={styles.combo}
          limitTags={3}
          options={categories}
          // value={value}
          // onOpen={() => setFocusFilter(true)}
          // onClose={() => setFocusFilter(false)}
          getOptionLabel={(option) => option.title}
          onChange={handleCategoriaChange}
          renderInput={(params) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <TextField
              {...params}
              variant="outlined"
              label="Categorias"
              placeholder="Categoria"
            />
          )}
        />
      )}
      {rubros?.length > 0 && (
        <Autocomplete
          sx={styles.combo}
          limitTags={3}
          options={rubros}
          // value={value}
          // onOpen={() => setFocusFilter(true)}
          // onClose={() => setFocusFilter(false)}
          getOptionLabel={(option) => option.title}
          onChange={handleRubroChange}
          renderInput={(params) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <TextField
              {...params}
              variant="outlined"
              label="Rubros"
              placeholder="rubro"
            />
          )}
        />
      )}
      {references !== null && (
        <Box sx={styles.card}>
          <Grid sx={styles.container}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={decorators.bold}>
                Permitido mixtura de usos:
              </Typography>
            </Grid>
            {references?.permitido_mixtura_de_usos?.length > 0 &&
              references.permitido_mixtura_de_usos.map(({ detalle }) => (
                <Grid item xs={12} key={detalle}>
                  <Typography variant="caption">{detalle}</Typography>
                </Grid>
              ))}
          </Grid>
          <Grid sx={styles.container}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={decorators.bold}>
                Bicicletas:
              </Typography>
            </Grid>
            {references?.bicicletas?.length > 0 &&
              references.bicicletas.map(({ detalle }) => (
                <Grid item xs={12} key={detalle}>
                  <Typography variant="caption">{detalle}</Typography>
                </Grid>
              ))}
          </Grid>
          <Grid sx={styles.container}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={decorators.bold}>
                Estacionamientos:
              </Typography>
            </Grid>
            {references?.estacionamientos?.length > 0 &&
              references.estacionamientos.map(({ detalle }) => (
                <Grid item xs={12} key={detalle}>
                  <Typography variant="caption">{detalle}</Typography>
                </Grid>
              ))}
          </Grid>
          <Grid sx={styles.container}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={decorators.bold}>
                Carga y Descarga:
              </Typography>
            </Grid>
            {references?.cargaydescarga?.length > 0 &&
              references.cargaydescarga.map(({ detalle }) => (
                <Grid item xs={12} key={detalle}>
                  <Typography variant="caption">{detalle}</Typography>
                </Grid>
              ))}
          </Grid>
          <Grid sx={styles.container}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={decorators.bold}>
                Observaciones:
              </Typography>
            </Grid>
            {references?.observaciones?.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="caption">
                  {references.observaciones}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
      {data.length === 0 && !isLoading && !smp && <SelectParcel />}
      {data.length === 0 && !isLoading && smp && (
        <Typography variant="body1">{getAlert('no_usos').text}</Typography>
      )}
      {isLoading && <Typography variant="body1">Cargando...</Typography>}
    </ContainerBar>
  )
}

Details.propTypes = {
  styles: PropTypes.objectOf(makeStyles).isRequired,
  decorators: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  fill: PropTypes.string.isRequired,
  afluencia: PropTypes.string.isRequired,
  iconsData: PropTypes.arrayOf(PropTypes.object).isRequired
}
export default Uses
