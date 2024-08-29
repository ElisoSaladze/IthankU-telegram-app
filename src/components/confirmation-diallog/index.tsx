import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { ReactNode, useState } from 'react';

/**
 * Props type definition for the ConfirmationDialog component.
 */
type Props = {
  response: () => void;
  title: string;
  description: string | ReactNode;
  confirmButtonText: string;
  children: (showDialog: () => void) => ReactNode;
};

/**
 * ConfirmationDialog component - Displays a dialog with a confirmation message.
 * It shows a dialog with customizable title and description, and provides
 * 'Continue' and 'Cancel' buttons for user actions.
 *
 * @param {() => void} response - Function to call when the 'Continue' button is clicked.
 * @param {string} title - Title of the dialog.
 * @param {string | ReactNode} description - Description text or component for the dialog.
 * @param {(showDialog: () => void) => ReactNode} children - Render prop to trigger the dialog.
 */
const ConfirmationDialog = ({ response, children, description, title, confirmButtonText }: Props) => {
  const [open, setOpen] = useState(false);

  // Function to show the dialog
  const showDialog = () => {
    setOpen(true);
  };

  // Function to hide the dialog
  const hideDialog = () => {
    setOpen(false);
  };

  // Function to handle confirmation and hide the dialog
  const confirmRequest = () => {
    response();
    hideDialog();
  };

  return (
    <>
      {children(showDialog)}
      {open && (
        <Dialog
          open={open}
          onClose={hideDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* Dialog title */}
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          {/* Dialog content */}
          <DialogContent sx={{ margin: 1 }}>
            <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
          </DialogContent>
          {/* Dialog actions */}
          <DialogActions>
            <Button sx={{ mx: 1 }} fullWidth onClick={confirmRequest} color="primary" variant="contained" size="large">
              {confirmButtonText}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default ConfirmationDialog;
