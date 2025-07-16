import { useState } from "react";
import ExtractedDataDisplay from "./ExtractedDataDisplay";
import AIReportDisplay from "./AIReportDisplay";

const ReportCard = ({ report, onGenerateReport, aiReport, activeReportId }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    await onGenerateReport(report);
    setIsGenerating(false);
  };

  return (
    <div className="border rounded-2xl p-4 shadow hover:shadow-lg transition bg-white">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-800">
          Document Type:{" "}
          <span className="capitalize text-blue-600">
            {report.documentType || "unknown"}
          </span>
        </h3>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
          {new Date(report.createdAt).toLocaleDateString()}
        </span>
      </div>

      <ExtractedDataDisplay extractedData={report.extracted} />

      <div className="mt-4 flex gap-2">
        <button
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating...
            </span>
          ) : (
            "Generate AI Report"
          )}
        </button>
      </div>

      {activeReportId === report._id && aiReport && (
        <AIReportDisplay aiReport={aiReport} />
      )}

      <p className="text-xs text-gray-400 mt-3">
        Uploaded on: {new Date(report.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default ReportCard;
