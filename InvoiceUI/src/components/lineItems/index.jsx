import React from 'react';
import { makeStyles, Grid, Toolbar, } from '@material-ui/core';
import MaterialTable from 'material-table';

const useStyles = makeStyles(theme => ({
  tableHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: theme.typography.h6.fontSize
  },
  tableFooter: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    fontSize: theme.typography.h5.fontSize
  }
}));

const LineItems = ({ lineItems, invoiceName, invoiceTotal, updateLineItem }) => {
  const classes = useStyles();
  const columns = [
    { title: 'Reviewed', field: 'reviewed', type: 'boolean' },
    { title: 'Name', field: 'line_item_name', editable: 'never' },
    { title: 'Subtotal', field: 'sub_total', type: 'currency', editable: 'never' },
    { title: 'Actual', field: 'actual_amount', type: 'currency', editable: 'never' },
    {
      title: 'Adjusted', field: 'adjustments', type: 'currency',
      editComponent: props => (
        <input
          type="numeric"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      )
    }
  ];
  return (
    <React.Fragment>
      <Toolbar className={classes.tableHeader}>
        <Grid container justify="space-between">
          <Grid item>
            {invoiceName}
          </Grid>
          <Grid item>
            {`Line Items: ${lineItems.length}`}
          </Grid>
        </Grid>
      </Toolbar>
      <MaterialTable
        columns={columns}
        options={{
          showTitle: false,
          search: false,
          paging: false,
          toolbar: false
        }}
        style={{
          border: 'none',
          boxShadow: 'none'
        }}
        data={lineItems ? lineItems.map(i => ({
          ...i,
          sub_total: i.actual_amount + i.adjustments,
        })) : []}
        editable={{
          isEditable: rowData => rowData.reviewed === false,
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              resolve();
              newData.adjustments = Number(newData.adjustments);
              updateLineItem(newData);
            })
        }}
      />
      <Toolbar className={classes.tableFooter}>
        <Grid container justify="space-between">
          <Grid item>
            Invoice Total
          </Grid>
          <Grid item>
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(invoiceTotal)}
          </Grid>
        </Grid>
      </Toolbar>
    </React.Fragment>
  );
};

export default LineItems;