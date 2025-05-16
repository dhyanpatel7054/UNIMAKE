import React from "react";

const FormField = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  disabled,
  placeholder,
  inputMode,
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-gray-700 mb-2">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "focus:ring-blue-500 border-gray-300"
          } outline-none transition`}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          inputMode={inputMode}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "focus:ring-blue-500 border-gray-300"
          } outline-none transition`}
        />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormField;
