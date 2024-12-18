import "./Choices.css";
import { useTranslation } from "react-i18next";
import { Text } from "../../components/Text/Text";
import { FormItemContainer } from "../../components/FormItemContainer/FormItemContainer";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { InputComponent } from "../../components/InputComponent/InputComponent";
import { TextAreaComponent } from "../../components/TextAreaComponent/TextAreaComponent";
import { InputNumberComponent } from "../../components/InputNumberComponent/InputNumberComponent";
import { RadioButtonComponent } from "../../components/RadioButtonComponent/RadioButtonComponent";
import { ButtonComponent } from "../../components/ButtonComponent/ButtonComponent";
import { AlertComponent } from "../../components/AlertComponent/AlertComponent";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

interface FormData {
  name: string;
  numberOfAssistants: number;
  allergies: string;
  isUsingOneWayBus: boolean;
  numberOfPplOneWayBus: number;
  fromHotel: string;
  isUsingReturnBus: boolean;
  numberOfPplReturnBus: number;
  toHotel: string;
  preferredTimeToReturn: string;
}

export const Choices = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const [showHowManyPplOneWayBus, setShowHowManyPplOneWayBus] = useState(false);
  const [showHowManyPplReturnBus, setShowHowManyPplReturnBus] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleShowHowManyPplOneWayBus = (value: string) => {
    if (value === "no") resetField("numberOfPplOneWayBus");
    setShowHowManyPplOneWayBus(value === "yes");
  };

  const handleShowHowManyPplReturnBus = (value: string) => {
    if (value === "no") {
      resetField("numberOfPplReturnBus");
      resetField("preferredTimeToReturn");
    }
    setShowHowManyPplReturnBus(value === "yes");
  };

  const showToast = (
    status: "info" | "warning" | "success" | "error" | "loading" | undefined,
    message: string
  ) => {
    toast({
      position: "top",
      render() {
        return <AlertComponent status={status} message={message} />;
      },
    });
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    resetField,
    watch
  } = useForm<FormData>({ mode: "all" });

  const numberOfAssistants = watch("numberOfAssistants");

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    const { numberOfAssistants, allergies, isUsingOneWayBus, numberOfPplOneWayBus, fromHotel, isUsingReturnBus, numberOfPplReturnBus, toHotel, preferredTimeToReturn } = data;

    const assistantNames = Array.from({ length: numberOfAssistants || 0 })
        .map((_, index) => data[`name${index + 1}` as keyof FormData])
        .filter(Boolean) // Remove any empty names
        .join(", ");

    const body = {
      numberOfAssistants,
      name: assistantNames, // Include only the concatenated names
      allergies,
      isUsingOneWayBus,
      numberOfPplOneWayBus,
      fromHotel,
      isUsingReturnBus,
      numberOfPplReturnBus,
      toHotel,
      preferredTimeToReturn,
    };

    try {
      const response = await fetch(
        "https://invitation-wedding-wfqf.vercel.app/api/v1/wedding/generate-excel",
        //"http://localhost:8000/api/v1/wedding/generate-excel",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("An error occur");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      showToast("success", t("message.ok"));
      setIsLoading(false);
    } catch (error) {
      showToast("error", t("message.not-ok"));
    }
  };

  return (
    <div>
      {isLoading && (
        <div className="spinner-container">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#77B4D0"
            size="xl"
          />
        </div>
      )}
      <h1>{t("title.your-election")}</h1>
      <Text text={t("text.your-election-msg")} />
      <Text text={t("form.questions")} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-container"
        noValidate
      >
        <InputNumberComponent
            label={t("form.assistants")}
            name="numberOfAssistants"
            register={register}
            min={1}
            errors={errors.numberOfAssistants}
            isRequired={true}
            errorMessage={t("form-validation.required")}
        />
        {Array.from({ length: numberOfAssistants || 0 }).map((_, index) => {
          const fieldName = `name${index + 1}` as keyof FormData;
          return ( <InputComponent
              key={index}
              label={`${t("form.name")} ${index + 1}:`}
              name={fieldName}
              register={register}
              errors={errors[fieldName]}
              isRequired={true}
              errorMessage={t("form-validation.required")}
          />)
        })}
        <TextAreaComponent
          label={t("form.allergies")}
          name="allergies"
          register={register}
          errors={errors.allergies}
          isRequired={true}
          errorMessage={t("form-validation.required")}
        />
        <RadioButtonComponent
          label={t("form.one-way-bus")}
          name="isUsingOneWayBus"
          register={register}
          options={[
            { value: "yes", label: t("form.yes") },
            { value: "no", label: t("form.no") },
          ]}
          errors={errors.isUsingOneWayBus}
          isRequired={true}
          errorMessage={t("form-validation.required")}
          onChange={handleShowHowManyPplOneWayBus}
          helperText={[
            t("form.help-bus"),
          ]}
        />
        {showHowManyPplOneWayBus && (
          <InputNumberComponent
            label={t("form.bus-ppl")}
            name="numberOfPplOneWayBus"
            register={register}
            min={1}
            errors={errors.numberOfPplOneWayBus}
            isRequired={true}
            errorMessage={t("form-validation.required")}
          />
        )}
        {showHowManyPplOneWayBus && (
            <RadioButtonComponent
                label={t("form.which-hotel")}
                name="fromHotel"
                register={register}
                options={[
                  { value: "bcn", label: t("form.bcnHotel") },
                  { value: "sitges", label: t("form.sitgesHotel") },
                ]}
                errors={errors.fromHotel}
                isRequired={true}
                errorMessage={t("form-validation.required")}
            />
        )}

        <RadioButtonComponent
          label={t("form.return-bus")}
          name="isUsingReturnBus"
          register={register}
          options={[
            { value: "yes", label: t("form.yes") },
            { value: "no", label: t("form.no") },
          ]}
          errors={errors.isUsingReturnBus}
          isRequired={true}
          errorMessage={t("form-validation.required")}
          onChange={handleShowHowManyPplReturnBus}
          helperText={[
            t("form.help-bus"),
          ]}
        />
        {showHowManyPplReturnBus && (
          <InputNumberComponent
            label={t("form.bus-ppl")}
            name="numberOfPplReturnBus"
            register={register}
            min={1}
            errors={errors.numberOfPplReturnBus}
            isRequired={true}
            errorMessage={t("form-validation.required")}
          />
        )}
        {showHowManyPplReturnBus && (
            <RadioButtonComponent
                label={t("form.from-hotel")}
                name="toHotel"
                register={register}
                options={[
                  { value: "bcn", label: t("form.bcnHotel") },
                  { value: "sitges", label: t("form.sitgesHotel") },
                ]}
                errors={errors.toHotel}
                isRequired={true}
                errorMessage={t("form-validation.required")}
            />
        )}
        {showHowManyPplReturnBus && (
          <RadioButtonComponent
            label={t("form.time-return-bus")}
            name="preferredTimeToReturn"
            register={register}
            options={[
              { value: "1", label: "00:00am" },
              { value: "4", label: "03:00am" },
            ]}
            errors={errors.preferredTimeToReturn}
            isRequired={true}
            errorMessage={t("form-validation.required")}
          />
        )}
        <FormItemContainer>
          <ButtonComponent
            label={t("button.submit")}
            type="submit"
            width={{ base: "full", md: "30%" }}
            onClick={() => {}}
            disabled={!isValid}
          />
        </FormItemContainer>
      </form>
    </div>
  );
};
