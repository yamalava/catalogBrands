import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(() => ({
  alert: {
    width: '35vw',
    position: 'fixed',
    bottom: 0,
    left: 0,
  },
  alertFont: {
    fontSize: 20,
    display: 'flex',
    alignItems: 'center',
  },
}));

export default function AlertAction({
  severity,
  message,
  visible,
  changeAlertVisible,
}) {
  const classes = useStyles();
  return (
    <div className={classes.alert}>
      <Collapse in={visible}>
        <Alert
          className={classes.alertFont}
          severity={severity}
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                changeAlertVisible();
              }}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </Collapse>
    </div>
  );
}
