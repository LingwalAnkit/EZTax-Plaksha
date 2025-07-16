import TaxRegimeCard from "./TaxRegimeCard";
import RecommendationCard from "./RecommendationCard";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import ReactMarkdown from "react-markdown";

const TaxReportDisplay = ({ report, loading }) => {
  const renderEmptyState = () => (
    <div className="text-gray-500 text-center p-8">
      Fill in your financial details and generate a report to see your tax
      calculation and personalized insights.
    </div>
  );

  const renderInsights = () => (
    <div className="mt-6">
      <h3 className="font-medium text-lg mb-3">Personalized Insights</h3>
      <div className="prose max-w-none  [&_p]:mt-2">
        {report.investment_insights ? (
          <ReactMarkdown>{report.investment_insights}</ReactMarkdown>
        ) : (
          <p className="text-gray-500">No additional insights available.</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your Tax Report</h2>

      {!report && !loading && renderEmptyState()}
      {loading && <LoadingSpinner />}

      {report && !loading && (
        <div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <TaxRegimeCard
              title="Old Tax Regime"
              report={report}
              regimeType="old"
            />
            <TaxRegimeCard
              title="New Tax Regime"
              report={report}
              regimeType="new"
            />
          </div>

          <RecommendationCard report={report} />
          {renderInsights()}
        </div>
      )}
    </div>
  );
};

export default TaxReportDisplay;
