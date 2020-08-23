import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styles from "./brandTable.module.scss";

function BrandTable({ brandsCatalog, openEditModal }) {
  return (
    <TableContainer component={Paper}>
      <Table className={styles.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Номер по каталогу</TableCell>
            <TableCell align="center">Номер по каталогу Michel</TableCell>
            <TableCell align="center">Наименование</TableCell>
            <TableCell align="center">Серия</TableCell>
            <TableCell align="center">Тираж</TableCell>
            <TableCell align="center">Размер</TableCell>
            <TableCell align="center">Номинал</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {brandsCatalog.map((brand) => (
            <TableRow
              key={brand.id}
              className={styles.table__item}
              onClick={openEditModal.bind(this, brand)}
            >
              <TableCell align="center" component="th" scope="row">
                {brand.numberCatalog}
              </TableCell>
              <TableCell align="center">{brand.numberCatalogMichel}</TableCell>
              <TableCell align="center">{brand.name}</TableCell>
              <TableCell align="center">{brand.series}</TableCell>
              <TableCell align="center">{brand.edition}</TableCell>
              <TableCell align="center">{brand.size}</TableCell>
              <TableCell align="center">{brand.denomination}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BrandTable;
