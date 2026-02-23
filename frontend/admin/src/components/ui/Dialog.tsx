import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    description: string;
    buttonName: string;
    onClose: () => void;
    onConfirm: () => void;
}

interface FormDialogProps {
    open: boolean;
    title: string;
    children: React.ReactNode;
    buttonName: string;
    onClose: () => void;
}

interface FullScreenDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: () => void;
    title: string;
    buttonName: string;
    children: React.ReactNode;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open,
    title,
    description,
    buttonName,
    onClose,
    onConfirm,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
        >
            <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="confirm-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>キャンセル</Button>
                <Button onClick={onConfirm} autoFocus>
                    {buttonName}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export const FormDialog: React.FC<FormDialogProps> = ({
    open,
    title,
    children,
    onClose,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
        >
            <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
};

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const FullScreenDialog: React.FC<FullScreenDialogProps> = ({
    open,
    onClose,
    title,
    children,
}) => {
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={onClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography
                        sx={{ ml: 2, flex: 1 }}
                        variant="h6"
                        component="div"
                    >
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <div style={{ padding: '16px' }}>{children}</div>
        </Dialog>
    );
};
