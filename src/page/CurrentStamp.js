import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../component/Header/Header';
import GetCurrentStampQuery from '../apollo/queries/getCurrentStamp';
import CurrentStampInformation from '../component/CurrentStampInformation/CurrentStampInformation';
import Loader from '../component/Loader/Loader';
import ConfirmAction from '../component/ConfirmAction/ConfirmAction';
import DeleteStampMutation from '../apollo/mutation/deleteStamp';
import DialogForm from '../component/DialogForm/DialogForm';
import initialFormData from '../initialValue/formData';

const CLOSE_TIMER = 1100;

function CurrentStamp(props) {
  const deleteStampMutation = DeleteStampMutation();
  const [actionVisible, setActionVisible] = useState(false);
  const [dialogForm, setDialogForm] = useState({
    open: false,
    formData: initialFormData,
  });
  let currentStamp = GetCurrentStampQuery(props.match.params.stampID);

  useEffect(() => {
    currentStamp.refetch({
      id: props.match.params.stampID,
    });
  }, []);

  const handleActionVisible = (visible) => {
    setActionVisible(visible);
  };

  const handleOpenEdit = () => {
    setDialogForm({
      ...dialogForm,
      open: true,
      formData: currentStamp.getCurrentStamp,
    });
  };

  const handleCloseEdit = () => {
    setDialogForm({ ...dialogForm, open: false, edit: false });
  };

  const updateCurrentStamp = () => {
    currentStamp.refetch({
      id: props.match.params.stampID,
    });
  };

  const deleteStamp = () => {
    deleteStampMutation({
      variables: {
        id: currentStamp.getCurrentStamp.id,
      },
    })
      .then(() => {
        setTimeout(() => {
          props.history.push('/');
        }, CLOSE_TIMER);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return currentStamp.loading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <CurrentStampInformation
        handleActionVisible={handleActionVisible}
        currentStamp={currentStamp.getCurrentStamp}
        handleOpenEdit={handleOpenEdit}
      />
      {actionVisible && (
        <ConfirmAction
          actionType='delete'
          action={deleteStamp}
          handleActionVisible={handleActionVisible}
        />
      )}
      {dialogForm.open && (
        <DialogForm
          open={dialogForm.open}
          buttonText='Обновить'
          updateCurrentStamp={updateCurrentStamp}
          formData={dialogForm.formData}
          handleClose={handleCloseEdit}
        />
      )}
    </>
  );
}

export default withRouter(CurrentStamp);
