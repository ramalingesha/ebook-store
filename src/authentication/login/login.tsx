import React, { useState } from 'react';
import {
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Box,
  Link,
  Avatar
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Copyright from '../../shared/components/copyright';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import authenticationStyles from '../authentication-styles';
import { useFormInput, ErrorType } from '../../shared/helpers/form-input';
import { API } from '../../shared/api';

const Login: React.FC = () => {
  const history = useHistory();
  const classes = authenticationStyles();
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
  const [loginError, setLoginError] = useState<string | undefined>(undefined);
  const [processing, setProcessing] = useState<boolean>(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessing(true);
    try {
      const response = await API.post('user/login', {
        username: username.value,
        password: password.value
      });

      setProcessing(false);
      history.push('/dashboard');
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      setLoginError(errorMessage);
      setProcessing(false);
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.loginRoot}
    >
      <div className={classes.formPanel}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" component="h1" gutterBottom>
            Sign in
          </Typography>
        </Grid>

        <form
          noValidate
          autoComplete="off"
          className={classes.form}
          onSubmit={handleLogin}
        >
          {loginError && <Alert severity="error">{loginError}</Alert>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            label="Email Address"
            id="email"
            autoFocus
            {...username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            aria-label="Password"
            type="password"
            autoComplete="current-password"
            {...password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={processing}
          >
            Sign In
          </Button>
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.signInOptions}
          >
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
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

export default Login;
