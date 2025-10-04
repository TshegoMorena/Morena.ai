import { useState } from 'react';
import { Header } from '@/components/header';
import { WelcomeSection } from '@/components/welcome-section';
import { ChatInterface } from '@/components/chat-interface';
import { Footer } from '@/components/footer';

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isChatting, setIsChatting] = useState(false);

  const handleStartChat = () => {
    setIsChatting(true);
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* South African Traditional Luxury Background Patterns */}
      <div className="fixed inset-0 african-pattern-rich opacity-20 pointer-events-none z-0"></div>
      <div className="fixed inset-0 african-pattern opacity-15 pointer-events-none z-0"></div>
      
      {/* Subtle geometric patterns inspired by traditional African art */}
      <div 
        className={`fixed inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 z-0 ${
          isChatting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
        }`}
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(20, 20, 20, 0.95), rgba(35, 25, 18, 0.9), rgba(20, 20, 20, 0.95)), url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&h=1080')`
        }}
      />
      
      {/* Luxury golden overlay with South African warmth */}
      <div className={`fixed inset-0 bg-gradient-to-br from-african-gold/8 via-transparent to-african-bronze/6 transition-opacity duration-1000 z-0 ${
        isChatting ? 'opacity-0' : 'opacity-100'
      }`} />

      <Header 
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
      />

      <main className="flex-1 relative z-10">
        {!isChatting && (
          <WelcomeSection onStartChat={handleStartChat} />
        )}
        
        <ChatInterface 
          isVisible={isChatting}
          selectedLanguage={selectedLanguage}
        />
      </main>

      <Footer />
    </div>
  );
}
