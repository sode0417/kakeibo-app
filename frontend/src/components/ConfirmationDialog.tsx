import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

export const ConfirmationDialog = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmButtonText = '削除',
  cancelButtonText = 'キャンセル',
  confirmButtonColor = 'error'
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{cancelButtonText}</Button>
        <Button onClick={onConfirm} color={confirmButtonColor}>
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};