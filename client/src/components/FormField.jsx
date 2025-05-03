import React from "react";
import { Field, ErrorMessage } from "formik";

const FormField = ({ label, name, type, placeholder }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-sm text-red-500 mt-1"
      />
    </div>
  );
};

export default FormField;
