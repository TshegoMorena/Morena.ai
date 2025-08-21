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
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-african-dark">
      {/* African Pattern Overlay */}
      <div className="fixed inset-0 african-pattern opacity-20 pointer-events-none"></div>
      
      {/* Cultural Background */}
      <div 
        className={`fixed inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
          isChatting ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundImage: `linear-gradient(rgba(26, 26, 26, 0.7), rgba(45, 24, 16, 0.8)), url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&h=1080')`
        }}
      />

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
