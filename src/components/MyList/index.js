import React from "react";
import cn from "classnames";
import Slider from "react-slick";
import styles from "./HotBid.module.sass";
import Icon from "../Icon";
import Card from "../Card";
import { useState, useEffect } from "react";

// data
import { bids } from "../../mocks/bids";

const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
  <button {...props}>{children}</button>
);

const MyList = (props) => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: (
      <SlickArrow>
        <Icon name="arrow-next" size="14" />
      </SlickArrow>
    ),
    prevArrow: (
      <SlickArrow>
        <Icon name="arrow-prev" size="14" />
      </SlickArrow>
    ),
    responsive: [
      {
        breakpoint: 1179,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          infinite: true,
        },
      },
    ],
  };
  
  useEffect(()=>{
    if(props.products.length > 0)
     console.log(props.products);
  })

  return (
    <div className={cn(props.classSection, styles.section)}>
      {props.products.map((product,key) => {
        const image = product.image;
        return (
          <tr key={key}>
            <th scope="row">{product.id.toString()}</th>
            <td>{product.name}</td>
            <td>
            <div><img id="dapp-image" src={`https://gateway.pinata.cloud/ipfs/${image}`} alt="" border="3" height="200" width="200"/></div>
            </td>
            <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
            <td>{product.owner}</td>
            <td>
              {!product.purchased
                ? <button
                  name={product.id}
                  value={product.price}
                  onClick={(event) => {
                    this.props.purchaseProduct(event.target.name, event.target.value)
                  }}
                >
                  Buy token
                  </button>
                : null
              }
            </td>
          </tr>
        )
      }
      )}
      {/* <div className={cn("container", styles.container)}>
        <div className={styles.wrapper}>
          <h3 className={cn("h3", styles.title)}>Hot bid</h3>
          <div className={styles.inner}>
            <Slider className="bid-slider" {...settings}>
              {bids.map((x, index) => (
                <Card key={index} className={styles.card} item={x} />
              ))}
            </Slider>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MyList;
