import React from 'react';
import Typography from '@material-ui/core/Typography';
import illustration from "../../images/houseIllustration.svg";
import styles from "./Welcoming.module.css";

export default function Welcoming(props) {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.content}>
                <img className={styles.image} src={illustration} />
                <Typography variant="h3" component="h5" gutterBottom>Welcome to Mumbai-Hunt! </Typography>
                <Typography variant="body1">Mumbai Hunt helps you hunt down the perfect rental in Mumbai by letting you explore and compare properties across different neighborhoods and price ranges. Use the filters to narrow down your search based on your budget, preferred areas, and apartment requirements! </Typography>
            </div>
        </div>
    )
}