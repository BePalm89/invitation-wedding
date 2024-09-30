import React from "react";
import "./Text.css";

interface TextProps {
  text: string;
  link?: { label: string; href: string };
}

export const Text: React.FC<TextProps> = ({ text, link }) => {
  return (
    <div className="text-container">
      <p>
        {text}
        {link && (
            <a href={link.href} target="_blank" rel="noreferrer">
              {" "}
              {link.label}
            </a>
        )}
      </p>
    </div>
  );
};
