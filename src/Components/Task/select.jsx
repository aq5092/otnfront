import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Select() {
  const { register, handleSubmit, watch } = useForm();
  const [selectedOption, setSelectedOption] = useState("");

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert(`Selected Option: ${data.mySelect}`);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">React Hook Form with Select</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Choose an option:</span>
          <select
            {...register("mySelect", { required: true })}
            value={selectedOption}
            onChange={handleSelectChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="" disabled>
              -- Select an option --
            </option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </select>
        </label>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {selectedOption && (
        <p className="mt-4 text-green-600">You selected: {selectedOption}</p>
      )}
    </div>
  );
}
