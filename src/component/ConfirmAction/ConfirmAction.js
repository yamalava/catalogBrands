import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Modal, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import confirmActionValue from '../../initialValue/confirmActionValue';

const { confirm } = Modal;

function ConfirmAction({ actionType, handleActionVisible, action }) {
  useEffect(() => {
    showPromiseConfirm();
  }, []);
  const showPromiseConfirm = () => {
    confirm({
      title:
        actionType === 'delete'
          ? confirmActionValue.deleteStamp.title
          : actionType === 'create'
          ? confirmActionValue.createStamp.title
          : confirmActionValue.updateStamp.title,
      icon: <ExclamationCircleOutlined />,
      okText: 'Да',
      cancelText: 'Отмена',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          handleActionVisible(false);
          action();
        }).catch(() => {
          console.log('Oops errors!');
        });
      },
      onCancel() {
        handleActionVisible(false);
      },
    });
  };

  return <Space></Space>;
}
export default ConfirmAction;
