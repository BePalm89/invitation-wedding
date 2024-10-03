import { Alert, AlertDescription, AlertIcon } from "@chakra-ui/react";
import React from "react";

interface AlertComponentProps {
    message: string;
    status: "info" | "warning" | "success" | "error" | "loading" | undefined;
}

export const AlertComponent: React.FC<AlertComponentProps> = ({ message, status}) => {
    return (
        <Alert status={status}>
        <AlertIcon />
        <AlertDescription>{ message }</AlertDescription>
      </Alert> 
    )
}