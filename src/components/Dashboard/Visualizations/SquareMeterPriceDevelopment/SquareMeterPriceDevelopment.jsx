import React, { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";  

const options = {
    maintainAspectRatio: false,
    legend: {
        display: false
    }, scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  let getBackgroundColor = (i) => {
    if (i === 0) return '#00B400';
    else if (i === 1) return '#3E33FF';
    else if (i === 2) return '#FF4C00';
    else if (i === 3) return '#FF075C';
    else if (i === 4) return '#00AEFF';
};
  
  let getBorderColor = (i) => {
    if (i === 0) return '#B8F3D2';
    else if (i === 1) return '#D8DBFF';
    else if (i === 2) return '#FFE3CC';
    else if (i === 3) return '#FFD2E2';
    else if (i === 4) return '#BAF1FF';
};

const SquareMeterPriceDevelopment = props => {
    const [allFilteredApartments, setAllFilteredApartments] = useState([]);
    const [avgSquareMeterPriceDevelopment, setAvgSquareMeterPriceDevelopment] = useState([]);
    const [mainDict, setMainDict] = useState([]);
    const [theDataSet, setTheDataSet] = useState([]);

    //Gets data via props from App component. Sets it to allFilteredApartments.
    useEffect(() => {
        setAllFilteredApartments(props.data);
    }, [props.data]);

    useEffect(() => {
        let tmpDict = [] 
        allFilteredApartments.map((item) => {  //for each filter
            let totalApartmentsSoldPerMonth = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0} 
            let totalSqmPricePerMonth = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0} 
            let averageSqmPrice =  {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0} 
            item.map((i) => {  //for each apartment in the filter
                let month = new Date(i.date).getMonth() + 1; //make a date object
                if (totalApartmentsSoldPerMonth[month]) { //if the month exists.
                    totalApartmentsSoldPerMonth[month] = totalApartmentsSoldPerMonth[month] + 1; 
                    totalSqmPricePerMonth[month] = totalSqmPricePerMonth[month] + i.pricePerSquare;
                } else {
                    totalApartmentsSoldPerMonth[month] = 1;
                    totalSqmPricePerMonth[month] = i.pricePerSquare;
                }
                averageSqmPrice[month] = Math.round(totalSqmPricePerMonth[month] / totalApartmentsSoldPerMonth[month]);
            });
            tmpDict.push(averageSqmPrice);
        });
        setMainDict(tmpDict);
        console.log(mainDict);
    }, [allFilteredApartments])


    // Update dataset that is input to chart
    useEffect(() => {
    let myDataSets = []
        mainDict.map((item, index) => { //for each filter
            let tmpObject = {
                label: `Filter #${index + 1}`,
                data: Object.values(item),
                fill: false,
                backgroundColor: getBackgroundColor(index),
                borderColor: getBorderColor(index),
            }
            myDataSets.push(tmpObject)
            console.log(myDataSets)
        }
        );
        setTheDataSet(myDataSets);
    }, [mainDict])
    
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] ,
        datasets: theDataSet,
    }
    return <Line data={data} options={options} />
}
  
export default SquareMeterPriceDevelopment;
