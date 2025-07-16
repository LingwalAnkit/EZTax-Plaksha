import axios from "axios";

const API_BASE_URL = "/api/report";

export const taxService = {
  async generateReport(userData) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/generate-report`,
        userData
      );
      return response.data;
    } catch (error) {
      console.error("Error generating report:", error);
      throw error;
    }
  },

  // Add more API methods as needed
  async saveTaxData(userData) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/save-tax-data`,
        userData
      );
      return response.data;
    } catch (error) {
      console.error("Error saving tax data:", error);
      throw error;
    }
  },

  async getTaxHistory(userId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/tax-history/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching tax history:", error);
      throw error;
    }
  },
};
