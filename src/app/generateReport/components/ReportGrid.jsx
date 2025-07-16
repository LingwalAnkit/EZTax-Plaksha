import ReportCard from "./ReportCard";

const ReportGrid = ({
  reports,
  onGenerateReport,
  aiReport,
  activeReportId,
}) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      {reports.map((report, index) => (
        <ReportCard
          key={report._id || index}
          report={report}
          onGenerateReport={onGenerateReport}
          aiReport={aiReport}
          activeReportId={activeReportId}
        />
      ))}
    </div>
  );
};

export default ReportGrid;
