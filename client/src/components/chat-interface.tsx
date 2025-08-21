import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Loader2 } from 'lucide-react';
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
            <div className="text-center text-african-light-gold/60 py-8">
              Start a conversation by typing a message below
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

      {/* Chat Input */}
      <div className="bg-african-brown/80 backdrop-blur-sm border border-african-gold/30 rounded-2xl p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="w-full bg-transparent text-african-cream placeholder-african-light-gold/60 border-none outline-none text-lg"
              disabled={chatMutation.isPending}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim() || chatMutation.isPending}
            className="bg-african-gold hover:bg-african-bronze text-african-dark p-3 rounded-full transition-colors duration-200 disabled:opacity-50"
          >
            {chatMutation.isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
