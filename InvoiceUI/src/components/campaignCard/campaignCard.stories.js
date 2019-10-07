import React from 'react';
import { action } from '@storybook/addon-actions';
import CampaignCard from './index';

export default {
  title: 'Campaign Card',
};

const campaign = {
  id: 311,
  invoice_count: 20,
  name: "Adams, Beier and Friesen : Distributed multi-tasking paradigm - 6cad",
  reviewed: false,
  sub_total: 9616967.194688335,
};

export const simple = () => (
  <CampaignCard campaign={campaign} action={action(`CampaignID Selected`)} />
);
