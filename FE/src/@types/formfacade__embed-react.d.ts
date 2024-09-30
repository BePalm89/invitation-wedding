declare module '@formfacade/embed-react' {

  interface FormFacadeProps {
    formFacadeURL: string;
    onSubmitForm: (data: any) => void;  // Include the onSubmit method here
  }

  const FormFacade: React.ComponentType<FormFacadeProps>;
  export default FormFacade;
}
