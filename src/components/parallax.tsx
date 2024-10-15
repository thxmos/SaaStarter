"use client";

import React from "react";
import { Parallax as ReactParallax } from "react-parallax";

const Parallax = ({
  children,
  bgImage,
  bgImageAlt,
  strength,
}: {
  children: React.ReactNode;
  bgImage: string;
  bgImageAlt: string;
  strength: number;
}) => {
  return (
    <ReactParallax
      bgImage={bgImage}
      bgImageAlt={bgImageAlt}
      strength={strength}
      bgStyle={{
        backgroundColor: "#000",
      }}
    >
      {children}
    </ReactParallax>
  );
};

export default Parallax;
