import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import BrandsCatalog from "../component/BrandsCatalog";
import { GET_ALL_BRANDS } from "../queries";
import { useQuery } from "@apollo/client";
import Loader from "../component/Loader";

function Home() {
  const [brandsCatalog, setBrandsCatalog] = useState([]);
  let { refetch, data, loading } = useQuery(GET_ALL_BRANDS);

  useEffect(() => {
    if (data) {
      let sort = data.allBrands
        .slice()
        .sort((a, b) => a.numberCatalog - b.numberCatalog);
      setBrandsCatalog(sort);
    }
  }, [data]);
  return loading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <BrandsCatalog refetch={refetch} brandsCatalog={brandsCatalog} />
    </>
  );
}

export default Home;
