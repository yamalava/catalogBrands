import React from 'react';
import AuthForm from './AuthForm';
import { BrowserRouter } from 'react-router-dom';

const props = {
  title: 'Авторизация1',
  btnTitle: 'Войти1',
  history: {
    location: {
      pathname: '/auth',
    },
  },
};
describe('AuthForm', () => {
  let component;
  beforeEach(() => {
    component = global.shallow(
      <AuthForm.WrappedComponent history={{ location: { pathname: '/' } }} />
    );
  });
  it('render AuthForm', () => {
    expect(component.find('.auth')).toHaveLength(1);
  });
  it('render AuthForm without props', () => {
    expect(component.find('.auth__form_header').text()).toBe('');
  });

  describe('AuthForm with props', () => {
    beforeEach(() => {
      component.setProps({ ...props });
    });
    it('render title', () => {
      expect(component.find('.auth__form_header').text()).toBe(props.title);
    });
    it('render button submit title', () => {
      expect(component.find('.login-form-button').text()).toBe(props.btnTitle);
    });
    it('render button help', () => {
      expect(component.find('.button_register').text()).toBe('Регистрация');
    });
  });

  describe('AuthForm click', () => {
    beforeEach(() => {
      component.setProps({ history: new BrowserRouter().history });
    });
    it('click on close-icon', () => {
      const func = jest.fn();
      component.find('.close-icon').last().simulate('click');
      func();
      expect(func.mock.calls.length).toBe(1);
    });
    it('click on button registration', () => {
      const func = jest.fn();
      component.find('.button_register').simulate('click');
      func();
      expect(func.mock.calls.length).toBe(1);
    });
  });
});
