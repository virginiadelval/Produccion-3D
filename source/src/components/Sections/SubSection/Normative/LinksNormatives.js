import React from 'react'
import { Box, Link, Typography } from '@mui/material'
import { getNormative } from 'utils/configQueries'
import { useSelector } from 'react-redux'
import ContainerBar from 'components/Sections/ContainerBar'
import styles from './styles'

const LinksNormatives = () => {
  const sectionId = useSelector((state) => state.categories.sectionId)
  const lastIndex = sectionId.length - 1
  const sectionSelected = sectionId[lastIndex]

  return (
    <ContainerBar type="list">
      <Box>
        {getNormative()
          .find((e) => e.id === sectionSelected)
          .link.map(({ text, url }) => (
            <Box sx={styles.Box} key={`${text}_${url}`}>
              {url !== undefined ? (
                <a
                  class="external"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {text}
                </a>
              ) : (
                <Typography sx={styles.title}>{text}</Typography>
              )}
            </Box>
          ))}
      </Box>
    </ContainerBar>
  )
}

export default LinksNormatives
