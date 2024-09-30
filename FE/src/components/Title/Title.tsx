import React from "react";
import "./Title.css";

interface TitleProps {
  icon: string;
  text: string;
  alignment: "right" | "left";
}

export const Title: React.FC<TitleProps> = ({ icon, text, alignment }) => {
  return (
    <div
      className={`title-container ${
        alignment === "right" ? "align-right" : "align-left"
      }`}
    >
      <div
        className={`title-info-container ${
          alignment === "right" ? "border-radius-left" : "border-radius-right"
        }`}
      >
        <img src={icon} alt={text} />
        <h2>{text}</h2>
      </div>
    </div>
  );
};
