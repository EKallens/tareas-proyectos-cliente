import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: '35%'

    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    }
}))

const ConfirmDialog = ({ confirmDialog, setConfirmDialog }) => {

    const classes = useStyles();

    return (
        <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h4">
                    {confirmDialog.titulo}
                </Typography>
                <Typography variant="h6" style={{ marginTop: '10px', color: 'red' }}>
                    {confirmDialog.subtitulo}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Button
                    variant="contained"
                    style={{ fontSize: '1.3rem' }}
                    onClick={() => setConfirmDialog({
                        ...confirmDialog,
                        isOpen: false
                    })}
                >
                    NO
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={confirmDialog.onConfirm}
                    style={{ fontSize: '1.3rem' }}
                >
                    SI
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;