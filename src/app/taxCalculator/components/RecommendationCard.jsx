const RecommendationCard = ({ report }) => {
  const isOldBetter = report.total_tax_old < report.total_tax_new;
  const savings = Math.abs(report.total_tax_old - report.total_tax_new);

  return (
    <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500 mb-4">
      <h3 className="font-medium text-lg mb-2">Recommended Regime</h3>
      <p className="font-medium">
        {isOldBetter ? "Old Tax Regime" : "New Tax Regime"} is better for you.
      </p>
      <p>
        You'll save ₹{savings.toLocaleString()} with the{" "}
        {isOldBetter ? "Old" : "New"} regime.
      </p>
    </div>
  );
};

export default RecommendationCard;
