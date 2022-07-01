import React from "react";
import { useParams } from "react-router-dom";

const Search = () => {
  const params = useParams();
  console.log(params);
  
  return <div style={{ height: "100px", backgroundColor: "red" }}></div>;
};

export default Search;
