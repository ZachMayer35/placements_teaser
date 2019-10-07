import React from 'react';
import LineItems from './index';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import Theme from '../../theme';

export default {
  title: 'Line Items',
};

const testLineItems = [
  {
    "id": 7087,
    "campaign_id": 311,
    "campaign_name": "Adams, Beier and Friesen : Distributed multi-tasking paradigm - 6cad",
    "line_item_name": "Awesome Granite Chair - 4b3d",
    "booked_amount": 397742.79309459083,
    "actual_amount": 417593.26777658996,
    "adjustments": -6192.004839750014,
    "reviewed": false
  }
];

export const simple = () => (
  <ThemeProvider theme={Theme} >
    <CssBaseline />
    <LineItems lineItems={testLineItems} invoiceName="Test Invoice" invoiceTotal={123} updateLineItem={() => true} />
  </ThemeProvider>
);
