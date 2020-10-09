import React from 'react';
import FilterTableStamps from './FilterTableStamps';
const props = {
  currentStamp: [
    {
      id: '1',
      name: '1',
      size: 1,
    },
  ],
};

const setUp = (props) => shallow(<FilterTableStamps {...props} />);
describe('FilterTableStamps', () => {
  let component;
  beforeEach(() => {
    component = setUp(props);
  });
  it('set props', () => {
    expect(component.props().children).toBe(props.currentStamp);
  });
});
