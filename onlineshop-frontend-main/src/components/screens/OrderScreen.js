import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button, ListGroupItem } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../../constants/orderConstants";
import Message from "../Message";
import Loader from "../Loader";

function OrderScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);
 const { user } = userDetails;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      // "https://www.paypal.com/sdk/js?client-id=AYgflmsaM7ccNLPlKUiufIyw8-spOE4UuS5XyyTCvhzheA-1EUcZF9qGlgXBZaSKcP5BY0zTc9WgINKe";
      "https://www.paypal.com/sdk/js?client-id=AXY503ZOnzYQeefryT2obQdoRCYrqOLAa4blMFi8ErmJWhKo1v6ZuemBH8RBy8qTfb3cBtVxfSdHmfmd";

      script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    if (
      !order ||
      successPay ||
      order._id !== Number(id) ||
      successDeliver
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, id, successPay, successDeliver, navigate, userInfo]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
  };

  // const deliverHandler = () => {
  //   const data=dispatch(deliverOrder(order));
 
  //  };
  const deliverHandler = () => {
    try {
      dispatch(deliverOrder(order));
    } catch (error) {
      console.error(error);
    }
  };
  
  

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Order No.: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping Details</h2>

              <p>
                <strong>Name: {order.User.name}</strong>
              </p>

              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.User.email}`}>{order.User.email}</a>
              </p>

              <p>
                <strong>Delivery Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>


            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment</h2>

              <p>
                <strong>Payment Method: </strong>
                {order.paymentMethod}
              </p>
              <ListGroupItem>
  {console.log("isDeliver:", order.isDelivered)}
  {console.log("deliveredAt:", order.deliveredAt)}
  
  {order.isDelivered !== undefined && order.deliveredAt !== undefined ? (
    order.isDelivered ? (
      <Message variant="success">
        Delivered on{" "}
        {order.deliveredAt ? order.deliveredAt.substring(0, 10) : null}
      </Message>
    ) : (
      <Message variant="warning">Not Delivered</Message>
    )
  ) : null}
</ListGroupItem>
              {order.isPaid ? (
                <Message variant="success">
                  Paid on {order.paidAt ? order.paidAt.substring(0, 10) : null}
                </Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>

              {order.orderItems.length === 0 ? (
                <Message variant="info">Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                        <Link to={`api/products/${item.product}/`}> 
                          {/* <Link to={`/product${item.product}`}> */}
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} X ₹{item.price} = ₹
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  
                  <Col>₹{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping Charge:</Col>

                  <Col>₹{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax Charge:</Col>

                  <Col>₹{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>

                  <Col>₹{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {order.paymentMethod === 'PayPal' && !order.isPaid  &&(
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>

            {/* {loadingDeliver && <Loader />} */}
{/* && userInfo.isAdmin && order.isPaid && !order.isDeliver && */}
            {userInfo && user.isAdmin && order.isPaid && !order.isDelivered &&(
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn w-100"
                  onClick={deliverHandler}
                  
                >
                  Mark As Delivered
                </Button>
                
              </ListGroup.Item>
              
            )}
            <ListGroupItem>
            {order.isPaid ? (
                <Message variant="success">
                  Paid on {order.paidAt ? order.paidAt.substring(0, 10) : null}
                </Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroupItem>
           
           
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
