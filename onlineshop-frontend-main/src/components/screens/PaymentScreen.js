import React, { useState } from "react";

/* REACT BOOTSTRAP */
import { Button, Form, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
/* COMPONENTS */
import FormContainer from "../FormContainer";
import CheckoutSteps from "../CheckoutSteps";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { savePaymentMethod } from "../../actions/cartActions";

function PaymentScreen() {
  // PULLING OUT SHIPPING ADDRESS FROM CART
  const cart = useSelector((state) => state.cart);
const navigate=useNavigate();
  const { shippingAddress } = cart;

  // STATE
  // const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const initialPaymentMethod = useSelector((state) => state.cart.paymentMethod);
  const [paymentMethod, setPaymentMethod] = useState(initialPaymentMethod);


  /* IF NO SHIPPING ADDRESS THEN REDIRECT TO ShippingAddress SCREEN */
  if (!shippingAddress.address) {
    navigate("./shipping");
  }

  // HANDLERS

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));

    // AFTER CHOSING THE PAYMENT METHOD REDIRECTing USER TO PlaceOrder SCREEN
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            
            <Form.Check
  type="radio"
  label="PayPal or Credit Card"
  id="paypal"
  name="paymentMethod"
  checked={paymentMethod === "PayPal"}
  onChange={(e) => setPaymentMethod("PayPal")}
></Form.Check>
<Form.Check
  type="radio"
  label="Cash on Delivery"
  id="cash"
  name="paymentMethod"
  checked={paymentMethod === "Cash"}
  onChange={(e) => setPaymentMethod("Cash")}
></Form.Check>


          </Col>
        </Form.Group>

        <Button type="submit" variant="secondary" className="my-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;

