import React, { useEffect } from 'react'
import ContainerBar from 'components/Sections/ContainerBar'
import { Box, Typography, Link, CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import decorators from 'theme/fontsDecorators'
import { actions as patrimonyActions } from 'state/ducks/patrimony'
import SelectParcel from 'components/Sections/SubSection/SelectParcel'

const Patrimony = () => {
  const catalogacion = useSelector((state) => state.buildable.data.catalogacion)
  const patrimonyData = useSelector((state) => state.patrimony)
  const isLoading = useSelector((state) => state.patrimony.isLoading)
  const isParcelSelected = useSelector((state) => state.parcel.isParcelSelected)
  const smp = useSelector((state) => state.parcel.smp)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(patrimonyActions.clickOnParcel(smp))
  }, [smp])

  const parcelCatalogada = {
    cautelar: 'cautelar',
    estructural: 'estructural',
    integral: 'integral',
    especial: 'especial'
  }

  const isCatalogada = parcelCatalogada[catalogacion?.proteccion?.toLowerCase()]

  const manzanaParcelaRegex = /([-]'\d{3}[A-Za-z]?)([-]'\d{3}[A-Za-z]$)/

  const SMPParcelaLowerCase = smp?.replace(
    manzanaParcelaRegex,
    (match, manzana, parcela, offset, string) => {
      return manzana + parcela.toLowerCase()
    }
  )

  function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1)
  }

  return (
    <ContainerBar type="list">
      {!isParcelSelected && !isLoading && <SelectParcel />}
      {isLoading && isParcelSelected && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {isParcelSelected && !isLoading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="subtitle2" sx={decorators.bold}>
                Protección -
              </Typography>
              <Typography variant="title" color="inherit" noWrap>
                &nbsp;
              </Typography>
              <Typography variant="subtitle2">
                {catalogacion?.proteccion}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="subtitle2" sx={decorators.bold}>
                Catalogación -
              </Typography>
              <Typography variant="title" color="inherit" noWrap>
                &nbsp;
              </Typography>
              <Typography variant="subtitle2">
                {catalogacion?.catalogacion}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="subtitle2" sx={decorators.bold}>
                Estado -
              </Typography>
              <Typography variant="title" color="inherit" noWrap>
                &nbsp;
              </Typography>
              <Typography variant="subtitle2">
                {catalogacion?.estado}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="subtitle2" sx={decorators.bold}>
                Denominación:{' '}
                <Typography variant="subtitle2" component="span">
                  {catalogacion?.denominacion}
                </Typography>
              </Typography>
            </Box>
            {isCatalogada && (
              <Typography variant="subtitle2" mt="12px">
                La parcela se encuentra catalogada con nivel de protección{' '}
                {capitalizeFirstLetter(catalogacion?.proteccion.toLowerCase())}{' '}
                por lo cual son de aplicación los grados de intervención 1/2/3/4
                (Cuadro de grados de intervención según nivel de protección
                edilicia art. 9.1.3.2.2.2)
              </Typography>
            )}
            {isCatalogada && (
              <Typography variant="subtitle2" mt="12px">
                Podes consultar también la{' '}
                <Link
                  href="https://buenosaires.gob.ar/sites/default/files/2023-09/guia-buenas-practicas2023.pdf"
                  target="_blank"
                >
                  Guía de buenas prácticas en inmuebles de valor patrimonial
                </Link>
              </Typography>
            )}
          </Box>
          {patrimonyData.hasCatalogacion && (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex' }}>
                <Typography
                  variant="subtitle2"
                  sx={decorators.bold}
                  component="p"
                >
                  Ficha de Catalogación:{' '}
                  <Typography variant="subtitle2" component="span">
                    <Link
                      href={`http://ssplan.buenosaires.gov.ar/aphficha_ciudad3d/${SMPParcelaLowerCase}.pdf`}
                      target="_blank"
                    >
                      DESCARGA
                    </Link>
                  </Typography>
                </Typography>
              </Box>
            </Box>
          )}
          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            mb="15px"
          >
            {patrimonyData?.monumentoData.length > 0 && (
              <>
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="subtitle1" sx={decorators.bold}>
                    Monumento Histórico Nacional
                  </Typography>
                </Box>

                {patrimonyData?.monumentoData.map(
                  ({ bien, categoria, nro, anio, norma }) => (
                    <Box sx={{}} key={bien}>
                      <Box sx={{ display: 'flex' }}>
                        <Typography variant="subtitle2" sx={decorators.bold}>
                          {bien}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Typography variant="subtitle2" component="span">
                          {categoria}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex' }}>
                        <Typography variant="subtitle2">
                          {norma} - {nro} - {anio}
                        </Typography>
                      </Box>
                    </Box>
                  )
                )}
              </>
            )}
          </Box>
        </Box>
      )}
    </ContainerBar>
  )
}

export default Patrimony
