const InputField = ({
  label,
  value,
  onChange,
  type = "number",
  className = "",
}) => {
  return (
    <div className={className}>
      <label className="block text-sm mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default InputField;
