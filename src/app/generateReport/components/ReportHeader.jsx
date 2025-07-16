const ReportHeader = ({ reportCount }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-3xl font-bold text-blue-600">
          Your Extracted Reports
        </h2>
        <p className="text-gray-600 mt-1">
          {reportCount} report{reportCount !== 1 ? "s" : ""} found
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">Last updated:</span>
        <span className="text-sm font-medium text-gray-700">
          {new Date().toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default ReportHeader;
