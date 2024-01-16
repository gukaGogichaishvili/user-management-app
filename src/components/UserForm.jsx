import React, { useCallback, useState } from "react";
import { Button, DatePicker, Form, Input } from "antd";
import CarInputs from "./CarInputs";
import moment from 'moment';


const UserForm = ({ initialValues, addOrUpdate }) => {
  const { name, username, pasport, dateOfBirth, carBrand, carModel, carplate } =
    initialValues;

  const [formData, setFormData] = useState({
    name,
    username,
    pasport,
    dateOfBirth,
    carBrand,
    carModel,
    carplate,
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    username: "",
    pasport: "",
    dateOfBirth: "",
    carBrand: "",
    carModel: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "name" || name === "username") {
      setFormErrors((prev) => ({
        ...prev,
        [name]: /^[A-Za-z]{2,36}$/.test(value)
          ? ""
          : "Input must be 2-36 characters and letters only.",
      }));
    } else if (name === "pasport") {
      setFormErrors((prev) => ({
        ...prev,
        [name]: /^[0-9]{9,12}$/.test(value) ? "" : "ID must be 9-12 digits.",
      }));
    } else if (name === "carplate") {
      setFormErrors((prev) => ({
        ...prev,
        [name]: value ? "" : "Field should not be empty",
      }));
    }
  };

  const handleDateChange = (date, dateString) => {
    setFormData((prev) => ({ ...prev, dateOfBirth: dateString }));
    setFormErrors((prev) => ({
      ...prev,
      dateOfBirth: dateString ? "" : "Please select a date of birth.",
    }));
  };

  const handleCarSelection = (carBrand, carModel) => {
    setFormData((prev) => ({
      ...prev,
      carBrand: carBrand,
      carModel: carModel,
    }));
    setFormErrors((prev) => ({
      ...prev,
      carBrand: carBrand ? "" : "Please select a car brand.",
      carModel: carModel ? "" : "Please select a car model.",
    }));
  };

  const handleSubmit = () => {
    const isFormValid =
      Object.values(formErrors).every((err) => err === "") &&
      formData.name &&
      formData.username &&
      formData.pasport &&
      formData.dateOfBirth &&
      formData.carBrand &&
      formData.carModel &&
      formData.carplate;

    if (isFormValid) {
      addOrUpdate(formData);
      console.log(formData);
      if(initialValues.pasport === ''){
        setFormData(initialValues);
      }
    } else {
      console.log(formErrors);
    }
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 700 }}
      onFinish={handleSubmit}
    >
      <Form.Item label="Name" help={formErrors.name}>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          autoComplite="off"
        />
      </Form.Item>
      <Form.Item label="Username" help={formErrors.username}>
        <Input
          name="username"
          value={formData.username}
          onChange={handleChange}
          autoComplite="off"
        />
      </Form.Item>
      <Form.Item label="ID" help={formErrors.pasport}>
        <Input
          name="pasport"
          value={formData.pasport}
          onChange={handleChange}
          autoComplite="off"
          disabled={initialValues.name !== ''} 
        />
      </Form.Item>
      <Form.Item label="Date of Birth" help={formErrors.dateOfBirth}>
        <DatePicker onChange={handleDateChange}     value={formData.dateOfBirth ? moment(formData.dateOfBirth, "YYYY-MM-DD") : null}   />
      </Form.Item>
      <CarInputs
        onCarSelection={handleCarSelection}
        initialBrand={formData.carBrand}
        initialModel={formData.carModel}
      />u
      <Form.Item label="Plate Number" help={formErrors.carplate}>
        <Input
          name="carplate"
          value={formData.carplate}
          onChange={handleChange}
          autoComplite="off"
        />
      </Form.Item>
      <Form.Item className="w-full ml-28">
        <Button
          className="bg-rose-400 w-full hover:bg-rose-500 text-neutral-50"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default React.memo(UserForm);
