import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menu: {
    marginLeft: '15px',

  },
  link: {
    color: 'inherit',
    textDecoration: 'inherit'
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },

}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.menu}  >
            <Link color="inherit" component="button" style={{ textDecoration: 'inherit' }} variant="h5">Placeholder API</Link>
          </Typography>
          <Typography className={classes.menu} variant="h6" >
            <RouterLink className={classes.link} to='/users'>User</RouterLink>
          </Typography>
          <Typography className={classes.menu} variant="h6" >
            <RouterLink className={classes.link} to='/album'>Albums</RouterLink>
          </Typography>
          <Typography className={classes.menu} variant="h6">
            <RouterLink className={classes.link} to='/posts'>Posts</RouterLink>
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Typography variant="h6" >
              <RouterLink className={classes.link} to='/auth/login'>Login</RouterLink>
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
