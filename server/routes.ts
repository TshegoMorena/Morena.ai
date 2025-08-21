import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateAIResponse } from "./services/openai";
import { insertConversationSchema, insertMessageSchema } from "@shared/schema";
import { z } from "zod";

const chatRequestSchema = z.object({
  message: z.string().min(1),
  conversationId: z.string().optional(),
  language: z.string().default("en"),
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all conversations
  app.get("/api/conversations", async (req, res) => {
    try {
      const conversations = await storage.getConversations();
      res.json(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  // Create new conversation
  app.post("/api/conversations", async (req, res) => {
    try {
      const validatedData = insertConversationSchema.parse(req.body);
      const conversation = await storage.createConversation(validatedData);
      res.json(conversation);
    } catch (error) {
      console.error("Error creating conversation:", error);
      res.status(400).json({ error: "Invalid conversation data" });
    }
  });

  // Get conversation messages
  app.get("/api/conversations/:id/messages", async (req, res) => {
    try {
      const { id } = req.params;
      const conversation = await storage.getConversation(id);
      
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      const messages = await storage.getMessagesByConversationId(id);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // Send chat message
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, conversationId, language } = chatRequestSchema.parse(req.body);
      
      let activeConversationId = conversationId;
      
      // Create new conversation if none provided
      if (!activeConversationId) {
        const newConversation = await storage.createConversation({
          title: message.substring(0, 50) + (message.length > 50 ? "..." : ""),
          language: language || "en"
        });
        activeConversationId = newConversation.id;
      }

      // Save user message
      const userMessage = await storage.createMessage({
        conversationId: activeConversationId,
        content: message,
        isUser: true,
        language: language || "en"
      });

      // Get conversation history for context
      const conversationHistory = await storage.getMessagesByConversationId(activeConversationId);
      const historyForAI = conversationHistory
        .filter(msg => msg.id !== userMessage.id) // Exclude the just-added message
        .map(msg => ({ content: msg.content, isUser: msg.isUser }));

      // Generate AI response
      const aiResponse = await generateAIResponse(message, language, historyForAI);
      
      // Save AI response
      const aiMessage = await storage.createMessage({
        conversationId: activeConversationId,
        content: aiResponse.content,
        isUser: false,
        language: language || "en"
      });

      res.json({
        conversationId: activeConversationId,
        userMessage,
        aiMessage
      });
    } catch (error) {
      console.error("Error in chat:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to process chat message" });
    }
  });

  // Delete conversation
  app.delete("/api/conversations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteConversation(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting conversation:", error);
      res.status(500).json({ error: "Failed to delete conversation" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
