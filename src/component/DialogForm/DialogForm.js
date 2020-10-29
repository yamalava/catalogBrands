import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import styles from './dialogForm.module.scss';
import 'antd/dist/antd.css';
import { Form, Button, Switch } from 'antd';
import ConfirmAction from '../ConfirmAction/ConfirmAction';
import initialFormData from '../../initialValue/formData';
import TextField from '@material-ui/core/TextField';
import CreateStampMutation from '../../apollo/mutation/createStamp';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import UpdateCurrentStampMutation from '../../apollo/mutation/updateStamp';
import formItems from '../../initialValue/formItems';

const DialogForm = ({
  open,
  handleClose,
  formData,
  buttonText,
  updateCurrentStamp,
}) => {
  const [visibleDialogForm, setVisibleDialogForm] = useState(true);
  const [actionVisible, setActionVisible] = useState(false);
  const [fileImage, setFileImage] = useState(null);
  const [previewSourceImage, setPreviewSourceImage] = useState('');
  const [dataForm, setDataForm] = useState(formData || initialFormData);
  const createStampMutation = CreateStampMutation();
  const updateStampMutation = UpdateCurrentStampMutation();

  const handleActionVisible = (visible) => {
    handleClose();
    if (!visible) return setVisibleDialogForm(false);
    setActionVisible(visible);
  };

  const actionSubmit = () => {
    if (buttonText === 'Добавить') {
      createStamp();
    }
    if (buttonText === 'Обновить') {
      updateStamp();
    }
  };

  const createStamp = async () => {
    if (!fileImage) return createStampMutation({ variables: dataForm });
    const image = await uploadImage();
    if (image.status === 200) {
      createStampMutation({
        variables: {
          ...dataForm,
          stampImage: image.data.public_id,
        },
      });
    }
  };

  const updateStamp = async () => {
    if (!fileImage) {
      updateStampMutation({
        variables: {
          ...dataForm,
          id: formData.id,
        },
      })
        .then(() => {
          updateCurrentStamp();
        })
        .catch(() => {
          updateCurrentStamp();
        });
    } else {
      const image = await uploadImage();
      if (image.status === 200) {
        updateStampMutation({
          variables: {
            ...dataForm,
            id: formData.id,
            stampImage: image.data.public_id,
          },
        })
          .then(() => {
            updateCurrentStamp();
          })
          .catch((err) => {
            updateCurrentStamp();
          });
      }
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', fileImage);
    formData.append('upload_preset', 'test-project');
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/itransitiontest/image/upload`,
      formData
    );
    return response;
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    setFileImage(file);
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSourceImage(reader.result);
    };
  };

  const handleDateChange = (date) => {
    setDataForm({
      ...dataForm,
      dateHandling: date.getTime(),
    });
  };

  const formInformation = (fieldsValue) => {
    setDataForm({
      ...dataForm,
      ...fieldsValue,
    });
    setVisibleDialogForm(false);
    setActionVisible(true);
  };

  return (
    <>
      {visibleDialogForm && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='form-dialog-title'
          fullWidth={true}
          maxWidth={'sm'}
        >
          <Form
            onFinish={formInformation}
            initialValues={{
              ...formData,
            }}
            className={styles.form}
          >
            <div className={styles.form__item_date}>
              <Form.Item>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify='space-between'>
                    <KeyboardDatePicker
                      disableToolbar
                      variant='outlined'
                      format='MM/dd/yyyy'
                      fullWidth
                      margin='normal'
                      name='dateHandling'
                      label='Дата ввода в обращение'
                      value={Number(dataForm.dateHandling)}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </Form.Item>
            </div>
            {Object.keys(formItems).map((item, index) => (
              <div
                key={index}
                className={
                  formItems[item].className
                    ? styles[formItems[item].className]
                    : styles.form__item
                }
              >
                <Form.Item name={item} rules={[formItems[item].rules]}>
                  {formItems[item].input}
                </Form.Item>
              </div>
            ))}
            <div className={styles.form__item_date}>
              <TextField
                onChange={handleFileInputChange}
                type='file'
                variant='outlined'
              />
            </div>
            {previewSourceImage ? (
              <div className={styles.form__item_date}>
                <img src={previewSourceImage} alt='chosen' />
              </div>
            ) : (
              formData.stampImage && (
                <div className={styles.form__item_date}>
                  <Image
                    cloudName='itransitiontest'
                    publicId={formData.stampImage}
                  />
                </div>
              )
            )}
            <Form.Item
              className={styles.from__item}
              label='Находится в коллекции'
              name='includeCollection'
            >
              <Switch
                defaultChecked={formData.includeCollection}
                checked={dataForm.includeCollection}
                onChange={(checked) =>
                  setDataForm({
                    ...dataForm,
                    includeCollection: checked,
                  })
                }
              />
            </Form.Item>
            <Form.Item className={styles.from__item}>
              <Button type='primary' htmlType='submit'>
                {buttonText}
              </Button>
            </Form.Item>
          </Form>
        </Dialog>
      )}
      {actionVisible && (
        <ConfirmAction
          actionType={buttonText === 'Добавить' ? 'create' : 'update'}
          action={actionSubmit}
          handleActionVisible={handleActionVisible}
        />
      )}
    </>
  );
};

export default DialogForm;
