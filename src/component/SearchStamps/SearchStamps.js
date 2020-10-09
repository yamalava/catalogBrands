import React, { useState } from 'react';
import styles from './searchStamps.module.scss';
import 'antd/dist/antd.css';
import { Input, Button } from 'antd';
import { SearchOutlined, PlusOutlined, ClearOutlined } from '@ant-design/icons';
import { Switch } from 'antd';

function SearchStamps({ stampCatalog, searchStamps, openDialogForm }) {
  const [searchFilter, setSearchFilter] = useState({
    name: undefined,
    includeCollection: false,
  });
  const changeName = (e) => {
    setSearchFilter({
      ...searchFilter,
      name: e.target.value,
    });
  };

  const changeBooleanCollection = (checked) => {
    setSearchFilter({
      ...searchFilter,
      includeCollection: checked,
    });
  };

  const clearSearch = () => {
    setSearchFilter({
      ...searchFilter,
      name: undefined,
      includeCollection: false,
    });
    searchStamps(stampCatalog);
  };

  const updateStamps = () => {
    let one;
    if (searchFilter.name !== undefined && searchFilter.name !== '') {
      one = stampCatalog.filter(
        (stamp) =>
          stamp.name.includes(searchFilter.name) &&
          stamp.includeCollection === searchFilter.includeCollection
      );
    } else {
      one = stampCatalog.filter(
        (stamp) => stamp.includeCollection === searchFilter.includeCollection
      );
    }
    searchStamps(one);
  };
  return (
    <div className={styles.filterStamps}>
      <div className={styles.filterStamps__item}>
        <Input
          placeholder='Наименование'
          value={searchFilter.name}
          allowClear
          onChange={changeName}
        />
      </div>
      <div>
        <span className={styles.filterStamps__item_placeholder}>
          Находится в коллекции:
        </span>
        <Switch
          defaultChecked={false}
          onChange={changeBooleanCollection}
          checked={searchFilter.includeCollection}
        />
      </div>
      <Button icon={<SearchOutlined />} onClick={updateStamps}>
        Поиск
      </Button>
      <Button icon={<ClearOutlined />} onClick={clearSearch}>
        Очистить поиск
      </Button>
      <Button icon={<PlusOutlined />} onClick={() => openDialogForm()}>
        Добавить почтовую марку
      </Button>
    </div>
  );
}

export default SearchStamps;
