import React, { useEffect } from 'react'
import styles from './brandsDatePanel.module.scss'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import CustomTextField from '../CustomTextField'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_BRAND, GET_ALL_BRANDS } from '../../queries'

function BrandsDatePanel(props) {
    const [brandsDate, setBrandsDate] = React.useState([]);
    const [activeYear, setActiveYear] = React.useState("");
    const { data } = useQuery(GET_ALL_BRANDS);
    const [createBrandQuery] = useMutation(CREATE_BRAND, { refetchQueries: () => [{ query: GET_ALL_BRANDS }] });
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        dateHandling: new Date().getTime(),
        numberCatalog: "",
        year: new Date().getFullYear(),
        numberCatalogMichel: "",
        name: "",
        series: "",
        edition: "",
        size: "",
        denomination: "",
        note: ""
    });

    useEffect(() => {
        if (data) {
            let brands = data.allBrands.filter((thing, index, self) =>
                index === self.findIndex((t) => (
                    t.year === thing.year
                ))
            )
            setBrandsDate(brands.slice().sort((a, b) => a.year - b.year))
        }
    }, [data])

    const handleDateChange = (date) => {
        setFormData({ ...formData, dateHandling: date.getTime(), year: date.getFullYear() });
        console.log(date.getFullYear())
    };

    const createBrand = () => {
        createBrandQuery({ variables: formData });
        setOpen(false);
    }

    const getBrandsYear = (brand) => {
        props.updateAllBrands(brand)
        setActiveYear(brand.year)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const changeValueForm = e => {
        if (e.target.type === "number") {
            setFormData({ ...formData, [e.target.id]: +e.target.value })
        } else {
            setFormData({ ...formData, [e.target.id]: e.target.value })
        }
    }

    return (
        <div className={styles.date}>
            <ul className={styles.date__lists}>
                {brandsDate.map((brand) => (
                    <li key={brand.id} className={activeYear === brand.year ? styles.active : null} onClick={getBrandsYear.bind(this, brand)}>{brand.year}</li>
                ))}
            </ul>
            <Fab aria-label="add" onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="sm">
                <DialogTitle id="form-dialog-title">Добавить марку в каталог</DialogTitle>
                <DialogContent>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                disableToolbar
                                variant="outlined"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="dateHandling"
                                label="Дата ввода в обращение"
                                value={formData.dateHandling}
                                fullWidth
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <CustomTextField
                        label="Номер по каталогу"
                        onChange={changeValueForm}
                        value={formData.numberCatalog}
                        id="numberCatalog"
                        type="number" />
                    <CustomTextField
                        onChange={changeValueForm}
                        value={formData.numberCatalogMichel}
                        label="Номер по каталогу Michel"
                        id="numberCatalogMichel"
                        type="number"
                    />
                    <CustomTextField
                        label="Наименование"
                        onChange={changeValueForm}
                        value={formData.name}
                        id="name"
                        type="text"
                    />
                    <CustomTextField
                        label="Серия"
                        onChange={changeValueForm}
                        value={formData.series}
                        id="series"
                        type="number"
                    />
                    <CustomTextField
                        label="Тираж"
                        onChange={changeValueForm}
                        value={formData.edition}
                        id="edition"
                        type="number"
                    />
                    <CustomTextField
                        label="Размер"
                        onChange={changeValueForm}
                        value={formData.size}
                        id="size"
                        type="number"
                    />
                    <CustomTextField
                        label="Номинал"
                        onChange={changeValueForm}
                        value={formData.denomination}
                        id="denomination"
                        type="number"
                    />
                    <CustomTextField
                        label="Заметки"
                        onChange={changeValueForm}
                        value={formData.note}
                        id="note"
                        multiline
                        variant="outlined"
                        rows={4}
                        type="text"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Закрыть
                    </Button>
                    <Button onClick={createBrand} color="primary">
                        Добавить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default BrandsDatePanel;