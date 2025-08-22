import React from 'react';
import styles from "./Card.module.css";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import Tooltip from '@material-ui/core/Tooltip';
import Modal from '@material-ui/core/Modal';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CloseIcon from '@material-ui/icons/Close';


export default function Grid(props) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
 

    let {title, description, children} = props;


    return (
        <>
        <div className={styles.gridContainer}>
            <div className={styles.gridHeader}>
                <Typography className={styles.title} variant="subtitle1" component="h5">{title}</Typography>
               
                <IconButton className={styles.expandMeBtn} edge="end" aria-label="delete" onClick={handleOpen} >
                    <Tooltip title="Expand" aria-label="expand">
                        <FullscreenIcon />
                    </Tooltip>
                </IconButton>

                <IconButton className={styles.expandMeBtn} edge="end" aria-label="help">
                    <Tooltip title={description} aria-label="help">
                        <HelpOutlineIcon />
                    </Tooltip>
                </IconButton>
            </div>

            <div className={styles.gridContent}>
                {children}
            </div>
        </div>

        <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
          <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <Typography className={styles.title} variant="subtitle1" component="h5">{title}</Typography>
                    <IconButton className={styles.expandMeBtn} edge="end" aria-label="delete" onClick={handleClose}>
                        <Tooltip title="Close" aria-label="Close">
                            <CloseIcon />
                        </Tooltip>
                    </IconButton>
                </div>
                <div className={styles.modalBody}> 
                    {children}
                </div>
          </div>
      </Modal>
  </>
)
}