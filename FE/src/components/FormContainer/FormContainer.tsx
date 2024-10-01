import { Box } from "@chakra-ui/react";
import React from "react";

interface FormContainerPorps {
  children: React.ReactNode;
}

export const FormContainer: React.FC<FormContainerPorps> = ({ children }) => {
  return (
    <Box width={{ base: "80%", md: "60%" }} margin="2rem auto" textAlign="left">
      {children}
    </Box>
  );
};
