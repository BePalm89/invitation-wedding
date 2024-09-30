import FormFacade from "@formfacade/embed-react";

// YourComponent.tsx
// Add this line at the top of your file
declare module "@formfacade/embed-react";

export const Form = () => {

  return (
    <FormFacade
      formFacadeURL="https://formfacade.com/include/115308944353691577327/form/1FAIpQLSceAcTJ4H5mhi4HiSVFtupF_B86ptdcTP1qVSBehv69EG_Tzg/classic.js/?div=ff-compose"
      onSubmitForm={() => console.log("form submitted")}
    />
  );
};
