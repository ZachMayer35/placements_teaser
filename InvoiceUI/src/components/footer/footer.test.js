import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './index';

jest.mock('react-redux', () => ({
  useDispatch: () => { },
  useSelector: () => ({
    router: {
      location: {
        search: ''
      }
    },
    campaign: {
      campaigns: {
        total: 123
      },
      currentGrandTotal: 123456,
    }
  })
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Footer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
