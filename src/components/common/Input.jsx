// Input.jsx
import React from "react";

const Input = ({ label, type, placeholder, value, onChange }) => (
  <div className="flex gap-3 justify-between">
    <label className="my-auto font-semibold">{label}</label>
    <input
      className="px-3 outline-none py-1 block w-[280px] mt-1 mb-3"
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default Input;
