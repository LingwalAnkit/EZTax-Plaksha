import InputField from "./InputField";

const IncomeDetailsForm = ({ userData, onInputChange }) => {
  const handleChange = (field, value) => {
    onInputChange("income_details", field, value);
  };

  return (
    <div className="mb-6">
      <h3 className="font-medium mb-2">Income Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Salary Income"
          value={userData.income_details.salary_income}
          onChange={(value) => handleChange("salary_income", value)}
        />
        <InputField
          label="Rental Income"
          value={userData.income_details.rental_income}
          onChange={(value) => handleChange("rental_income", value)}
        />
        <InputField
          label="Interest Income"
          value={userData.income_details.interest_income}
          onChange={(value) => handleChange("interest_income", value)}
        />
        <InputField
          label="Other Income"
          value={userData.income_details.other_income}
          onChange={(value) => handleChange("other_income", value)}
        />
      </div>
    </div>
  );
};

export default IncomeDetailsForm;
