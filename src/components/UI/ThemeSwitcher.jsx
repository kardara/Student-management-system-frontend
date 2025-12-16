import { useContext, useState, useRef, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { ThemeContext } from "../../contexts/ThemeContext";
import { Sun, Moon, ChevronDown } from 'lucide-react';

export default function AppSwitcher({ forAuth }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef(null);

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  // { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  // { code: 'sw', name: 'Swahili', flag: '🇰🇪' },       // Kenya as a representative flag
  { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼' },   // Rwanda
  // { code: 'ln', name: 'Lingala', flag: '🇨🇩' }        // DR Congo
];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    setIsLangOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (forAuth) {
    return (
      <div className='relative'>
        <div className='absolute top-10 right-10 flex gap-2'>
          {/* Language Switcher */}
          <div className="relative" ref={dropdownRef}>
            <button
              aria-label="Change Language"
              className="p-2 rounded-full bg-light-bgSecondary dark:bg-dark-bgSecondary hover:bg-light-border dark:hover:bg-dark-border transition-colors flex items-center gap-2 min-w-16"
              onClick={() => setIsLangOpen(!isLangOpen)}
            >
              <span className="text-lg">{currentLanguage.flag}</span>
              <ChevronDown size={16} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isLangOpen && (
              <div className="absolute top-full right-0 mt-2 bg-light-bgSecondary dark:bg-dark-bgSecondary border border-light-border dark:border-dark-border rounded-lg shadow-lg z-50 min-w-40 overflow-hidden">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full px-3 py-2 text-left hover:bg-light-border dark:hover:bg-dark-border transition-colors flex items-center gap-3 ${
                      i18n.language === lang.code ? 'bg-light-border dark:bg-dark-border' : ''
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-sm font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Switcher */}
          <button
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-full bg-light-bgSecondary dark:bg-dark-bgSecondary hover:bg-light-border dark:hover:bg-dark-border transition-colors"
            onClick={toggleTheme}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      {/* Language Switcher */}
      <div className="relative" ref={dropdownRef}>
        <button
          aria-label="Change Language"
          className="p-2 rounded-full bg-light-bgSecondary dark:bg-dark-bgSecondary hover:bg-light-border dark:hover:bg-dark-border transition-colors flex items-center gap-2 min-w-16"
          onClick={() => setIsLangOpen(!isLangOpen)}
        >
          <span className="text-lg">{currentLanguage.flag}</span>
          <ChevronDown size={16} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isLangOpen && (
          <div className="absolute top-full right-0 mt-2 bg-light-bgSecondary dark:bg-dark-bgSecondary border border-light-border dark:border-dark-border rounded-lg shadow-lg z-50 min-w-40 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full px-3 py-2 text-left hover:bg-light-border dark:hover:bg-dark-border transition-colors flex items-center gap-3 ${
                  i18n.language === lang.code ? 'bg-light-border dark:bg-dark-border' : ''
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Theme Switcher */}
      <button
        aria-label="Toggle Dark Mode"
        className="p-2 rounded-full bg-light-bgSecondary dark:bg-dark-bgSecondary hover:bg-light-border dark:hover:bg-dark-border transition-colors"
        onClick={toggleTheme}
      >
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </div>
  );
}