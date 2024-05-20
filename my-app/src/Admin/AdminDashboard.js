// src/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useSelector } from 'react-redux';
import axios from 'axios';

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [bookingData, setBookingData] = useState([]);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get('/api/bookings/admin'); // Adjust the API endpoint as needed
        setBookingData(response.data);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    fetchBookingData();
  }, []);

  const bookingCounts = bookingData.map((data) => data.count);
  const bookingLabels = bookingData.map((data) => data.date);

  const barData = {
    labels: bookingLabels,
    datasets: [
      {
        label: 'Number of Bookings',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: bookingCounts,
      },
    ],
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col md={12}>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Welcome, {user && user.name}</CardTitle>
              <p>Here are your latest booking statistics:</p>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Bookings Over Time</CardTitle>
              <Bar data={barData} />
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Line Chart Example</CardTitle>
              <Line data={barData} />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* Add more cards and charts as needed */}
    </Container>
  );
};

export default AdminDashboard;
