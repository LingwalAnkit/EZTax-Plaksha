import IncomeDetailsForm from "./IncomeDetailsForm";
import DeductionsForm from "./DeductionsForm";
import ExemptionsForm from "./ExemptionsForm";
import TaxPaidForm from "./TaxPaidForm";

const TaxInputForm = ({
  userData,
  onInputChange,
  onGenerateReport,
  loading,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your Financial Data</h2>

      <IncomeDetailsForm userData={userData} onInputChange={onInputChange} />
      <DeductionsForm userData={userData} onInputChange={onInputChange} />
      <ExemptionsForm userData={userData} onInputChange={onInputChange} />
      <TaxPaidForm userData={userData} onInputChange={onInputChange} />

      <button
        onClick={onGenerateReport}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-blue-400"
      >
        {loading ? "Generating Report..." : "Generate Tax Report"}
      </button>
    </div>
  );
};

export default TaxInputForm;
