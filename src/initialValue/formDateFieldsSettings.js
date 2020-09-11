import React from 'react';
import {
  Form,
  DatePicker,
  TimePicker,
  Button,
  Input,
  InputNumber,
  Switch,
} from 'antd';

const { TextArea } = Input;

const formDataFieldsSettings = [
  {
    label: 'Номер по каталогу',
    name: 'numberCatalog',
    component: InputNumber,
    rules: [
      {
        required: !edit && true,
        message: formError.fieldEmpty,
      },
    ],
  },
  {
    label: 'Заметки',
    name: 'note',
    component: TextArea,
    rules: [{ required: false }],
    rows: 4,
  },
];

export default formDataFieldsSettings;
