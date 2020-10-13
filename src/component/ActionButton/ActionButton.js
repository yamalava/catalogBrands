import React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';

function ActionButton({ icon, action, title, className }) {
  return (
    <Button className={className && className} icon={icon} onClick={action}>
      {title}
    </Button>
  );
}

export default ActionButton;
