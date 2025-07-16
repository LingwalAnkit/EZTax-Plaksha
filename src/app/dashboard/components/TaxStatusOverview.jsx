"use client";
const TaxStatusOverview = ({ taxData }) => {
  const defaultData = {
    totalIncome: 1500000,
    totalTax: 180000,
    refundDue: 15000,
    filingStatus: "Pending",
  };

  const data = taxData || defaultData;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-blue-500 mb-4">
        Tax Status Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-500 mb-1">
            Total Income
          </h3>
          <p className="text-2xl font-bold text-gray-800">
            ₹{data.totalIncome.toLocaleString()}
          </p>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-500 mb-1">Total Tax</h3>
          <p className="text-2xl font-bold text-gray-800">
            ₹{data.totalTax.toLocaleString()}
          </p>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-500 mb-1">Refund Due</h3>
          <p className="text-2xl font-bold text-green-600">
            ₹{data.refundDue.toLocaleString()}
          </p>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-500 mb-1">
            Filing Status
          </h3>
          <p className="text-lg font-semibold text-orange-600">
            {data.filingStatus}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaxStatusOverview;
