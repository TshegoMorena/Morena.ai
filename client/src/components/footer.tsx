import { Mail, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative z-20 bg-african-brown/80 backdrop-blur-sm border-t border-african-gold/20 mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Connect with us section */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-elegant font-semibold text-african-gold mb-4">Connect with us</h3>
          <div className="flex justify-center items-center space-x-8">
            <a 
              href="mailto:hello@morena.com" 
              className="flex items-center space-x-2 text-african-light-gold hover:text-african-gold transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>hello@morena.com</span>
            </a>
            <a 
              href="https://www.morena.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-african-light-gold hover:text-african-gold transition-colors"
            >
              <Globe className="h-5 w-5" />
              <span>www.morena.com</span>
            </a>
          </div>
        </div>
        
        {/* African Pattern Border */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-african-gold to-transparent mb-4"></div>
        
        <div className="text-center text-african-light-gold/70 text-sm">
          <p>&copy; 2024 Morena AI. Empowering South Africa through inclusive AI technology.</p>
        </div>
      </div>
    </footer>
  );
}
