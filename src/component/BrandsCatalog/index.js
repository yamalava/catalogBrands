import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import styles from './brandsCatalog.module.scss'
import BrandsDatePanel from '../BrandsDatePanel'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { useQuery } from '@apollo/client'
import { GET_ALL_BRANDS } from '../../queries'

function BrandsCatalog() {
    const [brandsCatalog, setBrandsCatalog] = React.useState([])
    let { refetch, data } = useQuery(GET_ALL_BRANDS)

    useEffect(() => {
        if (data) {
            let sort = data.allBrands.slice().sort((a, b) => a.numberCatalog - b.numberCatalog)
            setBrandsCatalog(sort)
        }
    }, [data])

    const updateAllBrands = brand => {
        refetch({ year: brand.year })
    }

    return (
        <section className={styles.brands}>
            <div className={styles.brands__date}>
                <BrandsDatePanel updateAllBrands={updateAllBrands} />
            </div>
            <div className={styles.brands__catalog}>
                {brandsCatalog.length === 0 ? (
                    <p className={styles.brands__catalog_info}>Добавьте марку для отображения ее в списке</p>
                ) : (
                        <TableContainer component={Paper}>
                            <Table className={styles.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Номер по каталогу</TableCell>
                                        <TableCell align="right">Номер по каталогу Michel</TableCell>
                                        <TableCell align="right">Наименование</TableCell>
                                        <TableCell align="right">Серия</TableCell>
                                        <TableCell align="right">Тираж</TableCell>
                                        <TableCell align="right">Размер</TableCell>
                                        <TableCell align="right">Номинал</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {brandsCatalog.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">
                                                {row.numberCatalog}
                                            </TableCell>
                                            <TableCell align="right">{row.numberCatalogMichel}</TableCell>
                                            <TableCell align="right">{row.name}</TableCell>
                                            <TableCell align="right">{row.series}</TableCell>
                                            <TableCell align="right">{row.edition}</TableCell>
                                            <TableCell align="right">{row.size}</TableCell>
                                            <TableCell align="right">{row.denomination}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )
                }
            </div>
        </section>

    )
}

export default withRouter(BrandsCatalog)