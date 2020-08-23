import React, { useEffect } from "react";
import { CREATE_BRAND, GET_ALL_BRANDS } from "../../queries";
import DialogForm from "../DialogForm";
import styles from "./brandsDatePanel.module.scss";
import { useMutation, useQuery } from "@apollo/client";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

function BrandsDatePanel(props) {
  const [brandsDate, setBrandsDate] = React.useState([]);
  const [activeYear, setActiveYear] = React.useState("");
  const { data } = useQuery(GET_ALL_BRANDS);
  const [createBrandQuery] = useMutation(CREATE_BRAND, {
    refetchQueries: () => [{ query: GET_ALL_BRANDS }],
  });
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    dateHandling: Date.now(),
    numberCatalog: "",
    year: new Date().getFullYear(),
    numberCatalogMichel: "",
    name: "",
    series: "",
    edition: "",
    size: "",
    denomination: "",
    note: "",
  });

  useEffect(() => {
    if (data) {
      let brands = data.allBrands.filter(
        (thing, index, self) =>
          index === self.findIndex((t) => t.year === thing.year)
      );
      setBrandsDate(brands.slice().sort((a, b) => a.year - b.year));
    }
  }, [data]);

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dateHandling: date.getTime(),
      year: date.getFullYear(),
    });
  };

  const createBrand = (event) => {
    event.preventDefault();
    createBrandQuery({ variables: formData });
    setOpen(false);
  };

  const getBrandsYear = (brand) => {
    props.updateAllBrands(brand);
    setActiveYear(brand.year);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeValueForm = (e) => {
    if (e.target.type === "number") {
      setFormData({ ...formData, [e.target.name]: +e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className={styles.date}>
      <ul className={styles.date__lists}>
        {brandsDate.map((brand) => (
          <li
            key={brand.id}
            className={activeYear === brand.year ? styles.active : null}
            onClick={getBrandsYear.bind(this, brand)}
          >
            {brand.year}
          </li>
        ))}
      </ul>
      <Fab aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <DialogForm
        open={open}
        formData={formData}
        title="Добавить марку в каталог"
        handleClose={handleClose}
        handleDateChange={handleDateChange}
        changeValueForm={changeValueForm}
        createBrand={createBrand}
        edit={false}
      />
    </div>
  );
}

export default BrandsDatePanel;
