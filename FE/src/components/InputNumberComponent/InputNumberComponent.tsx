import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { FormItemContainer } from "../FormItemContainer/FormItemContainer";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

interface InputNumberComponentProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  min?: number;
  errors?: FieldError;
  isRequired?: boolean;
  errorMessage?: string;
}
export const InputNumberComponent: React.FC<InputNumberComponentProps> = ({
  label,
  name,
  register,
  min,
  errors,
  isRequired,
  errorMessage,
}) => {
  return (
    <FormItemContainer>
      <FormControl id={name} isRequired={isRequired} isInvalid={!!errors}>
        <FormLabel>{label}</FormLabel>
        <NumberInput
          min={min}
          variant="filled"
          color="black"
          isInvalid={!!errors}
          id={name}
        >
          <NumberInputField
            _focus={{ bg: "white" }}
            {...register(name, {
              required: isRequired ? errorMessage : false,
            })}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <p>{!!errors}</p>
        {errors && <FormErrorMessage>{errors?.message}</FormErrorMessage>}
      </FormControl>
    </FormItemContainer>
  );
};
