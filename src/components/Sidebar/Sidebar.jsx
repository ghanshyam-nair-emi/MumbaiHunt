import React from 'react';
import styles from "./Sidebar.module.css";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import FilterList from "./FilterList/FilterList"
import Typography from "@material-ui/core/Typography";


export default function Sidebar(props) {

    let {clickFunction, deleteFunction, filters} = props;

    const clickMe = () => {
        clickFunction()
    }

    const deleteMe = () => {
        deleteFunction()
    }
    
    return (
        <div className={styles.sideBar}>
            <FilterList filters={filters} handleDelete={() => deleteMe()} />
          <div className={styles.buttonContainer}>

            <Typography variant="overline">
              Compare with other filters
            </Typography>
            <br></br>
            <Button
              variant="contained"
              size="large"
              color="primary"
              startIcon={<AddIcon />}
              className={styles.button}
              onClick={() => clickMe()}
            >
              Add new filter
            </Button>
          </div>
      </div>
    )
}