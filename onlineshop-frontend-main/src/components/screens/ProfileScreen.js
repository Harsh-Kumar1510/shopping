
import React, { useEffect } from "react";
import { Row, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails} from "../../actions/userActions";

import { listMyOrders } from "../../actions/orderActions";

import Message from "../Message";
import Loader from "../Loader";

function ProfileScreen() {
 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(listMyOrders());
      dispatch(getUserDetails());
     
    }
  }, [dispatch, navigate, userInfo, user]);

  

  return (
    <div className="profile-screen">
      <Row>
        <Row md={3}>
          <div>
            

          </div>
          <div>
          <h3>See Details</h3>
          <h3>Welcome {user.name}</h3>
            <strong>Name: {user.name}</strong>
            <div><strong>email: {user.email}</strong></div>
            <div>
            <div>
            <Link to="/update">Update your Profile</Link>
            </div>
            </div>
          </div>
          
        </Row>
        <Row md={9}>
       
          <h2>Your Orders</h2>

          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : (
            <Table striped responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Ordered_Date</th>
                  <th>Price</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>
                      {order.createdAt
                        ? order.createdAt.substring(0, 10)
                        : null}
                    </td>
                    <td>₹{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt ? (
                          order.paidAt.substring(0, 10)
                        ) : null
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm">More</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Row>
      </Row>
    </div>
  );
}

export default ProfileScreen;
