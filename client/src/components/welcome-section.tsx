import { Button } from '@/components/ui/button';
import { GreetingCarousel } from './greeting-carousel';
import { MessageCircle, Sparkles, Crown } from 'lucide-react';

interface WelcomeSectionProps {
  onStartChat: () => void;
}

export function WelcomeSection({ onStartChat }: WelcomeSectionProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-center transition-opacity duration-1000">
      {/* Luxurious Header with Crown */}
      <div className="mb-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-african-gold/20 to-transparent rounded-3xl blur-xl"></div>
        <div className="relative bg-african-brown/30 backdrop-blur-xl border-2 border-african-gold/40 rounded-3xl p-8 shadow-2xl">
          <Crown className="h-12 w-12 text-african-gold mx-auto mb-4 animate-pulse" />
          <GreetingCarousel />
          <div className="mt-4 flex items-center justify-center space-x-2">
            <Sparkles className="h-5 w-5 text-african-bronze animate-pulse" />
            <p className="text-xl text-african-light-gold/90 font-elegant">
              Ask me anything in your language
            </p>
            <Sparkles className="h-5 w-5 text-african-bronze animate-pulse" />
          </div>
        </div>
      </div>

      {/* Luxurious African Pattern Decorative Border */}
      <div className="relative mb-12">
        <div className="w-48 h-2 bg-gradient-to-r from-transparent via-african-gold to-transparent mx-auto rounded-full"></div>
        <div className="absolute inset-0 w-48 h-2 bg-gradient-to-r from-african-bronze/50 via-transparent to-african-bronze/50 mx-auto rounded-full blur-sm"></div>
      </div>
      
      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-african-brown/60 backdrop-blur-sm border border-african-gold/20 rounded-xl p-6 text-center">
          <img 
            src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300" 
            alt="Diverse South African cultures" 
            className="rounded-lg w-full h-32 object-cover mb-4"
          />
          <h3 className="text-xl font-semibold text-african-gold mb-2">11 Languages</h3>
          <p className="text-african-light-gold/90">Communicate in all South African official languages with cultural nuance</p>
        </div>
        
        <div className="bg-african-brown/60 backdrop-blur-sm border border-african-gold/20 rounded-xl p-6 text-center">
          <img 
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300" 
            alt="African traditional patterns" 
            className="rounded-lg w-full h-32 object-cover mb-4"
          />
          <h3 className="text-xl font-semibold text-african-gold mb-2">Cultural AI</h3>
          <p className="text-african-light-gold/80 text-sm">AI trained with understanding of African context</p>
        </div>
        
        <div className="bg-african-brown/60 backdrop-blur-sm border border-african-gold/20 rounded-xl p-6 text-center">
          <img 
            src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300" 
            alt="South African landscapes" 
            className="rounded-lg w-full h-32 object-cover mb-4"
          />
          <h3 className="text-xl font-semibold text-african-gold mb-2">Universal Knowledge</h3>
          <p className="text-african-light-gold/80 text-sm">Ask about anything - global knowledge, local wisdom</p>
        </div>
      </div>

      {/* Luxurious Start Chat Button */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-african-gold to-african-bronze rounded-3xl blur-lg opacity-60 animate-pulse"></div>
        <Button 
          onClick={onStartChat}
          className="relative premium-gold-gradient hover:african-shimmer px-12 py-6 text-african-dark font-elegant font-bold text-xl transition-all duration-500 shadow-2xl hover:shadow-african-gold/40 border-2 border-african-gold/50 rounded-3xl hover:scale-105"
        >
          <MessageCircle className="mr-3 h-7 w-7" />
          Begin Luxury Conversation
          <Sparkles className="ml-3 h-6 w-6 animate-pulse" />
        </Button>
      </div>
    </div>
  );
}
