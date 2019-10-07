import React from 'react';
import { Grid, Card, CardContent, Typography, CardActionArea, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  campaignCard: {
    minWidth: 275,
    margin: theme.spacing(1)
  }
}));

const CampaignCard = ({ campaign, action }) => {
  const classes = useStyles();
  return (
    <Card className={classes.campaignCard}>
      <CardActionArea onClick={() => { action(campaign.id) }}>
        <CardContent>
          <Grid container spacing={2} justify="space-between" direction="row" alignItems="center">
            <Grid item >
              <Typography variant="body1"  >
                {campaign.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography align="right"  variant="h6" component="h2">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(campaign.sub_total)}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CampaignCard;