import React from 'react';
import Header from '../component/Header/Header';
import StampCatalog from '../component/StampCatalog/StampCatalog';
import Loader from '../component/Loader/Loader';
import GetAllStampsQuery from '../apollo/queries/getAllStamps';

function Home() {
  const stamps = GetAllStampsQuery();
  return stamps.loading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <StampCatalog
        stampCatalog={stamps.stampCatalog}
        refetch={stamps.refetch}
      />
    </>
  );
}

export default Home;
