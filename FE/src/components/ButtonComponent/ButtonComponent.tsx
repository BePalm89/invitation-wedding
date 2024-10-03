import "./ButtonComponent.css";
import React from "react";
import { Button } from "@chakra-ui/react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  type: "button" | "submit" | "reset" | undefined;
  width?: {base: string, md: string}
  disabled?: boolean
}
export const ButtonComponent: React.FC<ButtonProps> = ({ label, onClick, type, width, disabled }) => {
  return (
    <div className="btn-container">
      <Button
        type={type}
        sx={{ bg: "var(--primary-color)", color: "white" }}
        width={width}
        onClick={onClick}
        isDisabled={disabled}
      >
        {label}
      </Button>
    </div>
  );
};
