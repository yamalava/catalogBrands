import React from 'react';
import StampTable from './StampTable';
const propsAction = {
  stampCatalog: [{ id: 5 }],
  history: {
    push: jest.fn(),
  },
};

const setUp = (props) => shallow(<StampTable.WrappedComponent {...props} />);
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
    component = setUp(propsAction);
    component.find('.table__item').first().simulate('click');
    expect(propsAction.history.push).toBeCalled();
  });
});
