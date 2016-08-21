/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';

jest.unmock('../index');

import Header from '../index';

describe('(Component) Header', function() {

  it('renders without exploding', function() {
    const wrapper = shallow(<Header />);
    expect(wrapper.length).toEqual(1);
  });

  it('renders as a <header>', function() {
    const wrapper = shallow(<Header />);
    expect(wrapper.type()).toEqual('header');
  });

  it('contains class in content', function() {
    expect(shallow(<Header />).is('.header')).toBe(true);
  });

  it('should render children when passed in', () => {
    const wrapper = shallow(
      <Header>
        <div className="content" />
      </Header>
    );
    expect(wrapper.contains(<div className="content" />)).toEqual(true);
  });

});
