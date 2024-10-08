import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from '../styles'
import Input from './Input'
import Icon from './Icon';
import { signin, signup } from '../actions/auth';
import { AUTH } from '../constants/actionTypes';
import { useDispatch } from 'react-redux';
import { gapi } from "gapi-script"

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
function Auth() {
  const dispatch = useDispatch();
    const history=useNavigate();
    const[form,setForm]=useState(initialState)
    const classes=useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
          clientId: '139351628610-peiqde3smckpi98ott5s6s0v6l1f79vi.apps.googleusercontent.com',
          plugin_name: "chat"
      })})
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSignup) {
          dispatch(signup(form,history));
        } else {
          dispatch(signin(form,history));
        }
    
      };
      const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
      };
    
 
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: AUTH, data: { result, token } });

      history('/');
    } catch (error) {
      console.log(error);
    }

  
   
  };

  const googleError = (error) => {
    console.log(error)
    alert('Google Sign In was unsuccessful. Try again later');
  }



  return (
    <Container component="main" maxWidth="xs">
    <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
        )}
        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submitt}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
            clientId="139351628610-peiqde3smckpi98ott5s6s0v6l1f79vi.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButtton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
    </Paper>
    </Container>
  )
}

export default Auth