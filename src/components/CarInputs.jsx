import React, { useState } from "react";
import { Form, Select } from "antd";
import carData from "../../carData.json";

const { Option } = Select;

const CarInputs = ({ onCarSelection, initialBrand, initialModel }) => {
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [models, setModels] = useState([]);

  const handleBrandChange = (value) => {
    setSelectedBrand(value);
    setModels(carData[value]);
    onCarSelection(value, null);
  };

  const handleModelChange = (value) => {
    onCarSelection(selectedBrand, value);

  };

  return (
    <>
      <Form.Item label="Brand">
        <Select
          value={initialBrand}
          showSearch
          placeholder="Select a brand"
          onChange={handleBrandChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {Object.keys(carData).map((brand) => (
            <Option key={brand} value={brand}>
              {brand}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {selectedBrand && (
        <Form.Item label="Model">
          <Select
            value={initialModel}
            showSearch
            placeholder="Select a model"
            onChange={handleModelChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {models.map((model) => (
              <Option key={model} value={model}>
                {model}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}
    </>
  );
};

export default CarInputs;
