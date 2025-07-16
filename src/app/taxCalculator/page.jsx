"use client";
import { useState } from "react";
import { toast } from "sonner";
import SidebarComponent from "../../components/layout/Sidebar";
import TaxInputForm from "./components/TaxInputForm";
import TaxReportDisplay from "./components/TaxReportDisplay";
import { taxService } from "./service/taxService";

const TaxDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [userData, setUserData] = useState({
    income_details: {
      salary_income: 1200000,
      rental_income: 240000,
      interest_income: 50000,
      other_income: 25000,
    },
    deductions: {
      section_80C: 150000,
      section_80D: 25000,
      section_24B: 200000,
      nps_contribution: 50000,
    },
    exemptions: {
      hra_exemption: 100000,
      lta_exemption: 20000,
      other_exemptions: 15000,
    },
    tax_paid: {
      tds: 120000,
      advance_tax: 30000,
      self_assessment_tax: 0,
    },
  });

  const handleInputChange = (category, field, value) => {
    setUserData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: Number(value),
      },
    }));
  };

  const generateReport = async () => {
    setLoading(true);
    try {
      const reportData = await taxService.generateReport(userData);
      setReport(reportData);
      toast.success("Tax report generated successfully");
    } catch (error) {
      toast.error("Failed to generate tax report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarComponent />
      <div className="flex-1 p-8">
        <h1 className="text-5xl font-bold mb-6 items-center justify-center flex text-blue-500">
          Indian Tax Calculator & Advisor
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TaxInputForm
            userData={userData}
            onInputChange={handleInputChange}
            onGenerateReport={generateReport}
            loading={loading}
          />

          <TaxReportDisplay report={report} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default TaxDashboard;
