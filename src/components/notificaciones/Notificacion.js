import React from 'react';
import {makeStyles, Snackbar} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert/';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2)
      },
    },
  }));

const Notificacion = ({ notify, setNotify }) => {
    
    const classes = useStyles();

    const handleClose = (event, reason) => {
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (
        <Snackbar
            className={classes.root}
            open={notify.isOpen}
            autoHideDuration={3000000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleClose}
        >
            <Alert
                severity={notify.type}
                onClose={handleClose}
                style={{ fontSize: '100%' }}
            >
                {notify.message}
            </Alert>
        </Snackbar>
    );
}

export default Notificacion;