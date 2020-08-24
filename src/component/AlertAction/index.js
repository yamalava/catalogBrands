import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(() => ({
  alert: {
    width: "30vw",
    position: "fixed",
    bottom: 0,
  },
}));

export default function AlertAction({ severity, message }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 2500);
  }, []);

  return (
    <div className={classes.alert}>
      <Collapse in={open}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </Collapse>
    </div>
  );
}
