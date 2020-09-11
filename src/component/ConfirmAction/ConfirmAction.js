import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Modal, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import confirmActionValue from '../../initialValue/confirmActionValue';

const { confirm } = Modal;

function ConfirmAction({ hiddenQuestionAction, updateFinishAction }) {
  useEffect(() => {
    showPromiseConfirm();
  });
  const showPromiseConfirm = () => {
    hiddenQuestionAction(true, false);
    confirm({
      title: confirmActionValue.createStamp.title,
      icon: <ExclamationCircleOutlined />,
      okText: 'Да',
      cancelText: 'Отмена',
      onOk() {
        return new Promise((resolve, reject) => {
          updateFinishAction('create');
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          hiddenQuestionAction(false, false);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {
        hiddenQuestionAction(false, true);
      },
    });
  };

  return <Space></Space>;
}
export default ConfirmAction;
