import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Loader2, Paperclip, Sparkles } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import type { Message } from '@shared/schema';

interface ChatInterfaceProps {
  isVisible: boolean;
  selectedLanguage: string;
}

interface ChatResponse {
  conversationId: string;
  userMessage: Message;
  aiMessage: Message;
}

export function ChatInterface({ isVisible, selectedLanguage }: ChatInterfaceProps) {
  const [message, setMessage] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get messages for current conversation
  const { data: messages = [], isLoading } = useQuery<Message[]>({
    queryKey: ['/api/conversations', conversationId, 'messages'],
    enabled: !!conversationId,
  });

  const chatMutation = useMutation({
    mutationFn: async (data: { message: string; conversationId?: string; language: string }) => {
      const response = await apiRequest('POST', '/api/chat', data);
      return response.json() as Promise<ChatResponse>;
    },
    onSuccess: (data) => {
      if (!conversationId) {
        setConversationId(data.conversationId);
      }
      queryClient.invalidateQueries({ 
        queryKey: ['/api/conversations', data.conversationId, 'messages'] 
      });
      setMessage('');
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
    },
  });

  const handleSendMessage = () => {
    if (!message.trim() || chatMutation.isPending) return;

    chatMutation.mutate({
      message: message.trim(),
      conversationId: conversationId || undefined,
      language: selectedLanguage,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when chat becomes visible
  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`max-w-4xl mx-auto px-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      {/* Chat Messages Container */}
      <ScrollArea className="h-96 mb-6" ref={scrollRef}>
        <div className="space-y-4 pr-4">
          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-african-gold" />
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center text-african-light-gold/60 py-12">
              <div className="mb-4">
                <Sparkles className="h-12 w-12 text-african-gold mx-auto mb-3 animate-pulse" />
                <div className="text-xl font-elegant text-african-gold mb-2">Ready to Assist</div>
                <div className="text-african-light-gold/80">Your conversation starts here - ask me anything</div>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  msg.isUser 
                    ? 'gold-gradient text-african-dark ml-auto' 
                    : 'bg-african-brown/80 backdrop-blur-sm border border-african-gold/20 text-african-cream'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))
          )}
          
          {chatMutation.isPending && (
            <div className="flex justify-start mb-4">
              <div className="bg-african-brown/80 backdrop-blur-sm border border-african-gold/20 text-african-cream max-w-xs lg:max-w-md px-4 py-3 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">MORENA is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Luxurious Chat Input */}
      <div className="relative">
        {/* Luxurious backdrop with African patterns */}
        <div className="absolute inset-0 bg-gradient-to-r from-african-brown via-african-dark to-african-brown rounded-3xl opacity-95"></div>
        <div className="absolute inset-0 african-pattern opacity-20 rounded-3xl"></div>
        
        <div className="relative bg-gradient-to-br from-african-brown/90 to-african-dark/90 backdrop-blur-xl border-2 border-african-gold/40 rounded-3xl p-6 shadow-2xl">
          {/* Elegant header with golden accents */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-african-gold rounded-full animate-pulse"></div>
              <span className="text-african-gold font-elegant text-sm tracking-wide">TSHEGO MORENA</span>
            </div>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-african-gold/60 rounded-full"></div>
              <div className="w-2 h-2 bg-african-bronze/60 rounded-full"></div>
              <div className="w-2 h-2 bg-african-copper/60 rounded-full"></div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* File upload button */}
            <Button
              className="bg-gradient-to-r from-african-gold to-african-bronze hover:from-african-bronze hover:to-african-copper text-african-dark p-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl border border-african-gold/30"
              disabled={chatMutation.isPending}
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            
            {/* Luxurious input field */}
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-african-gold/10 to-african-bronze/10 rounded-2xl"></div>
              <Input
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything... I'm here to help with unlimited knowledge"
                className="relative w-full bg-african-dark/50 text-african-cream placeholder-african-light-gold/70 border-2 border-african-gold/30 rounded-2xl px-6 py-4 text-lg font-african focus:border-african-gold focus:shadow-lg focus:shadow-african-gold/20 transition-all duration-300 backdrop-blur-sm"
                disabled={chatMutation.isPending}
              />
              {/* Elegant underline accent */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-african-gold to-african-bronze transition-all duration-300 group-focus-within:w-full"></div>
            </div>
            
            {/* Luxurious send button */}
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || chatMutation.isPending}
              className="bg-gradient-to-r from-african-gold to-african-bronze hover:from-african-bronze hover:to-african-copper text-african-dark p-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 border border-african-gold/30 min-w-[60px]"
            >
              {chatMutation.isPending ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <Send className="h-6 w-6" />
              )}
            </Button>
          </div>
          
          {/* Elegant bottom accent */}
          <div className="mt-4 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-african-gold to-transparent rounded-full opacity-60"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
