import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Define the contact form data type
type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form handler
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body as ContactFormData;
      
      // Basic validation
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      
      // Simple email validation
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email address' });
      }
      
      // In a real application, you would send this data to an email service
      // or store it in a database. For now, we'll just return success.
      
      console.log('Contact form submission:', { name, email, subject, message });
      
      return res.status(200).json({ 
        message: 'Message received successfully',
        data: { name, email, subject } 
      });
    } catch (error) {
      console.error('Error processing contact form:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
