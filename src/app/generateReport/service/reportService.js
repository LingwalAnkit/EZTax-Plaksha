import axios from "axios";

const API_BASE_URL = "/api/report";

export const reportService = {
  async fetchReports() {
    try {
      const response = await axios.get(`${API_BASE_URL}/extractedData`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching reports:", error);
      throw error;
    }
  },

  async generateAIReport(data) {
    try {
      const response = await axios.post(`${API_BASE_URL}/aiReport`, data);
      return response.data;
    } catch (error) {
      console.error("Failed to generate report:", error);
      throw error;
    }
  },

  async deleteReport(reportId) {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/reports/${reportId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting report:", error);
      throw error;
    }
  },

  async updateReport(reportId, data) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/reports/${reportId}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating report:", error);
      throw error;
    }
  },
};
