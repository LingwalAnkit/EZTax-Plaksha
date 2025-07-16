import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { reportService } from "../service/reportService";

export const useReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiReport, setAIReport] = useState(null);
  const [activeReportId, setActiveReportId] = useState(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await reportService.fetchReports();
      setReports(data);
    } catch (error) {
      toast.error("Failed to load report data.");
    } finally {
      setLoading(false);
    }
  };

  const generateAIReport = async (report) => {
    try {
      setActiveReportId(report._id);
      setAIReport(null);

      const toastId = toast.loading("Generating AI report...");
      const result = await reportService.generateAIReport(report.extracted);

      toast.dismiss(toastId);

      if (result) {
        setAIReport(result);
        toast.success("AI report generated successfully!");
      }
    } catch (error) {
      toast.error("Error generating report.");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return {
    reports,
    loading,
    aiReport,
    activeReportId,
    fetchReports,
    generateAIReport,
    setActiveReportId,
    setAIReport,
  };
};
