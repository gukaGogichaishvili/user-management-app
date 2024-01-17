import React from "react";
import UserForm from "./UserForm";

const FormWrapper = () => {
 

  const addingUser = true;

  const initialValues = {
    name: "",
    username: "",
    pasport: "",
    dateOfBirth: '',
    carBrand: null,
    carModel: null,
    carplate: "",
  };
  return <UserForm initialValues={initialValues} addingUser={addingUser} />;
};

export default FormWrapper;
