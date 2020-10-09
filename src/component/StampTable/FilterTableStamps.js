import TableCell from '@material-ui/core/TableCell';
import getCurrentDate from '../../controllers/getCurrentDate';
import React from 'react';

function FilterTableStamps(currentStamp) {
  let filterStamps = [];
  for (const [key, value] of Object.entries(currentStamp)) {
    if (
      key !== 'id' &&
      key !== 'year' &&
      key !== 'note' &&
      key !== 'includeCollection' &&
      key !== 'country' &&
      key !== 'stampImage' &&
      key !== 'dateHandling'
    ) {
      filterStamps.push(value);
    }
    if (key === 'dateHandling') {
      filterStamps.push(getCurrentDate(value));
    }
  }
  return filterStamps.map((item, index) => (
    <TableCell key={index} align='center' component='th' scope='row'>
      {item || '-'}
    </TableCell>
  ));
}

export default FilterTableStamps;
