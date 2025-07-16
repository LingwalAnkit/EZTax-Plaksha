const ExtractedDataDisplay = ({ extractedData }) => {
  if (!extractedData || typeof extractedData !== "object") {
    return <p className="text-gray-400 italic">No extracted data available.</p>;
  }

  const renderValue = (value) => {
    if (value === null || value === undefined) {
      return "—";
    }
    if (typeof value === "object") {
      return JSON.stringify(value, null, 2);
    }
    return value.toString();
  };

  return (
    <div className="bg-gray-50 text-sm p-4 rounded max-h-[400px] overflow-auto space-y-2">
      {Object.entries(extractedData).map(([key, value]) => (
        <div
          key={key}
          className="flex justify-between items-start border-b py-1"
        >
          <span className="font-medium text-gray-700 capitalize w-1/3 break-words">
            {key.replace(/_/g, " ")}
          </span>
          <span className="text-gray-600 w-2/3 text-right break-words font-mono">
            {renderValue(value)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ExtractedDataDisplay;
