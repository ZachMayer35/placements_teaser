import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';

import logo from '../../logo.svg';
import { Container, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    [theme.breakpoints.up('xs')]: {
      marginBottom: 64,
    },
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 12000
  },
  icon: {
    height: theme.typography.h2.fontSize,
    width: theme.typography.h2.fontSize,
    paddingRight: theme.spacing(1)
  }
}));

function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

function PlacementesIOIcon(props) {
  const classes = useStyles();
  return (
    <img alt='Placements.io' className={classes.icon} {...props} />
  );
}

const Header = (props) => (
  <React.Fragment>
    <AppBar>
      <Toolbar disableGutters>
        <Container maxWidth='lg'>
          <Grid container alignItems="center">
            <Grid item>
              <PlacementesIOIcon src={logo} />
            </Grid>
            <Grid item>
              <Typography variant="h6">Placements.io</Typography>
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
    <Toolbar id="back-to-top-anchor" />
    <ScrollTop {...props}>
      {props.showQuickScroll &&
      <Fab color="secondary" size="small" aria-label="scroll back to top">
        <KeyboardArrowUpIcon />
      </Fab>}
    </ScrollTop>
  </React.Fragment>
);

export default Header;