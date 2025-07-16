import InputField from "./InputField";

const ExemptionsForm = ({ userData, onInputChange }) => {
  const handleChange = (field, value) => {
    onInputChange("exemptions", field, value);
  };

  return (
    <div className="mb-6">
      <h3 className="font-medium mb-2">Exemptions</h3>
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="HRA Exemption"
          value={userData.exemptions.hra_exemption}
          onChange={(value) => handleChange("hra_exemption", value)}
        />
        <InputField
          label="LTA Exemption"
          value={userData.exemptions.lta_exemption}
          onChange={(value) => handleChange("lta_exemption", value)}
        />
        <InputField
          label="Other Exemptions"
          value={userData.exemptions.other_exemptions}
          onChange={(value) => handleChange("other_exemptions", value)}
        />
      </div>
    </div>
  );
};

export default ExemptionsForm;
