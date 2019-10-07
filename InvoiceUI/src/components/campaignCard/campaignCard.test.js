import React from 'react';
import ReactDOM from 'react-dom';
import CampaignCard from './index';

const testCampaign = {
  id: 311,
  invoice_count: 20,
  name: "Adams, Beier and Friesen : Distributed multi-tasking paradigm - 6cad",
  reviewed: false,
  sub_total: 9616967.194688335,
};

const testAction = () => true;


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CampaignCard campaign={testCampaign} action={testAction} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
