import { Button } from '@/components/ui/button';
import { GreetingCarousel } from './greeting-carousel';
import { MessageCircle } from 'lucide-react';

interface WelcomeSectionProps {
  onStartChat: () => void;
}

export function WelcomeSection({ onStartChat }: WelcomeSectionProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center transition-opacity duration-1000">
      {/* Greeting Carousel */}
      <div className="mb-8">
        <GreetingCarousel />
        <p className="text-lg text-african-light-gold/90">
          Ask me anything in your language
        </p>
      </div>

      {/* African Pattern Decorative Border */}
      <div className="w-32 h-1 bg-gradient-to-r from-transparent via-african-gold to-transparent mx-auto mb-8"></div>
      
      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-african-brown/60 backdrop-blur-sm border border-african-gold/20 rounded-xl p-6 text-center">
          <img 
            src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300" 
            alt="Diverse South African cultures" 
            className="rounded-lg w-full h-32 object-cover mb-4"
          />
          <h3 className="text-xl font-semibold text-african-gold mb-2">11 Languages</h3>
          <p className="text-african-light-gold/80 text-sm">Communicate in all South African official languages</p>
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

      {/* Start Chat Button */}
      <Button 
        onClick={onStartChat}
        className="gold-gradient hover:bronze-gradient px-8 py-3 text-african-dark font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <MessageCircle className="mr-2 h-5 w-5" />
        Start Conversation
      </Button>
    </div>
  );
}
