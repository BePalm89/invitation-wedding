import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { FormItemContainer } from "../FormItemContainer/FormItemContainer";

interface TextAreaComponentProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors?: FieldError;
  isRequired?: boolean;
  errorMessage?: string;
}

export const TextAreaComponent: React.FC<TextAreaComponentProps> = ({
  label,
  name,
  register,
  errors,
  isRequired,
  errorMessage,
}) => {
  return (
    <FormItemContainer>
      <FormControl id={name} isRequired={isRequired} isInvalid={!!errors}>
        <FormLabel>{label}</FormLabel>
        <Textarea
          id={name}
          variant="filled"
          color="black"
          _focus={{ bg: "white" }}
          {...register(name, { required: isRequired ? errorMessage : false })}
        />
        {errors && <FormErrorMessage>{errors?.message}</FormErrorMessage>}
      </FormControl>
    </FormItemContainer>
  );
};
