import React from 'react';
import AuthForm from './AuthForm';

const historyPropsHome = {
  history: {
    location: {
      pathname: '/',
    },
    push: jest.fn(),
  },
};

const historyPropsRegistration = {
  history: {
    location: {
      pathname: '/auth',
    },
    push: jest.fn(),
  },
};
const setUp = (props) => shallow(<AuthForm.WrappedComponent {...props} />);

describe('AuthForm', () => {
  let component;
  beforeEach(() => {
    component = setUp(historyPropsHome);
  });
  it('render', () => {
    expect(component.find('.auth')).toHaveLength(1);
  });
  it('render without props', () => {
    expect(component.find('.auth__form_header').text()).toBe('');
  });
  it('click on button and redirect to /auth', () => {
    component.find('.button_register').simulate('click');
    expect(historyPropsHome.history.push).toBeCalledWith('/auth');
  });
  it('click on icon-close and redirect to /', () => {
    component.find('.close-icon').simulate('click');
    expect(historyPropsHome.history.push).toBeCalledWith('/');
  });
  it('click on button and redirect to /registration', () => {
    component = setUp(historyPropsRegistration);
    component.find('.button_register').simulate('click');
    expect(historyPropsRegistration.history.push).toBeCalledWith('/registration');
  })
});
