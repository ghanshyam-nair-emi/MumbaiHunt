import React from 'react';
import styles from "./MobileScreen.module.css";
import illustration from "../../images/phoneIllustration.svg";
import Typography from '@material-ui/core/Typography';

export default function Welcoming(props) {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.content}>
                <img className={styles.image} src={illustration} />
                <Typography variant="h4" component="h4" gutterBottom>Oh oh, your screen is to small!</Typography>
                <Typography variant="body1">For the best visualizations, this tool is built for desktop devices. Please change to a desktop device to use this tool while I am developing a mobile version. If you are on a desktop device and you see this message your web browser window size is to small. Make it atleast 1000px wide! </Typography>
            </div>
        </div>
    )
}