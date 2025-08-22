import React, { useEffect, useState } from 'react';

import { Doughnut } from "react-chartjs-2";

const options = {
    maintainAspectRatio: false,
    legend: {
        display: false
    },
   
}

const BrokerMarketShare = props => {
    const [allFilteredApartments, setAllFilteredApartments] = useState([]);
    const [brokerMap, setBrokerMap] = useState([]);

    //Gets data via props from App component. Sets it to allFilteredApartments.
    useEffect(() => {
        setAllFilteredApartments(props.data);
    }, [props.data]);

    useEffect(() => {
        let dict = {}
        allFilteredApartments.map((item) => { //for all filtered apartments
            item.map((current) => { //go into each filter
                    if (dict[current.area]) { //if current broker key already exists in dictionary
                        dict[current.area] = dict[current.area] + 1;
                    } else { //if current broker key does not  exist in dictionary
                        dict[current.area] = 1;
                    }
            });
        });

        setBrokerMap(dict)
    }, [allFilteredApartments])

    const data = {
        labels: Object.keys(brokerMap),
        datasets: [
          {
            data: Object.values(brokerMap),
            backgroundColor: [
                '#B8F3D2',
                '#D8DBFF',
                '#FFE3CC',
                '#FFD2E2',
                '#BAF1FF',
                '#f94144',
                '#f3722c',
                '#f8961e',
                '#f9844a',
                '#f9c74f',
                '#90be6d',
                '#43aa8b',
                '#4d908e',
                '#588b8b',
                '#ffd5c2',
                '#f28f3b',
                '#c8553d',
                '#ffac81',
                '#666a86',
                '#788aa3',
                '#92b6b1',
                '#b2c9ab',
                '#e8ddb5',
                '#f79256',
                '#fbd1a2',
                '#7dcfb6',
                '#00b2ca',
                '#00b2ca',
                '#1d4e89',
                '#531cb3',
                '#944bbb',
                '#aa7bc3',
                '#cc92c2',
                '#cc92c2',
                '#84dcc6',
                '#a5ffd6',
                '#ffa69e',
                '#ff686b',
                '#b0d0d3',
                '#c08497',
                '#f7af9d',
                '#f3eec3',
                '#006494',
                '#a480cf',


            ],
            borderWidth: 0,
          },
        ],
      }

      return <Doughnut data={data} options={options}/>
}
  
export default BrokerMarketShare;
