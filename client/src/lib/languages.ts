export interface Language {
  code: string;
  name: string;
  greeting: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', greeting: 'Hello' },
  { code: 'zu', name: 'isiZulu', greeting: 'Sawubona' },
  { code: 'xh', name: 'isiXhosa', greeting: 'Molo' },
  { code: 'af', name: 'Afrikaans', greeting: 'Hallo' },
  { code: 'nso', name: 'Sepedi', greeting: 'Thobela' },
  { code: 'tn', name: 'Setswana', greeting: 'Dumela' },
  { code: 'st', name: 'Sesotho', greeting: 'Lumela' },
  { code: 'ts', name: 'Xitsonga', greeting: 'Avuxeni' },
  { code: 'ss', name: 'siSwati', greeting: 'Sawubona' },
  { code: 've', name: 'Tshivenda', greeting: 'Ndaa' },
  { code: 'nr', name: 'isiNdebele', greeting: 'Lotjhani' },
];

export const getLanguageByCode = (code: string): Language | undefined => {
  return languages.find(lang => lang.code === code);
};

export const getGreetings = (): string[] => {
  return languages.map(lang => lang.greeting);
};
