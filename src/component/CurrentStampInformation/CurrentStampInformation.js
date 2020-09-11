import React from 'react';
import styles from './currentStampInformation.module.scss';
import getCurrentDate from '../../controller/getCurrentDate';
import { withRouter } from 'react-router-dom';

function CurrentStampInformation({ currentStamp, history }) {
  return (
    <>
      <h1 className={styles.title}>{currentStamp.name}</h1>
      <section className={styles.stampInformation}>
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
              <span>
                {currentStamp.series ? currentStamp.series : '-'}
              </span>
            </li>
            <li>
              Тираж:
              <span>
                {currentStamp.edition ? currentStamp.edition : '-'}
              </span>
            </li>
            <li>
              Размер:
              <span>
                {currentStamp.size ? currentStamp.size : '-'}
              </span>
            </li>
            <li>
              Номинал:
              <span>
                {currentStamp.denomination
                  ? currentStamp.denomination
                  : '-'}
              </span>
            </li>
            <li>
              Страна:
              <span>
                {currentStamp.country ? currentStamp.country : '-'}
              </span>
            </li>
            <li>
              Заметки:
              <span>
                {currentStamp.note ? currentStamp.note : '-'}
              </span>
            </li>
            <li>
              Находится в коллекции:
              <span>{currentStamp.includeCollection ? 'Да' : 'Нет'}</span>
            </li>
          </ul>
          <div className={styles.stampInformation__image}>Здесь будет картинка)))</div>
        </div>
        <div className={styles.buttons}>
            <button className={styles.buttons__goBack} onClick={() => history.push('/')}>Вернуться на главную</button>
        </div>
      </section>
    </>
  );
}

export default withRouter(CurrentStampInformation);
