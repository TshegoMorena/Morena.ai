import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { languages } from '@/lib/languages';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  const selectedLang = languages.find(lang => lang.code === selectedLanguage);

  return (
    <Select value={selectedLanguage} onValueChange={onLanguageChange}>
      <SelectTrigger className="w-40 bg-african-brown border-african-gold/30 text-african-cream focus:border-african-gold">
        <SelectValue placeholder="Select language">
          {selectedLang?.name || 'English'}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-african-brown border-african-gold/30">
        {languages.map((language) => (
          <SelectItem 
            key={language.code} 
            value={language.code}
            className="text-african-cream hover:bg-african-gold/20 focus:bg-african-gold/20"
          >
            {language.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
