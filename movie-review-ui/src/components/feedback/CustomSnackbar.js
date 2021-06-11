import MuiAlert from '@material-ui/lab/Alert';
import {Snackbar} from "@material-ui/core";

const CustomSnackbar = ({open, duration, handleClose, elevation, variant, message, severity, action}) => (
    <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
        <MuiAlert onClose={handleClose} elevation={elevation} variant={variant} severity={severity} action={action}>
            {message}
        </MuiAlert>
    </Snackbar>
);

export default CustomSnackbar;