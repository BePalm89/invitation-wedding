import React from "react";
import "./Text.css";

interface TextProps {
  text: string;
  link?: { label: string; href: string };
  linkAtStart?: boolean;
}

export const Text: React.FC<TextProps> = ({
  text,
  link,
  linkAtStart = false,
}) => {
  return (
    <div className="text-container">
      <p>
        {link && linkAtStart && (
          <a href={link.href} target="_blank" rel="noreferrer">
            {link.label}{" "}
          </a>
        )}
        {text}
        {link && !linkAtStart && (
          <a href={link.href} target="_blank" rel="noreferrer">
            {" "}
            {link.label}
          </a>
        )}
      </p>
    </div>
  );
};
