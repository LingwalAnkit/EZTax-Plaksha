"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SidebarComponent from "../../components/layout/Sidebar";
import DashboardCard from "./components/DashboardCard";
import QuickActions from "./components/QuickActions";
import RecentActivity from "./components/RecentActivity";
import TaxStatusOverview from "./components/TaxStatusOverview";

const Dashboard = () => {
  const router = useRouter();

  // Mock data - replace with actual API calls later
  const dashboardData = {
    totalReports: 12,
    documentsUploaded: 8,
    taxSaved: 45000,
    filingStatus: "Ready",
    taxSummary: {
      totalIncome: 1500000,
      totalTax: 180000,
      refundDue: 15000,
      filingStatus: "Pending",
    },
    recentActivity: [
      {
        id: 1,
        type: "calculation",
        description: "Tax calculation completed",
        timestamp: "2 hours ago",
        icon: (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      },
      {
        id: 2,
        type: "upload",
        description: "Form 16 uploaded successfully",
        timestamp: "1 day ago",
        icon: (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        ),
      },
      {
        id: 3,
        type: "report",
        description: "AI tax report generated",
        timestamp: "2 days ago",
        icon: (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        ),
      },
    ],
  };

  const stats = [
    {
      title: "Total Reports",
      value: dashboardData.totalReports,
      description: "Generated this year",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      onClick: () => router.push("/reports"),
    },
    {
      title: "Documents Uploaded",
      value: dashboardData.documentsUploaded,
      description: "This month",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
      ),
      onClick: () => router.push("/upload"),
    },
    {
      title: "Tax Saved",
      value: `₹${dashboardData.taxSaved.toLocaleString()}`,
      description: "Through optimizations",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
          />
        </svg>
      ),
    },
    {
      title: "Filing Status",
      value: dashboardData.filingStatus,
      description: "Your tax return is ready to file",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      onClick: () => router.push("/file-return"),
    },
  ];

  const handleRefreshData = () => {
    // For now, just show a toast or message
    console.log("Refreshing data...");
    // You can add a toast notification here if needed
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarComponent />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-6xl font-bold text-blue-500">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back! Here's your tax overview.
              </p>
            </div>
            <button
              onClick={handleRefreshData}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Refresh Data
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <DashboardCard
              key={index}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              icon={stat.icon}
              onClick={stat.onClick}
            />
          ))}
        </div>

        {/* Tax Status Overview */}
        <div className="mb-8">
          <TaxStatusOverview taxData={dashboardData.taxSummary} />
        </div>

        {/* Quick Actions and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <QuickActions />
          <RecentActivity activities={dashboardData.recentActivity} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
