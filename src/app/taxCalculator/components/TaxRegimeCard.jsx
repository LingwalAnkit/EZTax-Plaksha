const TaxRegimeCard = ({ title, report, regimeType }) => {
  const taxableIncome =
    regimeType === "old"
      ? report.taxable_income_old
      : report.taxable_income_new;
  const totalTax =
    regimeType === "old" ? report.total_tax_old : report.total_tax_new;
  const taxDueOrRefund =
    regimeType === "old"
      ? report.tax_due_or_refund_old
      : report.tax_due_or_refund_new;

  return (
    <div className="bg-gray-50 p-4 rounded">
      <h3 className="font-medium text-lg mb-2">{title}</h3>
      <div className="space-y-2">
        <p>
          <span className="font-medium">Taxable Income:</span> ₹
          {taxableIncome.toLocaleString()}
        </p>
        <p>
          <span className="font-medium">Tax Amount:</span> ₹
          {totalTax.toLocaleString()}
        </p>
        <p className={taxDueOrRefund >= 0 ? "text-green-600" : "text-red-600"}>
          <span className="font-medium">
            {taxDueOrRefund >= 0 ? "Refund" : "Due"}:
          </span>
          ₹{Math.abs(taxDueOrRefund).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default TaxRegimeCard;
