// Email notification utility for missing product alerts
const emailNotification = {
  async sendMissingProductAlert(productQuery, userMessage) {
    try {
      // In a real implementation, this would connect to an email service
      // For demo purposes, we'll just log the alert
      
      const alertData = {
        type: 'missing_product',
        recipient: 'admin@gadgetfinder.com',
        subject: `Missing Product Alert - ${productQuery}`,
        body: `
          A user has requested a product that is not available on our website:
          
          Product Query: ${productQuery}
          User Message: ${userMessage}
          Timestamp: ${new Date().toISOString()}
          
          Please consider adding this product to the website inventory.
        `,
        status: 'logged',
        createdAt: new Date().toISOString()
      };
      
      // Store in local storage for demo purposes
      const alerts = JSON.parse(localStorage.getItem('gadgetfinder_alerts') || '[]');
      alerts.push(alertData);
      localStorage.setItem('gadgetfinder_alerts', JSON.stringify(alerts));
      
      // Log for development purposes
      console.log('Email alert logged:', alertData);
      
      return { success: true, alertId: Date.now() };
    } catch (error) {
      console.error('Error logging email alert:', error);
      return { success: false, error: error.message };
    }
  },

  async getStoredAlerts() {
    try {
      const alerts = JSON.parse(localStorage.getItem('gadgetfinder_alerts') || '[]');
      return { success: true, alerts };
    } catch (error) {
      console.error('Error retrieving alerts:', error);
      return { success: false, error: error.message };
    }
  }
};

window.emailNotification = emailNotification;
