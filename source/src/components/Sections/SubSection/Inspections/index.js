import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  IconButton
} from '@mui/material'

import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

import ContainerBar from 'components/Sections/ContainerBar'
import CustomTooltip from 'theme/wrappers/CustomTooltip'
import SelectParcel from 'components/Sections/SubSection/SelectParcel'

import decorators from 'theme/fontsDecorators'

import { actions as inspectionActions } from 'state/ducks/inspections'

import { useDispatch, useSelector } from 'react-redux'

import { getInspectionsGroups } from 'utils/configQueries'

import styles from './styles'

const GridPanel = ({ id, columns, data, styles: { bold, tableCell } }) => {
  const tableData = data[id]

  return (
    <>
      {tableData.length === 0 && (
        <TableContainer>
          <Typography sx={styles.notFoundTitle}>No posee</Typography>
        </TableContainer>
      )}
      {tableData.length >= 1 && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map(({ label, field }) => (
                  <TableCell key={field} sx={tableCell}>
                    <Typography variant="subtitle2" sx={bold}>
                      {label}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody sx={tableCell}>
              {
                // Se mapea cada una de las obras para dicha tabla
                // Por lo tanto se crea una nueva TableRow por cada obra
                tableData.map((row, idx) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <TableRow key={`${row.direccion}_${row.fecha}`}>
                    {
                      // Se mapean los valores de cada obra para cada columna
                      columns.map(({ field }) => (
                        <TableCell key={field} sx={tableCell}>
                          {row[field]}
                        </TableCell>
                      ))
                    }
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}

const Inspections = () => {
  const data = useSelector((state) => state.inspections.data)
  const dispatch = useDispatch()
  const smp = useSelector((state) => state.parcel.smp)

  useEffect(() => {
    dispatch(inspectionActions.clickOnParcel(smp))
  }, [dispatch, smp])

  return (
    <ContainerBar type="table">
      <Box sx={styles.boxContainer}>
        {Object.keys(data).length >= 1 &&
          getInspectionsGroups().map(({ id, title, info, link, columns }) => (
            <Box sx={styles.boxSubContainer} key={id}>
              <Box sx={styles.title}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    ...decorators['bold'],
                    ...decorators['marginBottom_ml'],
                    ...styles['notFoundTitle']
                  }}
                >
                  {title}
                </Typography>
              </Box>
              <Box sx={styles.boxIcons}>
                {info && (
                  <CustomTooltip
                    sx={styles.tooltip}
                    title={info}
                    placement="top"
                  >
                    <IconButton
                      sx={styles.iconButton}
                      target="_blank"
                      href={link}
                    >
                      <box-icon name="info-circle" color="#707070" />
                    </IconButton>
                  </CustomTooltip>
                )}
                <IconButton sx={styles.iconButton} target="_blank" href={link}>
                  <box-icon name="cloud-download" color="#707070" />
                </IconButton>
              </Box>
              <GridPanel
                id={id}
                columns={columns}
                data={data}
                styles={{ ...decorators, ...styles }}
              />
            </Box>
          ))}
        {data.length === 0 && <SelectParcel />}
      </Box>
    </ContainerBar>
  )
}

GridPanel.defaultProps = {
  bold: '',
  tableCell: ''
}
GridPanel.propTypes = {
  id: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  bold: PropTypes.string,
  tableCell: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  styles: PropTypes.objectOf(makeStyles).isRequired
}

export default Inspections
