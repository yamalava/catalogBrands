import React from 'react';
import Header from './Header';

const setUp = (props) => mount(<Header.WrappedComponent {...props} />);
const historyProps = {
  history: {
    push: jest.fn(),
  },
};

describe('Header', () => {
  let component;
  beforeEach(() => {
    component = setUp(historyProps);
  });
  it('should render', () => {
    expect(component.find('.header')).toHaveLength(1);
  });
  it('click on button and redirect to /auth', () => {
    component.find('button').at(0).simulate('click');
    expect(historyProps.history.push).toBeCalledWith('/auth');
  });
  it('click on button and redirect to /registration', () => {
    component.find('button').at(1).simulate('click');
    expect(historyProps.history.push).toBeCalledWith('/registration');
  });
  it('click on button with sessionStorage and delete accessToken', () => {
    sessionStorage.setItem('accessToken', 'test');
    component.find('button').first().simulate('click');
    expect(sessionStorage.getItem('accessToken')).toBe('test');
  });
  it('click on button with sessionStorage and redirect to /auth', () => {
    sessionStorage.setItem('accessToken', 'test');
    component.find('button').first().simulate('click');
    expect(historyProps.history.push).toBeCalledWith('/auth');
  });
});
