import "./Button.css";
import React from "react";
import { Button as ChakraButton } from "@chakra-ui/react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}
export const Button: React.FC<ButtonProps> = ({ label, onClick}) => {

  return (
    <div className="btn-container">
      <ChakraButton sx={{ bg: "var(--primary-color)", color: "white" }} onClick={onClick}>
        {label}
      </ChakraButton>
    </div>
  );
};
