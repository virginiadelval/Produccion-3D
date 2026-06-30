import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import generateContent from './utils/generateContent'
import styles from './styles'
import decorators from '../../theme/fontsDecorators'

const Alert = ({ id, title, text }) => {
  const { titleSuffix, value, value2 } =
    useSelector((state) => state.alerts.extraData[id]) ?? {}
  const textAux = text?.replace('{{value2}}', value2 ?? '')

  const matches = textAux.matchAll(
    /(?:(?<textStart>[^[\]]*)\[(?<link>[^\]]+)\]\((?:(?<articuloId>articuloIds?:[^)]+)|(?<url>https?:\/\/[^)]+))\)|(?<textEnd>.+)$)/gm
  )

  const content = generateContent(matches, value, value2)

  return (
    <Box key={title} sx={styles.box}>
      {title && (
        <Typography variant="subtitle1" sx={decorators.bold}>
          {title}
          {titleSuffix?.length ? ` - ${titleSuffix}` : ''}
        </Typography>
      )}
      {textAux && <Typography variant="subtitle1">{content}</Typography>}
    </Box>
  )
}

Alert.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default Alert
