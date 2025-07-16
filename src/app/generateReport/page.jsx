"use client";

import React from "react";
import SidebarComponent from "../../components/layout/Sidebar";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import EmptyState from "./components/EmptyState";
import ReportHeader from "./components/ReportHeader";
import ReportGrid from "./components/ReportGrid";
import { useReports } from "./hooks/useReports";

const ReportList = () => {
  const { reports, loading, aiReport, activeReportId, generateAIReport } =
    useReports();

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner message="Loading reports..." />;
    }

    if (reports.length === 0) {
      return (
        <EmptyState message="No reports found. Upload some documents to get started." />
      );
    }

    return (
      <>
        <ReportHeader reportCount={reports.length} />
        <ReportGrid
          reports={reports}
          onGenerateReport={generateAIReport}
          aiReport={aiReport}
          activeReportId={activeReportId}
        />
      </>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarComponent />
      <div className="flex-1 p-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="min-w-4xl mx-auto mt-2">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ReportList;
