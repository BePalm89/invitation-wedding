import "./RadioButtonComponent.css";

import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { FormItemContainer } from "../FormItemContainer/FormItemContainer";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";

interface RadioButtonComponentProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  options: { value: string; label: string }[];
  errors?: FieldError;
  isRequired?: boolean;
  errorMessage?: string;
  onChange?: (value: string) => void;
  helperText?: string[];
}

export const RadioButtonComponent: React.FC<RadioButtonComponentProps> = ({
  label,
  name,
  register,
  options,
  errors,
  isRequired,
  errorMessage,
  onChange,
  helperText,
}) => {
  return (
    <FormItemContainer>
      <FormControl
        id={name}
        as="fieldset"
        isRequired={isRequired}
        isInvalid={!!errors}
      >
        <FormLabel as="legend">{label}</FormLabel>
        {helperText?.map((help, index) => (
          <p className="helper-text" key={index}>
            {help}
          </p>
        ))}
        <RadioGroup id={name} onChange={(value) => onChange?.(value)}>
          <HStack spacing="24px">
            {options.map((opt) => (
              <Radio
                value={opt.value}
                key={opt.value}
                {...register(name, {
                  required: isRequired ? errorMessage : false,
                })}
              >
                {opt.label}
              </Radio>
            ))}
          </HStack>
        </RadioGroup>
        {errors && <FormErrorMessage>{errors?.message}</FormErrorMessage>}
      </FormControl>
    </FormItemContainer>
  );
};
