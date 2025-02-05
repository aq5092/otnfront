import React, { useState } from "react";

const DependentSelects = () => {
  const [firstSelect, setFirstSelect] = useState(""); // State for first dropdown
  const [secondOptions, setSecondOptions] = useState([]); // Options for second dropdown
  const [secondSelect, setSecondSelect] = useState(""); // State for second dropdown

  // Data for the dropdowns
  const data = {
    Fruits: ["Apple", "Banana", "Orange"],
    Vegetables: ["Carrot", "Spinach", "Potato"],
    Drinks: ["Water", "Juice", "Soda"],
  };

  const handleFirstSelectChange = (e) => {
    const selectedValue = e.target.value;
    setFirstSelect(selectedValue);
    setSecondOptions(data[selectedValue] || []); // Update second dropdown options
    setSecondSelect(""); // Reset the second dropdown
  };

  const handleSecondSelectChange = (e) => {
    setSecondSelect(e.target.value);
  };

  return (
    <div className="p-4">
      <label className="block mb-2">First Select:</label>
      <select
        value={firstSelect}
        onChange={handleFirstSelectChange}
        className="border p-2 rounded mb-4 w-full"
      >
        <option value="">-- Select an option --</option>
        {Object.keys(data).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>

      <label className="block mb-2">Second Select:</label>
      <select
        value={secondSelect}
        onChange={handleSecondSelectChange}
        className="border p-2 rounded w-full"
        disabled={!firstSelect} // Disable if no selection in first dropdown
      >
        <option value="">-- Select an option --</option>
        {secondOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DependentSelects;
