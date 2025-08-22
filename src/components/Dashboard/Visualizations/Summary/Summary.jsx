import React, { useEffect, useState } from 'react';

import CountUp from 'react-countup';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import five from "../../../../images/5.png";
import four from "../../../../images/4.png";
import one from "../../../../images/1.png"
import styles from "./Summary.module.css"
import three from "../../../../images/3.png";
import two from "../../../../images/2.png";

const Summary = props => {

  const [allFilteredApartments, setAllFilteredApartments] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState([]);
  const [avgSqmPrice, setAvgSqmPrice] = useState([]);
  const [avgMonthlyFee, setAvgMonthlyFee] = useState([]);
  const [avgAskPrice, setAvgAskPrice] = useState([]);
  const [avgEndPrice, setAvgEndPrice] = useState([]);
  const [avgPriceDevelopment, setAvgPriceDevelopment] = useState([]);



  //Gets data via props from App component. Sets it to allFilteredApartments.
  useEffect(() => {
    setAllFilteredApartments(props.data);
  }, [props.data]);

  //calculates total average data for table header
  useEffect(() => {
    let tmpTotalTransactions = 0;
    let tmpTotalSqmPrice = 0;
    let tmpTotalFee = 0;
    let tmpTotalAskPrice = 0;
    let tmpTotalEndPrice = 0;

    allFilteredApartments.map((item) => { //for each filter
      item.map((apartment) => { //for each apartment in each filter
        tmpTotalTransactions = tmpTotalTransactions + 1;
        tmpTotalSqmPrice = tmpTotalSqmPrice + apartment.pricePerSquare;
        tmpTotalFee = tmpTotalFee + apartment.monthlyFee;
        tmpTotalAskPrice = tmpTotalAskPrice + parseInt(apartment.askPrice);
        tmpTotalEndPrice = tmpTotalEndPrice + parseInt(apartment.endPrice);
      });
    });
    setTotalTransactions(tmpTotalTransactions);
    setAvgSqmPrice(Math.round(tmpTotalSqmPrice / tmpTotalTransactions));
    setAvgMonthlyFee(Math.round(tmpTotalFee / tmpTotalTransactions));
    setAvgAskPrice(Math.round(tmpTotalAskPrice / tmpTotalTransactions));
    setAvgEndPrice(Math.round(tmpTotalEndPrice / tmpTotalTransactions));
    setAvgPriceDevelopment(Math.round(((tmpTotalAskPrice -tmpTotalEndPrice ) / tmpTotalEndPrice) * 100)); //fel
  }, [allFilteredApartments])

  return (
    <TableContainer>
      <Table
        stickyHeader
      >
        <TableHead className={styles.tablehead}>
          <TableRow>
            <TableCell align="left" className={styles.cell}>
              <Typography variant="h4">
                <CountUp start={0} end={allFilteredApartments.length} duration={1} separator="." />

              </Typography>
              <Typography variant="caption" gutterBottom>Tot. filters</Typography>
            </TableCell>

            <TableCell align="left" className={styles.cell}>
              <Typography variant="h4">
                <CountUp start={0} end={totalTransactions} duration={1} separator="." /></Typography>
              <Typography variant="caption" gutterBottom>Tot. transactions</Typography>
            </TableCell>

            <TableCell align="left" className={styles.cell}>
              <Typography variant="h4">
                <CountUp start={0} end={avgSqmPrice} duration={1} separator="." />
              </Typography>
              <Typography variant="caption" gutterBottom>Avg. sqft price</Typography>
            </TableCell>
            <TableCell align="left" className={styles.cell}>
              <Typography variant="h4">
                <CountUp start={0} end={avgEndPrice} duration={1} separator="." />
              </Typography>
              <Typography variant="caption" gutterBottom>Avg. end price in thousands</Typography>
            </TableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {allFilteredApartments.map((item, index) => { //for every filter
            let tmpTotSquareMeterPrice = 0;
            let tmpTotAskPrice = 0;
            let tmpTotEndPrice = 0;
            let tmpTotMonthlyFee = 0;

            item.map((apartment) => { //for each apartment in each filter
              tmpTotSquareMeterPrice = tmpTotSquareMeterPrice + apartment.pricePerSquare;
              tmpTotMonthlyFee = tmpTotMonthlyFee + apartment.monthlyFee;
              tmpTotAskPrice = tmpTotAskPrice + parseInt(apartment.askPrice);
              tmpTotEndPrice = tmpTotEndPrice + parseInt(apartment.endPrice);
            });

            let getIcon = (i) => {
              if (i === 0) return one;
              else if (i === 1) return two;
              else if (i === 2) return three;
              else if (i === 3) return four;
              else if (i === 4) return five;
            };

            return (
              <TableRow key={`Table Row${item.date} | ${index}`}>
                <TableCell component="th" scope="row" className={styles.cell}>
                  <img src={getIcon(index)} style={{ height: 20, paddingTop: 5 }} />
                </TableCell>
                <TableCell align="left" className={styles.cell}>{item.length}</TableCell>
                <TableCell align="left" className={styles.cell}>{Math.round(tmpTotSquareMeterPrice / item.length)}</TableCell>
                <TableCell align="left" className={styles.cell}>{Math.round(tmpTotEndPrice / item.length)}</TableCell>
              
              </TableRow>
            )

          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Summary;
