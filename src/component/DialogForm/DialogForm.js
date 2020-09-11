import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import styles from './dialogForm.module.scss';
import 'antd/dist/antd.css';
import { Form, Button, Input, InputNumber, Switch } from 'antd';
import formError from '../../initialValue/formError';
import ConfirmAction from '../ConfirmAction/ConfirmAction';
import initialFormData from '../../initialValue/formData';
import TextField from '@material-ui/core/TextField';
import CreateStampQuery from '../../apollo/mutation/createStamp';
const { TextArea } = Input;

function DialogForm({ open, handleClose, formData }) {
  const [visibleDialogForm, setVisibleDialogForm] = useState(true);
  const [questionAction, setQuestionAction] = useState(false);
  const [finishAction, setFinishAction] = useState('');
  const [dataForm, setDataForm] = useState(initialFormData);
  const createStampQuery = CreateStampQuery();

  useEffect(() => {
    if (finishAction === 'create') {
      createStampQuery({ variables: dataForm });
    }
  }, [finishAction]);

  const updateFinishAction = (value) => {
    setFinishAction(value);
  };

  const updateStampImage = async (event) => {
    // const files = event.target.files;
    // const data = new FormData();
    // data.append('file', files[0]);
    // data.append('upload_present', 'ua4pek7y');
    // data.append('cloud_name', 'itransitiontest');
    // const res = await fetch(
    //   'https://api.cloudinary.com/v1_1/itransitiontest/image/upload',
    //   {
    //     method: 'POST',
    //     body: data,
    //   }
    // );
    // const file = await res.json();
    // console.log(file);
  };

  const handleDateChange = (date) => {
    setDataForm({
      ...dataForm,
      dateHandling: date.getTime(),
    });
  };

  const finishCreateStamp = (fieldsValue) => {
    setQuestionAction(true);
    setDataForm({
      ...dataForm,
      ...fieldsValue,
    });
  };

  const hiddenQuestionAction = (questionVisible, dialogFormVisible) => {
    setQuestionAction(questionVisible);
    setVisibleDialogForm(dialogFormVisible);
    if (questionVisible === false && dialogFormVisible === false) {
      handleClose();
      setVisibleDialogForm(true);
    }
  };

  return (
    visibleDialogForm && (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        fullWidth={true}
        maxWidth={'sm'}
      >
        <Form
          onFinish={finishCreateStamp}
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
                    value={Number(formData.dateHandling)}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Form.Item>
          </div>
          <div className={styles.form__item}>
            <Form.Item
              name='numberCatalog'
              rules={[
                {
                  required: true,
                  message: formError.fieldEmpty,
                },
              ]}
            >
              <InputNumber type='number' placeholder='Номер по каталогу' />
            </Form.Item>
          </div>
          <div className={styles.form__item}>
            <Form.Item
              name='numberCatalogMichel'
              rules={[
                {
                  required: true,
                  message: formError.fieldEmpty,
                },
              ]}
            >
              <InputNumber
                type='number'
                placeholder='Номер по каталогу Michel'
              />
            </Form.Item>
          </div>
          <div className={styles.form__item}>
            <Form.Item
              name='name'
              rules={[
                {
                  required: true,
                  message: formError.fieldEmpty,
                },
              ]}
            >
              <Input placeholder='Наименование' />
            </Form.Item>
          </div>
          <div className={styles.form__item}>
            <Form.Item name='series'>
              <InputNumber type='number' placeholder='Серия' />
            </Form.Item>
          </div>
          <div className={styles.form__item}>
            <Form.Item name='edition'>
              <InputNumber type='number' placeholder='Тираж' />
            </Form.Item>
          </div>
          <div className={styles.form__item}>
            <Form.Item name='size'>
              <InputNumber type='number' placeholder='Размер' />
            </Form.Item>
          </div>
          <div className={styles.form__item}>
            <Form.Item name='denomination'>
              <InputNumber type='number' placeholder='Номинал' />
            </Form.Item>
          </div>
          <div className={styles.form__item}>
            <Form.Item name='country'>
              <Input placeholder='Страна' />
            </Form.Item>
          </div>
          <div className={styles.form__item_date}>
            <Form.Item className={styles.from__item} name='note'>
              <TextArea
                rows={4}
                placeholder='Заметки'
                className={styles.form__input}
              />
            </Form.Item>
          </div>
          <div className={styles.form__item_date}>
            <Form.Item name='stampImage'>
              <TextField
                onChange={updateStampImage}
                type='file'
                variant='outlined'
              />
            </Form.Item>
          </div>
          <Form.Item
            className={styles.from__item}
            label='Находится в коллекции'
            name='includeCollection'
          >
            <Switch defaultChecked={formData.includeCollection} />
          </Form.Item>
          <Form.Item className={styles.from__item}>
            {questionAction && (
              <ConfirmAction
                hiddenQuestionAction={hiddenQuestionAction}
                updateFinishAction={updateFinishAction}
              />
            )}
            <Button type='primary' htmlType='submit'>
              Добавить
            </Button>
          </Form.Item>
        </Form>
      </Dialog>
    )
  );
}

export default DialogForm;
