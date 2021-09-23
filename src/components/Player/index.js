import React, { useState } from "react";
import cn from "classnames";
import styles from "./Player.module.sass";
import Icon from "../Icon";

const Player = ({ className, item }) => {
  return (
    <div className={cn(styles.player, className)}>
      <div className={styles.preview}>
        <img
          srcSet={`${item.image2x} 2x`}
          src={item.image}
          alt="Video preview"
        />
      </div>
    </div>
  );
};

export default Player;
