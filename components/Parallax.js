import React from "react";
import Image from "next/image";
import { ButtonBase } from "@mui/material";

const Parallax = ({ main_line, second_line }) => {
  return (
    <div className="parallax-box">
      <div className="parallax-left">
        <div className="parallax-text-box">
          <h1>{`${main_line}`.toUpperCase()}</h1>
          <h2>{second_line}</h2>
        </div>
        <ButtonsSection />
      </div>
      <img src="/beez.svg" className="parallax-image" alt="BeeZ" />
    </div>
  );
};

const ButtonsSection = () => {
  return (
    <div className="parallax-button-box">
      <a href="#Akcije" style={{ paddingRight: "16px" }}>
        <ButtonBase className="button">AKCIJE</ButtonBase>
      </a>
      <a href="#Kontakt">
        <ButtonBase className="button-second">KONTAKT</ButtonBase>
      </a>
    </div>
  );
};

export default Parallax;
