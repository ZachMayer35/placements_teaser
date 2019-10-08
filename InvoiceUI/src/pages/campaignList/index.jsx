import React, { useEffect, useState } from 'react';
import { Grid, Container, Typography, Box, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons'
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import queryString from 'query-string';

import InfiniteScroll from 'react-infinite-scroll-component';

import { getCampaigns, getNextPage } from '../../store/reducers/campaign/sagas';
import CampaignCard from '../../components/campaignCard';


const useStyles = makeStyles(theme => ({
  content: {
    marginBottom: 64,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
}));

const CampaignList = function() {
  const dispatch = useDispatch();
  const campaignStore = useSelector(store => store.campaign);
  const filter = useSelector(store => store.router.location.search);
  const campaigns = campaignStore.campaigns;
  const classes = useStyles();
  const [search, setSearch] = useState(queryString.parse(window.location.search).name || '');
  // useEffect runs whenever values in the second argument change, and on initialization.
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const nextQuery = campaignStore.currentQuery || campaignStore.defaultQuery;
    dispatch(getCampaigns({...nextQuery, filter }));
  }, [filter]);
  const fetchMoreData = () => {
    dispatch(getNextPage());
  };
  /* eslint-enable react-hooks/exhaustive-deps */
  const handleSearch = (event) => {
    if(filter !== `?name=${search}` && filter !== search) {
      dispatch(push(`/${search && search.length > 0 ? `?name=${search}`: ''}`));
    }
    if(event) {
      event.preventDefault();
    }
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value || '');
  };
  const goToInvoice = (id) => {
    dispatch(push(`/invoice/${id}`));
  };
  return (
    <Container maxWidth="lg" className={classes.content}>
      <Box my={4} >
        <Typography variant="h4" component="h1">
          Campaigns
        </Typography>
        <Grid container alignItems="flex-end" direction="row" >
          <Grid item >
            <Search style={{cursor: 'pointer'}} />
          </Grid>
          <Grid item xs={11}>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSearch}>
            <TextField
              label="Search Campaign Names..."
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
        {campaigns.docs.length > 0 &&
          <Grid container spacing={1} direction="column">
            <InfiniteScroll
              dataLength={campaigns.docs.length}
              next={fetchMoreData}
              hasMore={campaigns.docs.length <= campaigns.total - 1}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {campaigns.docs.map((campaign, index) => (
                <Grid key={campaign.id} item>
                  <CampaignCard campaign={campaign} action={goToInvoice} />
                </Grid>
              ))}
            </InfiniteScroll>
          </Grid>}
      </Box>
    </Container>
  );
}

export default CampaignList;
