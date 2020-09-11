import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styles from './stampTable.module.scss';
import { withRouter } from 'react-router-dom';
import FilterTableStamps from './FilterTableStamps';
import tableNames from '../../initialValue/tableNames';

function StampTable({ stampCatalog, history }) {
  return (
    <TableContainer component={Paper}>
      <Table className={styles.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {tableNames.map((cell, index) => (
              <TableCell key={index} align='center'>
                {cell}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {stampCatalog.map((stamp, index) => (
            <TableRow
              key={stamp.id}
              className={`${styles.table__item} ${
                index % 2 !== 0 ? styles.table__item_effect : ''
              }`}
              onClick={() => history.push(`/stamp/${stamp.id}`)}
            >
              {FilterTableStamps(stamp)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default withRouter(StampTable);
