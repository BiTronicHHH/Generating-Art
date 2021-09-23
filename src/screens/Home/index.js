import React from "react";
import Hero from "./Hero";
import Description from "./Description";
import MyList from "../../components/MyList";
import { useState, useEffect } from "react";

const Home = (props) => {
  return (
    <>
      <Hero />
      <MyList
        products={props.products}
        purchaseProduct={props.purchaseProduct}
      />
      <Description />
    </>
  );
};

export default Home;
