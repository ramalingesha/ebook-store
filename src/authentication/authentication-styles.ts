import { makeStyles } from '@material-ui/core';

const authenticationStyles = makeStyles((theme) => ({
  loginRoot: {
    marginTop: theme.spacing(8),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(3)
    }
  },
  signupRoot: {
    marginTop: theme.spacing(3)
  },
  formPanel: {
    padding: theme.spacing(0, 3),
    maxWidth: '100%',
    [theme.breakpoints.up('sm')]: {
      border: '1px solid #dadce0',
      borderRadius: '8px',
      padding: theme.spacing(3, 6),
      width: '450px'
    }
  },
  container: {},
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  signInOptions: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  footer: {
    margin: theme.spacing(3, 0, 0)
  }
}));

export default authenticationStyles;
