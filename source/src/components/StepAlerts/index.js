import React from 'react'
import { Modal, Box, List, ListItemText } from '@mui/material'
import { useDispatch } from 'react-redux'
import { actions as actionsAlert } from 'state/ducks/alerts'

import styles from './styles'

const StepAlerts = ({
  // eslint-disable-next-line react/prop-types
  isModalOpenAlert,
  content
}) => {
  const dispatch = useDispatch()
  const closeModal = () => {
    dispatch(actionsAlert.isVisibleAlert({ isVisible: false }))
  }

  return (
    <Modal open={isModalOpenAlert} onClose={closeModal} sx={styles.modal}>
      <Box sx={styles.containerList}>
        <List>
          {
            // eslint-disable-next-line react/prop-types
            content.map(({ title, text, image }) => (
              <Box key={`${title}_${text}`}>
                <ListItemText sx={styles.title} primary={title} />
                <ListItemText sx={styles.text} primary={text} />
                {image && (
                  <img
                    src={`./images/${image}`}
                    alt="Artículo"
                    style={{
                      width: '607px',
                      height: '360px',
                      objectFit: 'contain'
                    }}
                  />
                )}
              </Box>
            ))
          }
        </List>
      </Box>
    </Modal>
  )
}

export default StepAlerts
