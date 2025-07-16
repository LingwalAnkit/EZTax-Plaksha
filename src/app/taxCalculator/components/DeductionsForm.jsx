import InputField from "./InputField";

const DeductionsForm = ({ userData, onInputChange }) => {
  const handleChange = (field, value) => {
    onInputChange("deductions", field, value);
  };

  return (
    <div className="mb-6">
      <h3 className="font-medium mb-2">Deductions</h3>
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Section 80C"
          value={userData.deductions.section_80C}
          onChange={(value) => handleChange("section_80C", value)}
        />
        <InputField
          label="Section 80D"
          value={userData.deductions.section_80D}
          onChange={(value) => handleChange("section_80D", value)}
        />
        <InputField
          label="Section 24B"
          value={userData.deductions.section_24B}
          onChange={(value) => handleChange("section_24B", value)}
        />
        <InputField
          label="NPS Contribution"
          value={userData.deductions.nps_contribution}
          onChange={(value) => handleChange("nps_contribution", value)}
        />
      </div>
    </div>
  );
};

export default DeductionsForm;
