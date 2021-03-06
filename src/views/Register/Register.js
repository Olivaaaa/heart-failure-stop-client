import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Link
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import gradients from '../../utils/gradients';
import { RegisterForm } from './components';
import RouteName from '../../utils/RouteName'
import ParaName from '../../utils/ParaName'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(6, 2)
  },
  card: {
    width: theme.breakpoints.values.md,
    maxWidth: '100%',
    overflow: 'unset',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%'
    }
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4)
  },
  media: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: theme.spacing(3),
    color: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  icon: {
    backgroundImage: gradients.orange,
    color: theme.palette.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: 'absolute',
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64,
    fontSize: 32
  },
  registerForm: {
    marginTop: theme.spacing(3)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  person: {
    marginTop: theme.spacing(2),
    display: 'flex'
  },
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Register = () => {
  const classes = useStyles();
  document.title = ParaName.HF_STOP+"注册";

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <PersonAddIcon className={classes.icon} />
          <Typography
            gutterBottom
            variant="h3"
          >
            创建新账户
          </Typography>
          <Typography variant="subtitle2">
            创建新账户以访问数据
          </Typography>
          <RegisterForm className={classes.registerForm} />
          <Divider className={classes.divider} />
          <Link
            align="center"
            color="secondary"
            component={RouterLink}
            to={RouteName.AUTHENTIC_PAGE+RouteName.AUTH_LOGIN}
            underline="always"
            variant="subtitle2"
          >
            使用已有账户登录
          </Link>
        </CardContent>
        <CardMedia
          className={classes.media}
          image="/images/auth.jpg"
          title="Cover"
        >
          <Typography
            color="inherit"
            variant="subtitle1"
          >
            本应用为Heart Failure Stop的Demo
          </Typography>
          <div className={classes.person}>
            <div>
              <Typography
                color="inherit"
                variant="body1"
              >
                浙江大学
              </Typography>
              <Typography
                color="inherit"
                variant="body2"
              >
                生物医学工程与仪器科学学院
              </Typography>
            </div>
          </div>
        </CardMedia>
      </Card>
    </div>
  );
};

export default Register;
