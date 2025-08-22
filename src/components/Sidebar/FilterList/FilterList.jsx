import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import five from "../../../images/5.png";
import four from "../../../images/4.png";
import one from "../../../images/1.png";
import three from "../../../images/3.png";
import two from "../../../images/2.png";

const FilterList = (props) => {
   let deleteMe = (currentIndex) => {
    props.handleDelete(currentIndex);
  };

  return (
    <List>
      {props.filters.map((data, i) => {
        let getIcon = (i) => {
          if (i === 0) return one;
          else if (i === 1) return two;
          else if (i === 2) return three;
          else if (i === 3) return four;
          else if (i === 4) return five;
        };

        let generateString = () => {
          let tmp = '';
          if (data.rooms) tmp = data.rooms[0] + ' - ' + data.rooms[1] + ' rooms';
          if (data.squareMeters) tmp = tmp + ', ' + data.squareMeters[0] + ' - ' + data.squareMeters[1] + ' sqft';
          if (data.price) tmp = tmp + ', ' + data.price[0] + ' - ' + data.price[1] + ' Rupees';
          if (data.fee) tmp = tmp + ', ' + data.fee + '/ month';
          return tmp;
        };
        
        return (
          <ListItem key={i}>
            <img src={getIcon(i)} style={{marginRight: 14}}/>
            <ListItemText primary={data.area} secondary={generateString()} />
            <ListItemSecondaryAction>
            <Tooltip title="Delete" aria-label="delete">
            <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteMe(i)}
              >
                <DeleteIcon />
              </IconButton>
                    </Tooltip>
            
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

export default FilterList;
