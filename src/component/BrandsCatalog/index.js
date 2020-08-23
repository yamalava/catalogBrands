import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import styles from "./brandsCatalog.module.scss";
import BrandsDatePanel from "../BrandsDatePanel";
import { useMutation } from "@apollo/client";
import { GET_ALL_BRANDS, UPDATE_BRAND, DELETE_BRAND } from "../../queries";
import BrandTable from "../BrandTable";
import DialogForm from "../DialogForm";

function BrandsCatalog({ refetch, brandsCatalog }) {
  const [modalInfo, setModalInfo] = useState({
    open: false,
    formData: {},
  });
  const [updateData, setUpdateData] = useState({});
  const [brandName, setBrandName] = useState("");
  let [updateBrandMutation] = useMutation(UPDATE_BRAND, {
    refetchQueries: () => [{ query: GET_ALL_BRANDS }],
  });
  let [deleteBrandMutation] = useMutation(DELETE_BRAND, {
    refetchQueries: () => [{ query: GET_ALL_BRANDS }],
  });

  const updateAllBrands = (brand) => {
    refetch({ year: brand.year });
  };

  const openEditModal = (item) => {
    setModalInfo({ ...modalInfo, open: true, formData: item });
    setUpdateData({ ...updateData, id: item.id });
    setBrandName(item.name);
  };

  const handleClose = () => {
    setModalInfo({ ...modalInfo, open: false });
  };

  const handleDateChange = (date) => {
    setModalInfo({
      ...modalInfo,
      formData: {
        ...modalInfo.formData,
        dateHandling: date.getTime(),
        year: date.getFullYear(),
      },
    });
  };

  const changeValueForm = (e) => {
    if (e.target.type === "number") {
      setModalInfo({
        ...modalInfo,
        formData: {
          ...modalInfo.formData,
          [e.target.name]: +e.target.value,
        },
      });
      setUpdateData({
        ...updateData,
        [e.target.name]: +e.target.value,
      });
    } else {
      setModalInfo({
        ...modalInfo,
        formData: {
          ...modalInfo.formData,
          [e.target.name]: e.target.value,
        },
      });
      setUpdateData({
        ...updateData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const updateBrand = (event) => {
    event.preventDefault();
    updateBrandMutation({ variables: updateData });
    setModalInfo({
      ...modalInfo,
      open: false,
    });
  };

  const deleteBrand = () => {
    console.log(updateData.id);
    deleteBrandMutation({ variables: updateData });
    setModalInfo({
      ...modalInfo,
      open: false,
    });
  };

  return (
    <>
      <h1 className={styles.title}>Хроналогический каталог почтовых марок</h1>
      <section className={styles.brands}>
        <div className={styles.brands__date}>
          <BrandsDatePanel updateAllBrands={updateAllBrands} />
        </div>
        <div className={styles.brands__catalog}>
          {brandsCatalog.length === 0 ? (
            <p className={styles.brands__catalog_info}>
              Добавьте марку для отображения ее в списке
            </p>
          ) : (
            <>
              <BrandTable
                brandsCatalog={brandsCatalog}
                openEditModal={openEditModal}
              />
              <DialogForm
                open={modalInfo.open}
                handleClose={handleClose}
                brandName={brandName}
                formData={modalInfo.formData}
                handleDateChange={handleDateChange}
                changeValueForm={changeValueForm}
                edit={true}
                updateBrand={updateBrand}
                deleteBrand={deleteBrand}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default withRouter(BrandsCatalog);
