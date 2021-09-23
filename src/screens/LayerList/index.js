import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./LayerList.module.sass";
import Control from "../../components/Control";
import TextInput from "../../components/TextInput";

const breadcrumbs = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Layers",
  },
];

// const items = [
//   {
//     url: "/upload-details",
//     buttonText: "Create Single",
//     image: "/images/content/upload-pic-1.jpg",
//     image2x: "/images/content/upload-pic-1@2x.jpg",
//   },
//   {
//     url: "/upload-details",
//     buttonText: "Create Multiple",
//     image: "/images/content/upload-pic-2.jpg",
//     image2x: "/images/content/upload-pic-2@2x.jpg",
//   },
// ];
const items = [
  {
    url: "/head-layer",
    layerText: "Head",
    buttonText: "Locate Folder",
  },
  {
    url: "/body-layer",
    layerText: "Body",
    buttonText: "Locate Folder",
  },
  {
    url: "/skin-layer",
    layerText: "skin",
    buttonText: "Locate Folder",
  },
  {
    url: "/tshirt-layer",
    layerText: "T Shirt",
    buttonText: "Locate Folder",
  },
  {
    url: "/background-layer",
    layerText: "Background",
    buttonText: "Locate Folder",
  },
];

const LayerList = () => {
  return (
    <div className={styles.page}>
      <Control className={styles.control} item={breadcrumbs} />
      <div className={cn("section-pt80", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.top}>
            <h1 className={cn("h2", styles.title)}>Layer Information</h1>
            <div className={styles.info}>
              Create a 10 000+ <span>“NFT”</span> collection under 10 sec.
            </div>
          </div>
          <div className={styles.add}>
            <span>ADD LAYER</span>
            <button className={cn("button-stroke")}>+</button>
          </div>
          <div className={styles.list}>
            {items.map((x, index) => (
              <div className={styles.item} key={index}>
                <h2>{x.layerText} Layers</h2>
                <div className={styles.preview}>
                  <TextInput
                    className={styles.folder}
                    name="Name"
                    type="text"
                    placeholder="C:/Desktop/Folder Name"
                    required
                  />
                  <Link
                    className={cn("button-stroke", styles.button)}
                    to={x.url}
                  >
                    {x.buttonText}
                  </Link>
                  <Link
                    className={cn("button-stroke", styles.button)}
                    to={x.url}
                  >
                    🗙
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.note}>
            We do not own your private keys and cannot access your funds without
            your confirmation. Please set details for new layer.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayerList;
