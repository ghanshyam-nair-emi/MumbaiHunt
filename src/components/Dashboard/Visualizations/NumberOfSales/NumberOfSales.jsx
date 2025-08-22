import React, { useState, useEffect } from 'react';
import { Bar } from "react-chartjs-2";  

const options = {
    maintainAspectRatio: false,
    legend: {
        display: false
    },
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
          
        },
      ],
    },
}
  
let getColor = (i) => {
    if (i === 0) return '#B8F3D2';
    else if (i === 1) return '#D8DBFF';
    else if (i === 2) return '#FFE3CC';
    else if (i === 3) return '#FFD2E2';
    else if (i === 4) return '#BAF1FF';
};

const NumberOfSales = props => {
    const [allFilteredApartments, setAllFilteredApartments] = useState([]);
    const [dictionary, setDictionary] = useState([]);
    const [theDataSet, setTheDataSet] = useState([]);

    //Gets data via props from App component. Sets it to allFilteredApartments.
    useEffect(() => {
        setAllFilteredApartments(props.data);
    }, [props.data]);

    useEffect(() => {
        let parentDictionary = []
        allFilteredApartments.map((item) => {  //for each filter
            let tmpDictionary = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0}
            item.map((i) => {  //for each apartment in the filter
                let month = new Date(i.date).getMonth() + 1; //make a date object
                if (tmpDictionary[month]) { //if the month exists. Add 1 to the number of sales for that month.
                    tmpDictionary[month] = tmpDictionary[month] + 1;
                } else {
                    tmpDictionary[month] = 1;
                }
            });
            parentDictionary.push(tmpDictionary)
        });
        setDictionary(parentDictionary)
    }, [allFilteredApartments])

    //Update chart
    useEffect(() => {
        let myDataSets = []
        dictionary.map((item, index) => { //for each filter
            let tmpObject = {
                label: `Filter #${index + 1}`,
                data: Object.values(item),
                fill: false,
                backgroundColor: getColor(index),
                borderColor: getColor(index),
            }
            myDataSets.push(tmpObject)
        });
        setTheDataSet(myDataSets);
    }, [dictionary])
 
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] ,
        datasets: theDataSet,
      }
      return <Bar data={data} options={options} />
}
  
export default NumberOfSales;
