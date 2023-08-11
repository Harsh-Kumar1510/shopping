


//import bgimage1 from '../../videos/background2.mp4';
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../Product";
// import Paginate from "../Paginate";
import Loader from "../Loader";
import Message from "../Message";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productAction";
import { useNavigate } from "react-router-dom";
import ElectronicsScreen from "./Categories";
import "./style/homescreen.css";

function HomeScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentImages, setCurrentImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(0);

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  let keyword = navigate.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  useEffect(() => {
    if (products.length > 0) {
      setCurrentImages(products.slice(0, 6));
      setCurrentIndex(0);
    }
  }, [products]);

  const handleScrollRight = () => {
    setScrollDirection(1);
  };

  const handleScrollLeft = () => {
    setScrollDirection(-1);
  };

  useEffect(() => {
    if (scrollDirection !== 0) {
      let newIndex = currentIndex + scrollDirection * 6;
      if (newIndex >= products.length) {
        newIndex = 0;
      } else if (newIndex < 0) {
        newIndex = Math.floor((products.length - 1) / 6) * 6;
      }
      setCurrentIndex(newIndex);
      setCurrentImages(products.slice(newIndex, newIndex + 6));
      setScrollDirection(0);
    }
  }, [scrollDirection, currentIndex, products]);

  return (
    <div className="home-screen">
      <div className="electronics-screen">
        <ElectronicsScreen />
      </div>
      <h1 className="latest-products-heading">Latest Products</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
         
          <Row>
            {currentImages.map((product) => (
              <Col key={product._id} sm={12} md={8} lg={4} xl={4}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <div className="scroll-buttons">
            <button className="scroll-button" onClick={handleScrollLeft}>
              &lt;
            </button>
            <button className="scroll-button" onClick={handleScrollRight}>
              &gt;
            </button>
            {/* <div><Paginate/></div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeScreen;




// import './homescreen.css';
// import React, { useEffect, useState } from "react";
// import { Row, Col } from "react-bootstrap";
// import Product from "../Product";
// import Loader from "../Loader";
// import Message from "../Message";
// import { useDispatch, useSelector } from "react-redux";
// import { listProducts } from "../../actions/productAction";
// import { useNavigate } from "react-router-dom";
// import "../common.css";
// import ElectronicsScreen from './Categories';
// function HomeScreen() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [currentImages, setCurrentImages] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [scrollDirection, setScrollDirection] = useState(0);

//   const productList = useSelector((state) => state.productList);
//   const { products, loading, error } = productList;

//   let keyword = navigate.search;

//   useEffect(() => {
//     dispatch(listProducts(keyword));
//   }, [dispatch, keyword]);

//   useEffect(() => {
//     if (products.length > 0) {
//       setCurrentImages(products.slice(0, 6));
//       setCurrentIndex(0);
//     }
//   }, [products]);

//   const handleScrollRight = () => {
//     setScrollDirection(1);
//   };

//   const handleScrollLeft = () => {
//     setScrollDirection(-1);
//   };

//   useEffect(() => {
//     if (scrollDirection !== 0) {
//       let newIndex = currentIndex + scrollDirection * 6;
//       if (newIndex >= products.length) {
//         newIndex = 0;
//       } else if (newIndex < 0) {
//         newIndex = Math.floor((products.length - 1) / 6) * 6;
//       }
//       setCurrentIndex(newIndex);
//       setCurrentImages(products.slice(newIndex, newIndex + 6));
//       setScrollDirection(0);
//     }
//   }, [scrollDirection, currentIndex, products]);

//   return (
//     <div className="app">
//       {/* <div className='video-background'>
//         <video autoPlay loop muted>
//           <source src={bgimage1} type='video/mp4' />
//         </video>
//       </div> */}
//       <div><ElectronicsScreen></ElectronicsScreen></div>
//       <h1 style={{ color: "white" }}>Latest Products</h1>

//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (
//         <div>
//           <div className="scroll-buttons">
//             <button className="scroll-button" onClick={handleScrollLeft}>
//               &lt;
//             </button>
//             <button className="scroll-button" onClick={handleScrollRight}>
//               &gt;
//             </button>
//           </div>
//           <Row>
//             {currentImages.map((product) => (
//               <Col key={product._id} sm={12} md={8} lg={4} xl={4}>
//                 <Product product={product} />
//               </Col>
//             ))}
//           </Row>
//         </div>
//       )}
//     </div>
//   );
// }

// export default HomeScreen;