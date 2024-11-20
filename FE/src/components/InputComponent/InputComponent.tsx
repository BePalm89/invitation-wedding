import React from "react";
import { FormItemContainer } from "../FormItemContainer/FormItemContainer";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FieldError, UseFormRegister } from "react-hook-form";
interface InputComponentProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors?: FieldError;
  isRequired?: boolean;
  errorMessage?: string;
}

export const InputComponent: React.FC<InputComponentProps> = ({
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
        <Input
          variant="filled"
          color="black"
          _focus={{ bg: "white" }}
          type="text"
          id={name}
          {...register(name, { required: isRequired ? errorMessage : false })}
        />
        {errors && <FormErrorMessage>{errors?.message}</FormErrorMessage>}
      </FormControl>
    </FormItemContainer>
  );
};
