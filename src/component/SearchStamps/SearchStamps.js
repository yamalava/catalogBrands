import React, { useState } from 'react';
import styles from './searchStamps.module.scss';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import { PlusOutlined, ClearOutlined } from '@ant-design/icons';
import ActionButton from '../ActionButton/ActionButton';

const SearchStamps = ({ stampCatalog, searchStamps, openDialogForm }) => {
  const [searchFilter, setSearchFilter] = useState(null);

  const clearSearch = () => {
    setSearchFilter(null);
    searchStamps(stampCatalog);
  };

  const updateStamps = () => {
    const searchCurrentStamps = stampCatalog.filter((stamp) =>
      stamp.name.includes(searchFilter)
    );
    searchStamps(searchCurrentStamps);
  };

  return (
    <div className={styles.filterStamps}>
      <div className={styles.filterStamps__item}>
        <Input
          placeholder='Наименование'
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          onPressEnter={() => updateStamps()}
        />
      </div>
      <ActionButton
        icon={<ClearOutlined />}
        action={clearSearch}
        title='Очистить поиск'
      />
      <ActionButton
        icon={<PlusOutlined />}
        action={openDialogForm}
        title='Добавить почтовую марку'
      />
    </div>
  );
};

export default SearchStamps;
