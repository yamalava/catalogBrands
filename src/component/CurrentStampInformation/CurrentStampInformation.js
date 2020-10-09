import React from 'react';
import styles from './currentStampInformation.module.scss';
import getCurrentDate from '../../controllers/getCurrentDate';
import { withRouter } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import { DeleteOutlined, HomeOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';

function CurrentStampInformation({
  currentStamp,
  history,
  handleActionVisible,
  handleOpenEdit,
}) {
  return (
    <>
      <h1 className={styles.title}>{currentStamp.name}</h1>
      <section className={styles.stampInformation}>
        <div className={styles.stampInformation__button}></div>
        <div className={styles.currentStamp__information}>
          <ul className={styles.currentStamp__information__items}>
            <li>
              Дата выпуска:
              <span>{getCurrentDate(currentStamp.dateHandling)}</span>
            </li>
            <li>
              Номер по каталогу:
              <span>{currentStamp.numberCatalog}</span>
            </li>
            <li>
              Номер по каталогу Michel:
              <span>{currentStamp.numberCatalogMichel}</span>
            </li>
            <li>
              Серия:
              <span>{currentStamp.series ? currentStamp.series : '-'}</span>
            </li>
            <li>
              Тираж:
              <span>{currentStamp.edition ? currentStamp.edition : '-'}</span>
            </li>
            <li>
              Размер:
              <span>{currentStamp.size ? currentStamp.size : '-'}</span>
            </li>
            <li>
              Номинал:
              <span>
                {currentStamp.denomination ? currentStamp.denomination : '-'}
              </span>
            </li>
            <li>
              Страна:
              <span>{currentStamp.country ? currentStamp.country : '-'}</span>
            </li>
            <li>
              Заметки:
              <span>{currentStamp.note ? currentStamp.note : '-'}</span>
            </li>
            <li>
              Находится в коллекции:
              <span>{currentStamp.includeCollection ? 'Да' : 'Нет'}</span>
            </li>
          </ul>
          {currentStamp.stampImage && (
            <div className={styles.stampInformation__image}>
              <Image
                cloudName='itransitiontest'
                publicId={currentStamp.stampImage}
              />
            </div>
          )}
        </div>
        <div className={styles.buttons}>
          <Button
            className={styles.buttons__home}
            onClick={() => history.push('/')}
            icon={<HomeOutlined />}
          >
            Вернуться на главную
          </Button>
          {currentStamp.access && (
            <>
              <Button
                className={styles.buttons__update}
                icon={<EditOutlined />}
                onClick={() => handleOpenEdit(true)}
              >
                Редактировать
              </Button>
              <Button
                className={styles.buttons__delete}
                icon={<DeleteOutlined />}
                onClick={() => handleActionVisible(true)}
              >
                Удалить
              </Button>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default withRouter(CurrentStampInformation);
