const DashboardCard = ({
  title,
  value,
  icon,
  description,
  onClick,
  className = "",
}) => {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {icon && <div className="mr-3 text-blue-500">{icon}</div>}
          <h3 className="text-lg font-semibold text-blue-500">{title}</h3>
        </div>
      </div>
      <div className="mb-2">
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      {description && <p className="text-sm text-gray-600">{description}</p>}
    </div>
  );
};

export default DashboardCard;
