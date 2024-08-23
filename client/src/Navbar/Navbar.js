import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import { useNavigate,useLocation} from 'react-router-dom';
import {Container ,AppBar ,Typography,Grow,Grid,Toolbar,Button,Avatar} from '@material-ui/core';
import memoriesLogo from '../images/memoriesLogo.png'
import memoriesText from '../images/memoriesText.png'
import {Link} from 'react-router-dom'
import decode from 'jwt-decode'
import { useDispatch } from 'react-redux';
import * as actionType from '../constants/actionTypes';
function Navbar() {
    const classes=useStyles();
    const history=useNavigate();
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    const location =useLocation();
    const dispatch = useDispatch();
    const logout = () => {
      dispatch({ type: actionType.LOGOUT });
  
      history('/auth');
  
      setUser(null);
    };
  
    useEffect(() => {
      const token = user?.token;
  
      if (token) {
        const decodedToken = decode(token);
  
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
  
      setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
  return (
    <AppBar className={classes.appBarr} position="static" color="inherit">
    <Link to="/" className={classes.brandContainer}>
      <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" />
      <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
    </Link>
    <Toolbar className={classes.toolbar}>
      {user?.result ? (
        <div className={classes.profile}>
          <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
          <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
          <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
        </div>
      ) : (
        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
      )}
    </Toolbar>
  </AppBar>
  )
}

export default Navbar

/*
<Typography component={Link} to="/"  variant='h2' align='center' className={classes.heading}>Memories</Typography>
<img src={memories} alt='memories' height='60' className={classes.image} />

*/