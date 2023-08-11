
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");
  // const { keyword: currentKeyword } = useParams();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
   if(keyword==="Electronics"||keyword==="electronics"||keyword==="electronic"||keyword==="e"){
navigate(`/electronics`);
   }
   else if(keyword==="pricerange"||keyword==="PriceRange"||keyword==="price"||keyword==="range"){
    navigate(`/range`);
       }

       else if(keyword==="womenswear"||keyword==="Womenswear"||keyword==="Women"||keyword==="woman"){
        navigate(`/womenswear`);
           }

           else if(keyword==="menswear"||keyword==="Menswear"||keyword==="men"||keyword==="Man"){
            navigate(`/menswear`);
               }
               else if(keyword==="Sports"||keyword==="sports"||keyword==="s"||keyword==="sport"){
                navigate(`/sports`);
                   }
   
    else {
      navigate(`/`);
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5"
      />

      <Button type="submit" variant="outline-success" className="p-2 mx-sm-2" style={{backgroundColor:"greenyellow"}}>
        Search
      </Button>
    </Form>
  );
}

export default SearchBox;



