import React from 'react';
import StampTable from './StampTable';
import { BrowserRouter } from 'react-router-dom';

const setUp = (props) =>
  global.shallow(<StampTable.WrappedComponent {...props} />);
describe('StampTable', () => {
  let component;
  beforeEach(() => {
    component = setUp({ stampCatalog: [] });
  });
  it('should render StampTable component without stampCatalog', () => {
    expect(component.find('.table__item')).toHaveLength(0);
  });
  it('should render StampTable with stampCatalog', () => {
    component = setUp({ stampCatalog: [{ id: 5 }, { id: 6 }] });
    expect(component.find('.table__item')).toHaveLength(2);
  });
  it('click on table__item', () => {
    const func = jest.fn();
    component = setUp({
      stampCatalog: [{ id: 5 }, { id: 6 }],
      history: new BrowserRouter().history,
    });
    component.find('.table__item').first().simulate('click');
    func();
    expect(func.mock.calls.length).toBe(1);
  });
});
