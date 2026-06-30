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
} from '@mui/material'

import ContainerBar from 'components/Sections/ContainerBar'
import SelectParcel from 'components/Sections/SubSection/SelectParcel'

import decorators from 'theme/fontsDecorators'

import { actions as worksActions } from 'state/ducks/works'

import { useDispatch, useSelector } from 'react-redux'
  
import styles from './styles'

const GridPanel = ({ columns, tableData, styles: { bold, tableCell } }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column} sx={tableCell}>
                <Typography variant="subtitle2" sx={bold}>
                  {column}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody styles={{ tableCell }}>
          {
            // Se mapea cada una de las obras para dicha tabla
            // Se mapea cada una de las obras para dicha tabla
            tableData.map((row) => (
              // eslint-disable-next-line react/no-array-index-key
              <TableRow>
                {
                  // Se mapean los valores de cada obra para cada columna
                  columns.map((column, idx) => (
                    <TableCell key={column} sx={tableCell}>
                      {row[idx]}
                    </TableCell>
                  ))
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const Works = () => {
  const data = useSelector((state) => state.works.data)
  const dispatch = useDispatch()
  const smp = useSelector((state) => state.parcel.smp)

  useEffect(() => {
    dispatch(worksActions.clickOnParcel(smp))
  }, [dispatch, smp])

  return (
    <ContainerBar type="table">
      <Box sx={styles.boxContainer}>
        {data?.sade?.length >= 1 &&
          data?.sade?.map(({ title, columns, dataTable }) => (
            <Box sx={styles.boxSubContainer} key={title}>
              <Box sx={styles.title}>
                <Typography
                  variant="subtitle1"
                  sx={[
                    decorators.bold,
                    decorators.marginBottom_ml,
                    styles.title
                  ]}
                >
                  {title}
                </Typography>
              </Box>
              <GridPanel
                columns={columns}
                tableData={dataTable}
                styles={{ ...decorators, ...styles }}
              />
            </Box>
          ))}
        {!smp && <SelectParcel />}
        {smp && !data?.sade?.length && (
          <TableContainer>
            <Typography>No posee</Typography>
          </TableContainer>
        )}
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
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  styles: PropTypes.objectOf(makeStyles).isRequired
}

export default Works
