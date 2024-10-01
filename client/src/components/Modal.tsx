import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { uiActions } from '../store/uiSlice';
import { Employee } from '../store/employeesSlice';

type ModalProps =
{
    isOpen:boolean;
    emp:Employee;
    cancelModalCallback : ()=> void;
    confirmModalCallback : (uuid:Employee)=> void
}

const Modal= ({isOpen,emp,cancelModalCallback,confirmModalCallback}:ModalProps) => {
    return (
        <div>
        <Dialog open={isOpen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Delete {emp.name}?</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this employee?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick= {cancelModalCallback} color="primary" >
                Cancel
            </Button>
            <Button onClick= {()=>confirmModalCallback(emp)} color="primary">
                Confirm
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
};

export default Modal;