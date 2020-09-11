import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../component/Header/Header';
import GetCurrentStampQuery from '../apollo/queries/getCurrentStamp';
import CurrentStampInformation from '../component/CurrentStampInformation/CurrentStampInformation';
import Loader from '../component/Loader/Loader';

function CurrentStamp(props) {
  let currentStamp = GetCurrentStampQuery(props.match.params.stampID);
  return currentStamp.loading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <CurrentStampInformation currentStamp={currentStamp.getCurrentStamp} />
    </>
  );
}

export default withRouter(CurrentStamp);
