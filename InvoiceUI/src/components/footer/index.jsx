import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, AppBar, Toolbar, Container } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  footer: {
    top: 'auto',
    bottom: 0,
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  },
}));

const Footer = () => {
  const classes = useStyles();
  const grandTotal = useSelector(store => store.campaign.currentGrandTotal);
  const totalInQuery = useSelector(store => store.campaign.campaigns.total)
  const filter = useSelector(store => store.router.location.search);
  return (
    <AppBar position="fixed" color='secondary' className={classes.footer}>
      <Toolbar disableGutters>
        <Container maxWidth="lg">
          <Grid container direction='row-reverse' wrap='wrap-reverse' alignItems='center' justify='space-between' >
            <Grid item >
              <Typography variant="h6"> {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(grandTotal)}</Typography>
            </Grid>
            <Grid item >
              <Typography variant="h6">{filter ? `Search Total (${totalInQuery} in query)` : `Grand Total ${totalInQuery} Campaigns`}</Typography>
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;