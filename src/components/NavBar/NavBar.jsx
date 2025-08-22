import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import homeIcon from "../../images/homeIcon.svg";
import { makeStyles } from '@material-ui/core/styles';
import styles from "./NavBar.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function DenseAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={styles.navbar}>
          <img src={homeIcon} className={styles.logo} />
          <Typography variant="h6" className={classes.title}>
              Hunt
          </Typography>
          <Button href="https://github.com/ghanshyam-nair-emi/MumbaiHunt" target="_blank" color="inherit">View code on Github</Button>
          <Button href="https://forms.office.com/e/uZp5jvTj0N" target="_blank" color="inherit">Feedback</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
