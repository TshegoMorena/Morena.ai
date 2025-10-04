import { LanguageSelector } from './language-selector';

interface HeaderProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export function Header({ selectedLanguage, onLanguageChange }: HeaderProps) {
  return (
    <header className="relative z-20 border-b border-african-gold/20 bg-african-brown/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Branding */}
          <div className="flex items-center space-x-4">
            <img 
              src="/@assets/fc1907eb-9b00-42b9-a520-a9cb050ed336_1759571011552.jpg" 
              alt="Tshego Morena Logo" 
              className="w-12 h-12 object-contain rounded-lg"
            />
            <div>
              <h1 className="text-2xl font-elegant font-bold text-african-gold">MORENA</h1>
              <p className="text-sm text-african-light-gold/80">African AI Assistant</p>
            </div>
          </div>
          
          {/* Language Selector */}
          <LanguageSelector 
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
          />
        </div>
      </div>
    </header>
  );
}
