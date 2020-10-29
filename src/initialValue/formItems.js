import React from 'react';
import { Input, InputNumber } from 'antd';
const { default: formError } = require('./formError');
const { TextArea } = Input;

const formItems = {
  numberCatalog: {
    rules: {
      required: true,
      message: formError.fieldEmpty,
    },
    input: <InputNumber type='number' placeholder='Номер по каталогу' />,
  },
  numberCatalogMichel: {
    rules: {
      required: true,
      message: formError.fieldEmpty,
    },
    input: <InputNumber type='number' placeholder='Номер по каталогу Michel' />,
  },
  name: {
    rules: {
      required: true,
      message: formError.fieldEmpty,
    },
    input: <Input placeholder='Наименование' />,
  },
  series: {
    rules: {
      required: false,
      message: formError.fieldEmpty,
    },
    input: <InputNumber type='number' placeholder='Серия' />,
  },
  edition: {
    rules: {
      required: false,
      message: formError.fieldEmpty,
    },
    input: <InputNumber type='number' placeholder='Тираж' />,
  },
  size: {
    rules: {
      required: false,
      message: formError.fieldEmpty,
    },
    input: <InputNumber type='number' placeholder='Размер' />,
  },
  denomination: {
    rules: {
      required: false,
      message: formError.fieldEmpty,
    },
    input: <InputNumber type='number' placeholder='Номинал' />,
  },
  country: {
    rules: {
      required: false,
      message: formError.fieldEmpty,
    },
    input: <Input placeholder='Страна' />,
  },
  note: {
    className: 'form__item_date',
    rules: {
      required: false,
      message: formError.fieldEmpty,
    },
    input: (
      <TextArea
        rows={4}
        placeholder='Заметки'
        className={`styles.form__input`}
      />
    ),
  },
};

export default formItems;
