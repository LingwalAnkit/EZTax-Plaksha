import ReactMarkdown from "react-markdown";

const AIReportDisplay = ({ aiReport }) => {
  if (!aiReport) return null;

  const customComponents = {
    h1: ({ children }) => (
      <h1 className="text-lg font-bold mb-2">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-md font-semibold mb-2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-sm font-medium mb-1">{children}</h3>
    ),
    p: ({ children }) => <p className="mb-2 text-gray-700">{children}</p>,
    ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
    li: ({ children }) => <li className="mb-1">{children}</li>,
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
  };

  return (
    <div className="mt-4 p-4 bg-blue-50 rounded border border-blue-200">
      <h4 className="font-semibold text-blue-700 mb-3">AI Tax Report</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Total Income:</span>
            <span className="text-green-600">
              ₹{aiReport.total_income?.toLocaleString() || 0}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Tax (Old Regime):</span>
            <span className="text-blue-600">
              ₹{aiReport.total_tax_old?.toLocaleString() || 0}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Tax (New Regime):</span>
            <span className="text-blue-600">
              ₹{aiReport.total_tax_new?.toLocaleString() || 0}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Refund/Due (Old):</span>
            <span
              className={
                aiReport.tax_due_or_refund_old >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              ₹{Math.abs(aiReport.tax_due_or_refund_old || 0).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Refund/Due (New):</span>
            <span
              className={
                aiReport.tax_due_or_refund_new >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              ₹{Math.abs(aiReport.tax_due_or_refund_new || 0).toLocaleString()}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            Better:{" "}
            {aiReport.total_tax_old < aiReport.total_tax_new ? "Old" : "New"}{" "}
            Regime
          </div>
        </div>
      </div>

      {aiReport.investment_insights && (
        <div className="mt-4 border-t pt-4">
          <h5 className="font-semibold mb-2 text-blue-700">
            Investment Insights:
          </h5>
          <div className="prose max-w-none prose-sm">
            <ReactMarkdown components={customComponents}>
              {aiReport.investment_insights}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIReportDisplay;
