import React from 'react';
import AlertAction from './AlertAction';

describe('AlertAction', () => {
  let component;
  beforeEach(() => {
    component = global.shallow(<AlertAction />);
  });
  it('render AlertAction without props', () => {
    expect(component.find('.makeStyles-alertFont-2').text()).toBe('');
  });
  it('render AlertAction with props', () => {
    component.setProps({ visible: true, severity: 'error', message: '1' });
    expect(component.find('.makeStyles-alertFont-2').text()).toBe('1');
  });
});
