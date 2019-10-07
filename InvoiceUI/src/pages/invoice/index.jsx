import React, { useEffect, useState } from 'react';
import { Grid, Container, Box, TextField, Button, Paper } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons'
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import queryString from 'query-string';

import { getInvoice, updateLineItem } from '../../store/reducers/invoice/sagas';
import LineItems from '../../components/lineItems';

const useStyles = makeStyles(theme => ({
  content: {
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      marginBottom: 48,
    },
    [theme.breakpoints.up('sm')]: {
      marginBottom: 64,
    }
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  invoice: {
    padding: theme.spacing(0),
  }
}));

const Invoice = function ({ match }) {
  const dispatch = useDispatch();
  const invoiceStore = useSelector(store => store.invoice);
  const fetching = useSelector(store => store.invoice.fetching);
  const campaignQuery = useSelector(store => store.campaign.currentQuery);
  const invoiceName = useSelector(store => store.invoice.invoice.docs[0] ? store.invoice.invoice.docs[0].campaign_name : undefined);
  const filter = useSelector(store => store.router.location.search);
  const invoice = invoiceStore.invoice;
  const classes = useStyles();
  const invoiceId = match.params.id;
  const [search, setSearch] = useState(queryString.parse(window.location.search).line_item_name || '');
  // useEffect runs whenever values in the second argument change, and on initialization.
  const buildFilter = (search, includeId) => {
    const query = queryString.parse(filter);
    if (includeId) {
      query.campaign_id = invoiceId;
    }
    if (search) {
      query.line_item_name = search;
    } else {
      delete query.line_item_name;
    }
    return `?${queryString.stringify(query)}`;
  };
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const nextQuery = invoiceStore.currentQuery || invoiceStore.defaultQuery;
    dispatch(getInvoice({ ...nextQuery, filter: buildFilter(search, true) }));
  }, [filter]); 
  /* eslint-enable react-hooks/exhaustive-deps */
  const handleSearch = (event) => {
    dispatch(push(`/invoice/${invoiceId}${buildFilter(search)}`));
    if (event) {
      event.preventDefault();
    }
  }
  const handleSearchChange = (event) => {
    setSearch(event.target.value || '');
  }
  const backToCampaigns = () => {
    dispatch(push(`/${campaignQuery && campaignQuery.filter ? campaignQuery.filter : ''}`));
  };
  const updateItem = (lineItem) => {
    const {tableData, ...newLineItem} = lineItem;
    dispatch(updateLineItem(newLineItem));
  }
  return (
    <Container maxWidth="lg" className={classes.content}>
      <Button style={{ marginTop: '2em' }} color="primary" variant="outlined" size="small" startIcon={<ArrowBackIos />} onClick={backToCampaigns}>Back to Campaigns</Button>
      <Box my={0} >
        <Grid container alignItems="flex-end" direction="row" >
          <Grid item >
            <Search style={{ cursor: 'pointer' }} />
          </Grid>
          <Grid item xs={11}>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSearch}>
              <TextField
                label="Search Line Item Names..."
                style={{ margin: 8 }}
                type='search'
                value={search}
                className={classes.textField}
                margin="normal"
                onChange={handleSearchChange}
                onBlur={handleSearch}
              />
            </form>
          </Grid>
        </Grid>
        {!fetching && invoice.docs.length > 0 && 
          <Paper className={classes.invoice} >
            <LineItems lineItems={invoice.docs} invoiceName={invoiceName} invoiceTotal={invoiceStore.currentSubTotal} updateLineItem={updateItem} />
          </Paper>}
      </Box>
    </Container>
  );
}

export default Invoice;
