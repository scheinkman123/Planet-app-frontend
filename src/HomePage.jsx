import React, { useState, useEffect,  } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { Form, Button, Col, Row } from 'react-bootstrap';
export const HomePage = () => {

  const [stockData, setStockData] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    // Fetch stock data when the component mounts or when the userId changes
    fetchStockData();
    const intervalId = setInterval(() => {
        fetchStockData();
      }, 60000);
  
      // Cleanup the interval when the component is unmounted
      return () => clearInterval(intervalId);
  }, [userId]);
  
  async function fetchStockData() {
    try {
      const response = await axios.get(`http://localhost:3000/forex/${userId}`);
      setStockData(response.data);
 
    } catch (error) {
      console.error(error);
    }
  }
  
  const deleteStock = async (exchangeName) => {
        
    try {
      const response = await axios.post(`http://localhost:3000/users/${userId}/remove_preference?preference=${exchangeName}`);
      fetchStockData();
 
    } catch (error) {
      console.error(error);
    }

  }
  // Render the stock data
  const tableRows = stockData?.map((row, index) => (
    row && <tr key={index} style={{"cursor": "pointer"}} className='table-row'>
      <td>{row?.exchangeName}</td>
      <td>{row?.high}</td>
      <td>{row?.low}</td>
      <td>{row?.highY}</td>
      <td>{row?.lowY}</td>
      <td><button
                 className='btn btn-danger btn-sm ml-10 d-inline-block delete-button'
                 onClick={(event)=>{
                  //event bubbling up
                  event.stopPropagation() //to stop event bubbling
                  deleteStock(row?.exchangeName)
                }}
                 >Unsubscribe</button></td>

    </tr>
  ));


    const [from, setFrom] = React.useState('');
    const [to, setTo] = React.useState('');
  

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post(`http://localhost:3000/users/${userId}/add_preference?preference=${from}_${to}`);
        fetchStockData();
   
      } catch (error) {
        console.error(error);
      }

    };


  


  return (
    <div>
        
        <Form onSubmit={handleSubmit}>
            
        <Form.Group controlId="from">
          <Form.Label>From</Form.Label>
          <Form.Control type="text" placeholder="Enter Currency Name" value={from} onChange={(e) => setFrom(e.target.value)} />
        </Form.Group>
  
        <Form.Group controlId="to">
          <Form.Label>To</Form.Label>
          <Form.Control type="text" placeholder="Enter Currency Name" value={to} onChange={(e) => setTo(e.target.value)} />
        </Form.Group>
  
        <Button variant="primary" type="submit">Subscribe</Button>
      </Form>
      
      <table className='table hover mt-5 text-white'>
        <thead>
          <tr>
            <th scope='col'>Symbol</th>
            <th scope='col'>High</th>
            <th scope='col'>Low</th>
            <th scope='col'>High-Yesterday</th>
            <th scope='col'>LowY-Yesterday</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </div>
  );
}
