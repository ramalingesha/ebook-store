import React, { useState } from 'react';
import {
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Link,
  Box,
  Avatar
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Copyright from '../../shared/components/copyright';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import authenticationStyles from '../authentication-styles';
import { useFormInput, ErrorType } from '../../shared/helpers/form-input';
import { API } from '../../shared/api';

const SignUp: React.FC = () => {
  const history = useHistory();
  const classes = authenticationStyles();
  const firstName = useFormInput('', [
    {
      type: ErrorType.REQUIRED,
      message: 'First name is required'
    }
  ]);
  const lastName = useFormInput('', [
    {
      type: ErrorType.REQUIRED,
      message: 'Last name is required'
    }
  ]);
  const username = useFormInput('', [
    {
      type: ErrorType.REQUIRED,
      message: 'Username is required'
    },
    {
      type: ErrorType.EMAIL,
      message: 'Invalid email'
    }
  ]);
  const password = useFormInput('', [
    {
      type: ErrorType.REQUIRED,
      message: 'Password is required'
    }
  ]);
  const confirmPassword = useFormInput('', [
    {
      type: ErrorType.REQUIRED,
      message: 'Confirm password is required'
    }
  ]);
  const [loginError, setLoginError] = useState<string | undefined>(undefined);

  const registerUser = async () => {
    try {
      const response = await API.post('user/register', {
        username: username.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value
      });

      console.log(response.data);
      history.push('/dashboard');
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      setLoginError(errorMessage);
      console.log(errorMessage);
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.signupRoot}
    >
      <div className={classes.formPanel}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" component="h1" gutterBottom>
            Sign up
          </Typography>
        </Grid>

        <form noValidate autoComplete="off" className={classes.form}>
          {loginError && <Alert severity="error">{loginError}</Alert>}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="First Name"
                name="firstName"
                autoFocus
                {...firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Last Name"
                name="lastName"
                {...lastName}
              />
            </Grid>
          </Grid>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            {...username}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                {...password}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                autoComplete="current-password"
                {...confirmPassword}
              />
            </Grid>
          </Grid>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={registerUser}
          >
            Register
          </Button>
          <Grid container justify="flex-end" className={classes.signInOptions}>
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                {'Already have an account? Sign in'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box className={classes.footer}>
        <Copyright />
      </Box>
    </Grid>
  );
};

export default SignUp;
