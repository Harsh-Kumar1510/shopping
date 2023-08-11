import React, { useState, useEffect } from 'react';
import { Col, Row, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import './electronics.css';
import HomeScreen from '../screens/HomeScreen';

function Sports() {
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const fetchElectronicsProducts = async () => {
      try {
        let url = '/api/product/sports';
        if (minPrice && maxPrice) {
          url += `?min_price=${minPrice}&max_price=${maxPrice}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching electronics products:', error);
      }
    };

    fetchElectronicsProducts();
  }, [minPrice, maxPrice]);

  const handlePriceFilter = (e) => {
    e.preventDefault();
    // Perform validation or other checks if needed
    // Update the state with the entered price range
    setMinPrice(e.target.minPrice.value);
    setMaxPrice(e.target.maxPrice.value);
  };

  return (
    <div>
      <Row>
        <Card className="bg-primary text-white">
          <Col md={6} className="p-4">
            <div>
              <h2 className="mb-4">Products Based on Your Choice</h2>
              <h2 className="mb-4">Category:</h2>
              <h2 className="mb-4">Sports</h2>
              <Link to="/" className="btn btn-light my-3">
                Go to Home
              </Link>
            </div>
          </Col>

          <Col md={6} className="p-4 bg-dark">
            <Form onSubmit={handlePriceFilter}>
              <Row className="align-items-center">
                <Col md={4}>
                  <Form.Control
                    type="number"
                    step="0.01"
                    placeholder="Min Price"
                    name="minPrice"
                    className="mb-2"
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    type="number"
                    step="0.01"
                    placeholder="Max Price"
                    name="maxPrice"
                    className="mb-2"
                  />
                </Col>
                <Col md={4}>
                  <button type="submit" className="btn btn-light">
                    Filter
                  </button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Card>
      </Row>

      <Row>
        <Row>
          <Carousel pause="hover" className="caras">
            {products.map((product) => (
              <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}>
                  <div className="product-card">
                    <div className="product-image">
                      <Image
                        className="img-fluid"
                        src={product.image}
                        alt={product.name}
                        fluid
                      />
                    </div>
                    <div className="product-details">
                      <h4>{product.name}</h4>
                      <h4>₹{product.price}</h4>
                    </div>
                  </div>
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
        </Row>
      </Row>
      <HomeScreen/>
    </div>
  );
}

export default Sports;
