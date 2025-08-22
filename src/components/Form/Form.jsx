import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import apartmentsData from '../../output.json';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Form.module.css';

const uniqueAreas = [...new Set(apartmentsData.map(item => item.area))];

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    width: 300,
  },
}));

const Form = (props) => {
  const classes = useStyles();
  const [area, setArea] = React.useState('Thane West');
  const [price, setPrice] = React.useState([100, 1000]);
  const [rooms, setRoom] = React.useState([1, 5]);
  const [squareMeters, setSquareMeters] = React.useState([100, 10000]);

  const handleAreaChange = (event) => {
    setArea(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  const handleRoomChange = (event, newValue) => {
    setRoom(newValue);
  };

  const handleSquareMetersChange = (event, newValue) => {
    setSquareMeters(newValue);
  };

  let submitMe = (e) => {
    e.preventDefault();

    if (!area) {
      alert('You have to choose an area! ');
    } else {
      props.handleFormSubmit({
        area,
        price,
        rooms,
        squareMeters,
        // fee,
      });
    }
  };

  return (
    <div>
      <FormControl required className={classes.formControl}>
      <Typography id="range-slider" gutterBottom>
        Area
      </Typography>
      <Select
        labelId="demo-simple-select-required-label"
        id="demo-simple-select-required"
        value={area}
        onChange={handleAreaChange}
      >
        {uniqueAreas.map(areaName => (
          <MenuItem key={areaName} value={areaName}>
            {areaName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

      <br />
      <br />
      <div className={classes.root}>
        <Typography id="range-slider" gutterBottom>
          Number of rooms
        </Typography>

        <Slider
          className={styles.slider}
          value={rooms}
          step={0.5}
          min={1}
          max={10}
          onChange={handleRoomChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
        />

        <Typography id="range-slider" gutterBottom>
          Price (Rupees in Thousands)
        </Typography>

        <Slider
          value={price}
          className={styles.slider}

          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          step={10}
          min={2}
          max={200}
        />

        <Typography id="range-slider" gutterBottom>
          Livingarea (sqft) *100 sqft
        </Typography>
    

        <Slider
          value={squareMeters}
          className={styles.slider}

          onChange={handleSquareMetersChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          step={100}
          min={10}
          max={10000}
        />

      </div>
      <br />

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={submitMe}
        className={styles.myBtn}
        startIcon={<AddIcon />}
      >
        Add to search
      </Button>
    </div>
  );
};

export default Form;
