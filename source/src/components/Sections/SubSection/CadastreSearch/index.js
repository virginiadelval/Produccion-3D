import React, { useState } from 'react'
import { Box, Typography, TextField, Button, CircularProgress, Alert, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import decorators from 'theme/fontsDecorators'
import ContainerBar from 'components/Sections/ContainerBar'
import { actions as basicDataActions } from 'state/ducks/basicData'
import { actions as categoriesActions } from 'state/ducks/categories'
import styles from './styles'

const CadastreSearch = () => {
  const dispatch = useDispatch()
  const isSelected = useSelector((state) => state.basicData.isSelected)
  const activeSmp = useSelector((state) => state.basicData.data?.smp)

  const [searchVal, setSearchVal] = useState('')
  const [searchType, setSearchType] = useState('catastro')
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState('')

  const handleSearchSubmit = async (e) => {
    e.preventDefault()
    if (!searchVal.trim()) return

    setIsSearching(true)
    setSearchError('')

    try {
      const actionResult = await dispatch(basicDataActions.seekerParcel({
        value: searchVal.trim(),
        type: searchType
      }))

      if (basicDataActions.seekerParcel.rejected.match(actionResult)) {
        throw new Error(actionResult.error.message || 'No se encontró el catastro o la cuenta ingresada.')
      }

      setSearchVal('')
      // Direct navigation to Datos Básicos on success
      dispatch(categoriesActions.sectionSelected('BasicData'))
    } catch (err) {
      console.error(err)
      setSearchError(err.message || 'Error en la búsqueda.')
    } finally {
      setIsSearching(false)
    }
  }

  const handleClearParcel = () => {
    dispatch(basicDataActions.clean())
  }

  return (
    <ContainerBar type="list">
      <Box sx={{
        p: 2.5,
        borderRadius: 2,
        backgroundColor: '#fff',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        mt: 2
      }}>
        <Typography variant="subtitle1" sx={{ ...decorators.bold, mb: 2, color: '#1a237e' }}>
          Consulta de Catastro
        </Typography>

        <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
          Selecciona el tipo de búsqueda, ingresa el número correspondiente y presiona "Buscar".
        </Typography>

        <form onSubmit={handleSearchSubmit}>
          <RadioGroup
            row
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            sx={{
              mb: 2.5,
              '& .MuiFormControlLabel-label': {
                fontSize: '0.9rem',
                fontWeight: '500',
                color: '#444'
              }
            }}
          >
            <FormControlLabel 
              value="catastro" 
              control={<Radio size="small" sx={{ color: '#1976d2', '&.Mui-checked': { color: '#1976d2' } }} />} 
              label="Catastro" 
            />
            <FormControlLabel 
              value="cuenta" 
              control={<Radio size="small" sx={{ color: '#1976d2', '&.Mui-checked': { color: '#1976d2' } }} />} 
              label="Número de Cuenta" 
            />
          </RadioGroup>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder={searchType === 'catastro' ? 'Ej. 163158' : 'Ej. 363017'}
              label={searchType === 'catastro' ? 'Número de Catastro' : 'Número de Cuenta'}
              size="small"
              fullWidth
              variant="outlined"
              disabled={isSearching}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1.5,
                  backgroundColor: '#fafafa',
                }
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={isSearching}
              fullWidth
              sx={{
                borderRadius: 1.5,
                textTransform: 'none',
                fontWeight: 'bold',
                py: 1,
                fontSize: '0.95rem',
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#115293',
                }
              }}
            >
              {isSearching ? <CircularProgress size={24} color="inherit" /> : 'Buscar'}
            </Button>
          </Box>
        </form>

        {searchError && (
          <Alert severity="error" sx={{ mt: 2.5, borderRadius: 1.5 }}>
            {searchError}
          </Alert>
        )}

        {isSelected && activeSmp && (
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 3,
            pt: 2,
            borderTop: '1px dashed rgba(0,0,0,0.1)'
          }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
              Catastro Seleccionado: {activeSmp}
            </Typography>
            <Button
              variant="text"
              size="small"
              onClick={handleClearParcel}
              sx={{
                textTransform: 'none',
                color: '#d32f2f',
                fontWeight: 'bold',
                p: 0,
                minWidth: 0,
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline'
                }
              }}
            >
              Limpiar Selección
            </Button>
          </Box>
        )}
      </Box>
    </ContainerBar>
  )
}

export default CadastreSearch
