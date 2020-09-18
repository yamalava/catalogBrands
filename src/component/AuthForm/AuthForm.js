import React from 'react';
import styles from './authForm.module.scss';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';

function AuthForm({ title, btnTitle, formAction, history }) {
  const onFinish = (values) => {
    formAction(values);
  };

  return (
    <section className={styles.auth}>
      <Form
        name='normal_login'
        className={styles.auth__form}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item>
          <div className={styles.auth__form_header}>
            <p>{title}</p>
            <CloseCircleOutlined className="close-icon" onClick={() => history.push('/')} />
          </div>
        </Form.Item>
        <Form.Item
          name='login'
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите свой логин!',
              autoFocus: true,
            },
          ]}
        >
          <Input
            autoComplete='off'
            autoFocus={true}
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Login'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите свой пароль!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>

        <Form.Item className={styles.auth__form_button}>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            {btnTitle}
          </Button>
          <Button
            className={styles.button_register}
            onClick={() =>
              history.location.pathname === '/auth'
                ? history.push('/registration')
                : history.push('/auth')
            }
          >
            {history.location.pathname === '/auth'
              ? 'Регистрация'
              : 'Авторизация'}
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}

export default withRouter(AuthForm);
