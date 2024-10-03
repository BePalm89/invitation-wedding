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
  isSleepingInHotel: boolean;
  numberOfRooms: number;
  whichHotel: string;
  isUsingOneWayBus: boolean;
  numberOfPplOneWayBus: number;
  isUsingReturnBus: boolean;
  numberOfPplReturnBus: number;
  preferredTimeToReturn: string;
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

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(
        "https://invitation-wedding-wfqf.vercel.app/api/v1/wedding/generate-excel",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("An error occur");
      }

      console.log("Success");
    } catch (error) {
      console.log(error);
    }
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
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
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
          <FormControl id="isSleepingInHotel" as="fieldset" isRequired>
            <FormLabel as="legend">{t("form.accommodation")}</FormLabel>
            <RadioGroup
              id="isSleepingInHotel"
              onChange={(value) => setShowAccommodationPeople(value === "yes")}
            >
              <HStack spacing="24px">
                <Radio
                  value="yes"
                  {...register("isSleepingInHotel", { required: "Requerido" })}
                >
                  Yes
                </Radio>
                <Radio
                  value="no"
                  {...register("isSleepingInHotel", { required: "Requerido" })}
                >
                  No
                </Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
        </FormContainer>
        {showAccommodationPeople && (
          <FormContainer>
            <FormControl id="numberOfRooms" isRequired>
              <FormLabel>{t("form.number-of-accommodation")}</FormLabel>
              <NumberInput
                min={0}
                variant="filled"
                color="black"
                isInvalid={!!errors.numberOfRooms}
                id="numberOfRooms"
              >
                <NumberInputField
                  _focus={{ bg: "white" }}
                  {...register("numberOfRooms", {
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
                  <Radio
                    value="bcn"
                    {...register("whichHotel", { required: "Requerido" })}
                  >
                    Ibis hotel
                  </Radio>
                  <Radio
                    value="sitges"
                    {...register("whichHotel", { required: "Requerido" })}
                  >
                    Sitges
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </FormContainer>
        )}
        <FormContainer>
          <FormControl id="isUsingOneWayBus" as="fieldset">
            <FormLabel as="legend">{t("form.one-way-bus")}</FormLabel>
            <RadioGroup
              id="isUsingOneWayBus"
              onChange={(value) => setShowHowManyPplOneWayBus(value === "yes")}
            >
              <HStack spacing="24px">
                <Radio
                  value="yes"
                  {...register("isUsingOneWayBus", { required: "Requerido" })}
                >
                  Yes
                </Radio>
                <Radio
                  value="now"
                  {...register("isUsingOneWayBus", { required: "Requerido" })}
                >
                  No
                </Radio>
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
          <FormControl id="isUsingReturnBus" as="fieldset">
            <FormLabel as="legend">{t("form.return-bus")}</FormLabel>
            <RadioGroup
              id="isUsingReturnBus"
              onChange={(value) => setShowHowManyPplReturnBus(value === "yes")}
            >
              <HStack spacing="24px">
                <Radio
                  value="yes"
                  {...register("isUsingReturnBus", { required: "Requerido" })}
                >
                  Yes
                </Radio>
                <Radio
                  value="now"
                  {...register("isUsingReturnBus", { required: "Requerido" })}
                >
                  No
                </Radio>
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
                  <Radio
                    value="1"
                    {...register("preferredTimeToReturn", {
                      required: "Requerido",
                    })}
                  >
                    01:00am
                  </Radio>
                  <Radio
                    value="4"
                    {...register("preferredTimeToReturn", {
                      required: "Requerido",
                    })}
                  >
                    04:00am
                  </Radio>
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
