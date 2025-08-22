import React, { useEffect, useState } from "react";

import { Apartment } from "@material-ui/icons";
import Dashboard from "./components/Dashboard/Dashboard";
import Form from "./components/Form/Form";
import MobileScreen from "./components/MobileScreen/MobileScreen";
import NavBar from "./components/NavBar/NavBar";
import Popup from "./components/Popup/Popup";
import Sidebar from "./components/Sidebar/Sidebar";
import Welcoming from "./components/Welcoming/Welcoming";
import styles from "./App.module.css";

const json = require("../src/output.json");
const url = "src/output.json";

const App = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [filters, setFilters] = useState([]);
  const [allApartments, setAllApartments] = useState([]);
  const [filteredApartments, setFilteredApartments] = useState([]);

  //sets allApartments to all apartments from JSON file.
  useEffect(() => {
    setAllApartments(json);
  }, []);

  const handleAdd = () => {
    if (filters.length > 4) {
      alert(
        "For best visualization results we have limited the amount of apartments to 5 at the time. Remove any of your previous filters if you want to add a new one."
      );
    } else {
      setOpenPopup(true);
    }
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  //Submits form.
  const handleFormSubmit = (data) => {
    const tmpFilters = [...filters];
    tmpFilters.push(data);
    setFilters(tmpFilters);
    setOpenPopup(false);
  };

  //Deletes filter
  const handleDelete = (i) => {
    const splicedFilters = [...filters];
    splicedFilters.splice(i, 1);
    setFilters(splicedFilters);
  };

  useEffect(() => {
    const newFilteredApartments = [];
    filters.forEach((filter, index) => {
      const collection = []; //all apartments in a specific filter / search.
      allApartments.forEach((apartment) => {
        if (filter.area === apartment.area) {
          if (
            filter.rooms[0] <= apartment.rooms &&
            filter.rooms[1] >= apartment.rooms
          ) {
            console.log(`Apartment ${apartment.id} matches room filter.`,apartment.size,filter.squareMeters);
            if (
              filter.squareMeters[0] <= apartment.size &&
              filter.squareMeters[1] >= apartment.size
            ) {
              console.log(
                `Apartment ${apartment.id} matches square ft filter.`,
                apartment.size
              );
              console.log(apartment.askPrice, filter.price[0]*100,filter.price[1]*100," price filter");
              if (
                filter.price[0]*100 <= apartment.askPrice &&
                filter.price[1]*100 >= apartment.askPrice
              ) {
                console.log(
                  `Apartment ${apartment.id} matches price filter.`,
                  apartment.askPrice
                );
                collection.push(apartment); // add apartment that fullfills all tests to the collection.
              }
            }
          }
        }
      });

      if (collection.length > 0) {
        newFilteredApartments.push(collection);
      } else {
        alert(
          "No apartment like this has been sold. Try to broaden your search for better results!"
        );
        handleDelete(index);
        handleAdd();
      }
    });
    setFilteredApartments(newFilteredApartments);
  }, [allApartments, filters]);

  const checkIfNoFilters = () => {
    if (filteredApartments.length > 0) {
      return <Dashboard data={filteredApartments} />;
    } else {
      return <Welcoming />;
    }
  };

  return (
    <>
      <div className={styles.parentContainer}>
        <NavBar />
        <div className={styles.container}>
          <Sidebar
            filters={filters}
            deleteFunction={handleDelete}
            clickFunction={handleAdd}
          />

          {checkIfNoFilters()}
        </div>

        <Popup
          title={"Add filter to search"}
          openPopup={openPopup}
          handleClose={handleClose}
        >
          <Form filters={filters} handleFormSubmit={handleFormSubmit} />
        </Popup>
      </div>
      <div className={styles.mobileScreenContainer}>
        <MobileScreen />
      </div>
    </>
  );
};

export default App;
