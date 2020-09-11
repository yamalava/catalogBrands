import React, { useState } from 'react';
import styles from './searchStamps.module.scss';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Switch } from 'antd';

function SearchStamps({ stampCatalog, searchStamps }) {
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

  const changeBooleanCollection = (e) => {
    setSearchFilter({
      ...searchFilter,
      includeCollection: e,
    });
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
        <Input placeholder='Наименование' allowClear onChange={changeName} />
      </div>
      <div className={styles.filterStamps__item}>
        <span className={styles.filterStamps__item_placeholder}>
          Находится в коллекции:
        </span>
        <Switch
          defaultChecked={searchFilter.includeCollection}
          onChange={changeBooleanCollection}
        />
      </div>
      <Button icon={<SearchOutlined />} onClick={updateStamps}>
        Поиск
      </Button>
    </div>
  );
}

export default SearchStamps;
