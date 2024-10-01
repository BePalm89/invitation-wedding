import { useTranslation } from "react-i18next";
import "./Form.css";
import { Text } from "../../components/Text/Text";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  HStack,
  RadioGroup,
  Radio,
  Box,
} from "@chakra-ui/react";
import { FormContainer } from "../../components/FormContainer/FormContainer";
import { useForm } from "react-hook-form";
import { Button as ChakraButton } from "@chakra-ui/react";
import { useState } from "react";
import "./Form.css";

interface FormData {
  name: string;
  numberOfAssistants: number;
  allergies: string;
  oneWayBus: boolean;
  numberOfPplOneWayBus: number;
  returnBus: boolean;
  numberOfPplReturnBus: number;
  preferredTimeToReturn: string;
  sleepingPlace: boolean;
  howManyPeopleSleep: number;
  whichHotel: string;
}

export const Form = () => {
  const { t } = useTranslation();

  const [showAccommodationPeople, setShowAccommodationPeople] = useState(false);
  const [showHowManyPplOneWayBus, setShowHowManyPplOneWayBus] = useState(false);
  const [showHowManyPplReturnBus, setShowHowManyPplReturnBus] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div>
      <h1>{t("title.your-election")}</h1>
      <Text text={t("text.your-election-msg")} />
      <Text text={t("text.questions")} />
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <FormContainer>
          <FormControl id="name" isRequired isInvalid={!!errors.name}>
            <FormLabel>{t("form.name")}</FormLabel>
            <Input
              variant="filled"
              color="black"
              _focus={{ bg: "white" }}
              type="text"
              id="name"
              {...register("name", { required: "Requerido" })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
        </FormContainer>
        <FormContainer>
          <FormControl id="numberOfAssistants" isRequired>
            <FormLabel>{t("form.assistants")}</FormLabel>
            <NumberInput
              min={0}
              variant="filled"
              color="black"
              isInvalid={!!errors.numberOfAssistants}
              id="numberOfAssistants"
            >
              <NumberInputField
                _focus={{ bg: "white" }}
                {...register("numberOfAssistants", {
                  required: "Requerido",
                })}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </FormContainer>
        <FormContainer>
          <FormControl id="allergies" isRequired>
            <FormLabel>{t("form.allergies")}</FormLabel>
            <Textarea
              id="allergies"
              variant="filled"
              color="black"
              _focus={{ bg: "white" }}
              {...register("allergies", {
                required: "Requerido",
              })}
            />
          </FormControl>
        </FormContainer>
        <FormContainer>
          <FormControl id="sleepingPlace" as="fieldset">
            <FormLabel as="legend">{t("form.accommodation")}</FormLabel>
            <RadioGroup
              id="sleepingPlace"
              onChange={(value) => setShowAccommodationPeople(value === "yes")}
            >
              <HStack spacing="24px">
                <Radio value="yes">Yes</Radio>
                <Radio value="now">No</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
        </FormContainer>
        {showAccommodationPeople && (
          <FormContainer>
            <FormControl id="howManyPeopleSleep" isRequired>
              <FormLabel>{t("form.number-of-accommodation")}</FormLabel>
              <NumberInput
                min={0}
                variant="filled"
                color="black"
                isInvalid={!!errors.howManyPeopleSleep}
                id="howManyPeopleSleep"
              >
                <NumberInputField
                  _focus={{ bg: "white" }}
                  {...register("howManyPeopleSleep", {
                    required: "Requerido",
                  })}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </FormContainer>
        )}
        {showAccommodationPeople && (
          <FormContainer>
            <FormControl id="whichHotel" as="fieldset">
              <FormLabel as="legend">{t("form.which-hotel")}</FormLabel>
              <RadioGroup>
                <HStack spacing="24px">
                  <Radio value="bcn">Ibis hotel</Radio>
                  <Radio value="sitges">Sitges</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </FormContainer>
        )}
        <FormContainer>
          <FormControl id="oneWayBus" as="fieldset">
            <FormLabel as="legend">{t("form.one-way-bus")}</FormLabel>
            <RadioGroup
              id="oneWayBus"
              onChange={(value) => setShowHowManyPplOneWayBus(value === "yes")}
            >
              <HStack spacing="24px">
                <Radio value="yes">Yes</Radio>
                <Radio value="now">No</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
        </FormContainer>
        {showHowManyPplOneWayBus && (
          <FormContainer>
            <FormControl id="numberOfPplOneWayBus" isRequired>
              <FormLabel>{t("form.bus-ppl")}</FormLabel>
              <NumberInput
                min={1}
                variant="filled"
                color="black"
                isInvalid={!!errors.numberOfPplOneWayBus}
                id="numberOfPplOneWayBus"
              >
                <NumberInputField
                  _focus={{ bg: "white" }}
                  {...register("numberOfPplOneWayBus", {
                    required: "Requerido",
                  })}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </FormContainer>
        )}
        <FormContainer>
          <FormControl id="returnBus" as="fieldset">
            <FormLabel as="legend">{t("form.return-bus")}</FormLabel>
            <RadioGroup
              id="returnBus"
              onChange={(value) => setShowHowManyPplReturnBus(value === "yes")}
            >
              <HStack spacing="24px">
                <Radio value="yes">Yes</Radio>
                <Radio value="now">No</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
        </FormContainer>
        {showHowManyPplReturnBus && (
          <FormContainer>
            <FormControl id="numberOfPplReturnBus" isRequired>
              <FormLabel>{t("form.bus-ppl")}</FormLabel>
              <NumberInput
                min={1}
                variant="filled"
                color="black"
                _focus={{ bg: "white" }}
                isInvalid={!!errors.numberOfPplReturnBus}
                id="numberOfPplReturnBus"
              >
                <NumberInputField
                  _focus={{ bg: "white" }}
                  {...register("numberOfPplReturnBus", {
                    required: "Requerido",
                  })}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </FormContainer>
        )}
        {showHowManyPplReturnBus && (
          <FormContainer>
            <FormControl id="preferredTimeToReturn" as="fieldset">
              <FormLabel as="legend">{t("form.time-return-bus")}</FormLabel>
              <RadioGroup id="preferredTimeToReturn">
                <HStack spacing="24px">
                  <Radio value="1">01:00am</Radio>
                  <Radio value="4">04:00am</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </FormContainer>
        )}
        <FormContainer>
          <ChakraButton
            type="submit"
            colorScheme="teal"
            width={{ base: "full", md: "30%" }}
          >
            Submit
          </ChakraButton>
        </FormContainer>
      </form>
    </div>
  );
};
