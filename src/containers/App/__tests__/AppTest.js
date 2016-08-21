/* eslint-env jest */

import React from 'react';
import { shallow } from 'enzyme';

jest.unmock('../index');

import App from '../index';
import Header from '../../../components/Header';

describe('(Container) App', function() {

  it('renders without exploding', function() {
    const wrapper = shallow(<App />);
    expect(wrapper.length).toEqual(1);
  });

  it('renders as a <div>', function() {
    const wrapper = shallow(<App />);
    expect(wrapper.type()).toEqual('div');
  });

  it('contains class in content', function() {
    const wrapper = shallow(<App />);
    expect(wrapper.is('.app')).toBe(true);
  });

  it('should render children when passed in', () => {
    const wrapper = shallow(
      <App>
        <div className="container" />
      </App>
    );
    expect(wrapper.contains(<div className="container" />)).toEqual(true);
  });

  it('should render an `<Header>`', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Header).length).toEqual(1);

    // expect(wrapper.find(Header)).toBe(true);
  });


});
