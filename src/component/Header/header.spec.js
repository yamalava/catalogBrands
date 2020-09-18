import React from 'react';
import Header from './Header';
import { BrowserRouter, Route, MemoryRouter } from 'react-router-dom';

const setUp = (props) =>
  global.mount(
    <MemoryRouter>
      <Route history={new BrowserRouter().history}>
        <Header {...props} />
      </Route>
    </MemoryRouter>
  );

describe('<Header />', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it('should render Header component', () => {
    expect(component.find('.header')).toHaveLength(1);
  });
  it('click on button and redirect to /auth', () => {
    component.setProps({ history: new BrowserRouter().history });
    component.find('button').at(0).simulate('click');
    component.props().history.push('/auth');
    expect(component.prop('history').location.pathname).toBe('/auth');
  });
  it('click on button and redirect to /registration', () => {
    component.setProps({ history: new BrowserRouter().history });
    component.find('button').at(1).simulate('click');
    component.props().history.push('/registration');
    expect(component.prop('history').location.pathname).toBe('/registration');
  });
});
