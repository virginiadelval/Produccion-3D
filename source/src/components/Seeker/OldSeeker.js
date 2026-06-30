import React, { useState } from 'react'

import { Autocompleter, Suggester } from '@usig-gcba/autocompleter'
import {
  Box,
  Avatar,
  InputBase,
  ListItemAvatar,
  ListItemText,
  ListItem,
  ListItemButton,
  Paper
} from '@mui/material'
import PlaceIcon from '@mui/icons-material/Place'
import SearchIcon from '@mui/icons-material/Search'
import StarIcon from '@mui/icons-material/Star'

import Downshift from 'downshift'

import PropTypes from 'prop-types'

import styles from './styles'

const Seeker = ({ onSelectItem }) => {
  const [suggestions, setSuggestions] = useState([])

  // Opciones de config del autocomplete
  const options = { maxSuggestions: 5, debug: false }

  // Callbacks del autocomplete
  const suggestionsCallback = (s) => {
    const filteredSuggestions = s.filter(
      (suggestion) => suggestion.type !== 'CALLE' && suggestion.title
    )
    setSuggestions(filteredSuggestions)
  }

  const completeSuggestionsCallback = (sug) => {
    const filteredSuggestions = sug.filter(
      (suggestion) => suggestion.type !== 'CALLE' && suggestion.title
    )
    if (filteredSuggestions.length === 0) {
      setSuggestions([
        {
          data: {
            tipo: 'tipoalerta'
          },
          title: 'No se hallaron resultados coincidentes'
        }
      ])
    }
  }

  const errorCallback = (/* error */) => {
    if (suggestions.length === 0) {
    }
  }

  const autocompleter = new Autocompleter(
    {
      onCompleteSuggestions: completeSuggestionsCallback,
      onSuggestions: suggestionsCallback,
      onError: errorCallback
    },
    options
  )

  const handleInputChange = (event) => {
    const text = event.target.value
    autocompleter.updateSuggestions(text)
  }

  const handleSelectItem = (selectedSuggestion) => {
    if (selectedSuggestion?.title) {
      setSuggestions([])
      if (selectedSuggestion.type === 'CALLE') {
        setSuggestions([
          {
            data: {
              tipo: 'tipoalerta'
            },
            title:
              'El origen indicado es una Calle, por lo tanto debe especificar la altura o bien un cruce para poder continuar con la búsqueda.'
          }
        ])
      }
      Promise.all(
        Suggester.getSuggestionPromises(selectedSuggestion)
      ).then(() => onSelectItem(selectedSuggestion))
    }
  }

  const handleInputBlur = () => {
    setSuggestions([])
  }

  const renderInput = (props) => {
    const { inputProps, styles: StyleClass, ...other } = props
    const direcciónMasLarga = '125'
    return (
      <InputBase
        sx={StyleClass.input}
        inputProps={{
          ...inputProps,
          maxLength: direcciónMasLarga
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...other}
      />
    )
  }

  const renderSuggestion = (suggestionProps) => {
    const { suggestion, index, itemProps, highlightedIndex } = suggestionProps

    const title = suggestion.alias || suggestion.title || suggestion.nombre
    const subTitle = suggestion.subTitle
      ? suggestion.subTitle
      : suggestion.descripcion
    const Icono = suggestion.title ? PlaceIcon : StarIcon

    const isHighlighted = highlightedIndex === index

    return (
      <ListItem
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...itemProps}
        key={index}
        component="div"
        sx={styles.list}
        disablePadding
      >
        <ListItemButton selected={isHighlighted}>
          <ListItemAvatar>
            <Avatar>
              <Icono fontSize="small" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={title} secondary={subTitle} />
        </ListItemButton>
      </ListItem>
    )
  }

  autocompleter.addSuggester('Direcciones', { inputPause: 250 })
  autocompleter.addSuggester('Lugares')
  autocompleter.addSuggester('Catastro')
  autocompleter.addSuggester('CatastroInformal')
  autocompleter.addSuggester('DireccionInformal')

  return (
    <Box>
      <Downshift
        id="usig-autocomplete"
        onSelect={handleSelectItem}
        itemToString={(item) => item?.title || ''}
        initialHighlightedIndex={0}
        defaultHighlightedIndex={0}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          selectedItem
        }) => {
          const { onBlur, onFocus, ...inputProps } = getInputProps({
            placeholder: 'Buscar',
            onChange: (e) => {
              handleInputChange(e)
            }
          })

          return (
            <div>
              <Paper sx={styles.root} data-tour="search-bar">
                <SearchIcon sx={{ marginLeft: '5px' }} />
                {renderInput({
                  styles,
                  inputProps,
                  onBlur: handleInputBlur
                })}
              </Paper>

              <Box
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...getMenuProps()}
                sx={styles.menuBox}
              >
                {suggestions.length !== 0 ? (
                  <Paper sx={styles.paper} square>
                    {suggestions.map((suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion }),
                        highlightedIndex,
                        selectedItem
                      })
                    )}
                  </Paper>
                ) : null}
              </Box>
            </div>
          )
        }}
      </Downshift>
    </Box>
  )
}

Seeker.propTypes = {
  onSelectItem: PropTypes.func.isRequired
}

export default Seeker
