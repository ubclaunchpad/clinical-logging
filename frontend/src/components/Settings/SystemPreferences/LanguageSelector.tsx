import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import "./LanguageSelector.css";

interface Language {
  name: string;
  code: string;
}

interface LanguageSelectorProps {
  selectedLanguage?: Language;
  languages?: Language[];
  onChange?: (language: Language) => void;
}

const defaultLanguages: Language[] = [
  { name: "English (Canada)", code: "en-CA" },
  { name: "English (US)", code: "en-US" },
  { name: "French (Canada)", code: "fr-CA" },
  { name: "Spanish", code: "es" },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage = defaultLanguages[0],
  languages = defaultLanguages,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (language: Language) => {
    onChange?.(language);
    setIsOpen(false);
  };

  return (
    <div className="language-selector">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="language-selector__button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedLanguage.name}</span>
        <ChevronDownIcon className="language-selector__icon"/>
      </button>

      {isOpen && (
        <ul className="language-selector__dropdown" role="listbox">
          {languages.map((language) => (
            <li
              key={language.code}
              role="option"
              aria-selected={language.code === selectedLanguage.code}
              className={`language-selector__option ${
                language.code === selectedLanguage.code
                  ? "language-selector__option--selected"
                  : ""
              }`}
              onClick={() => handleSelect(language)}
            >
              {language.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
