import React from "react";
import UserForm from "./UserForm";
import { useUserListContext } from "../context/UserListContext";

const FormWrapper = () => {
  const { addUser } = useUserListContext();

  const initialValues = {
    name: "",
    username: "",
    pasport: "",
    dateOfBirth: null,
    carBrand: null,
    carModel: null,
    carplate: "",
  };
  return <UserForm initialValues={initialValues} addOrUpdate={addUser} />;
};

export default FormWrapper;
