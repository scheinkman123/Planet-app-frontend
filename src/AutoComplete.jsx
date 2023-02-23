import React from 'react'
import { Form, Button } from 'react-bootstrap';

function SubscriptionForm() {
    // const { onSubscribe } = props;
  
    // States to track the input values for "From" and "To"
    const [from, setFrom] = React.useState('');
    const [to, setTo] = React.useState('');
  
    // Handle form submission
    const handleSubmit = (event) => {
      event.preventDefault();
    };
  
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="from">
          <Form.Label>From</Form.Label>
          <Form.Control type="text" placeholder="Enter starting location" value={from} onChange={(e) => setFrom(e.target.value)} />
        </Form.Group>
  
        <Form.Group controlId="to">
          <Form.Label>To</Form.Label>
          <Form.Control type="text" placeholder="Enter destination" value={to} onChange={(e) => setTo(e.target.value)} />
        </Form.Group>
  
        <Button variant="primary" type="submit">Subscribe</Button>
      </Form>
    );
  }
  
  export default SubscriptionForm;