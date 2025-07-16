import InputField from "./InputField";

const TaxPaidForm = ({ userData, onInputChange }) => {
  const handleChange = (field, value) => {
    onInputChange("tax_paid", field, value);
  };

  return (
    <div className="mb-6">
      <h3 className="font-medium mb-2">Tax Already Paid</h3>
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="TDS"
          value={userData.tax_paid.tds}
          onChange={(value) => handleChange("tds", value)}
        />
        <InputField
          label="Advance Tax"
          value={userData.tax_paid.advance_tax}
          onChange={(value) => handleChange("advance_tax", value)}
        />
        <InputField
          label="Self Assessment Tax"
          value={userData.tax_paid.self_assessment_tax}
          onChange={(value) => handleChange("self_assessment_tax", value)}
        />
      </div>
    </div>
  );
};

export default TaxPaidForm;
