import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import CustomTextField from "../CustomTextField";
import DeleteIcon from "@material-ui/icons/Delete";

const titleStyles = {
  display: "flex",
  justifyContent: "space-between",
  paddingRight: 24,
  alignItems: "center",
};

function DialogForm({
  open,
  handleClose,
  createBrand,
  formData,
  handleDateChange,
  changeValueForm,
  title,
  edit,
  updateBrand,
  brandName,
  deleteBrand,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="sm"
    >
      <form onSubmit={edit ? updateBrand : createBrand}>
        {edit ? (
          <div style={titleStyles}>
            <DialogTitle>{brandName}</DialogTitle>
            <Button
              variant="contained"
              color="secondary"
              onClick={deleteBrand}
              startIcon={<DeleteIcon />}
            >
              Удалить
            </Button>
          </div>
        ) : (
          <DialogTitle>{title}</DialogTitle>
        )}
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-between">
              <KeyboardDatePicker
                disableToolbar
                variant="outlined"
                format="MM/dd/yyyy"
                fullWidth
                margin="normal"
                name="dateHandling"
                label="Дата ввода в обращение"
                value={+formData.dateHandling}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <CustomTextField
            helperText="Введите номер по каталогу"
            label="Номер по каталогу"
            onChange={changeValueForm}
            required
            value={formData.numberCatalog}
            name="numberCatalog"
            type="number"
          />
          <CustomTextField
            helperText="Введите номер по каталогу Michecl"
            onChange={changeValueForm}
            value={formData.numberCatalogMichel}
            label="Номер по каталогу Michel"
            required
            name="numberCatalogMichel"
            type="number"
          />
          <CustomTextField
            helperText="Введите наименование"
            label="Наименование"
            required
            onChange={changeValueForm}
            value={formData.name}
            name="name"
            type="text"
          />
          <CustomTextField
            helperText="Введите серию"
            label="Серия"
            required
            onChange={changeValueForm}
            value={formData.series}
            name="series"
            type="number"
          />
          <CustomTextField
            helperText="Введите тираж"
            label="Тираж"
            required
            onChange={changeValueForm}
            value={formData.edition}
            name="edition"
            type="number"
          />
          <CustomTextField
            helperText="Введите размер"
            label="Размер"
            required
            onChange={changeValueForm}
            value={formData.size}
            name="size"
            type="number"
          />
          <CustomTextField
            helperText="Введите номинал"
            label="Номинал"
            required
            onChange={changeValueForm}
            value={formData.denomination}
            name="denomination"
            type="number"
          />
          <CustomTextField
            helperText="Введите заметки"
            label="Заметки"
            required
            onChange={changeValueForm}
            value={formData.note}
            name="note"
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
          <Button type="submit" color="primary">
            {edit ? "Изменить" : "Добавить"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default DialogForm;
