import { useEffect, useState } from 'react';
import { ThemeContext } from './Hooks/ThemeContext';
import { FontContext } from './Hooks/FontContext';
import { SearchContext } from './Hooks/SearchContext';

/* Import the Application CSS */
import './assets/CSS/App.css';
import Header from './Components/Header/Header';
import Search from './Components/Search/Search';
import Results from './Components/Results/Results';

function App() {

  const [theme, setTheme] = useState('light');
  const [fontStyle, setFontStyle] = useState<string>('sans-serif');
  const [fontDescription, setFontDescription] = useState<string>('Sans Serif');
  const [searchQuery, setSearchQuery] = useState('keyboard');
  
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  const setFont = (name: string, description: string) => {
    setFontStyle(name);
    setFontDescription(description);
  };

  const setFontInformation = (description: string) => {
    setFontDescription(description);
  }

  const fontValue = { font: fontStyle, setFont, description: fontDescription, setFontInformation };

  useEffect(() => {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <FontContext.Provider value={fontValue}>
          <div className={`application-container sans-serif ${theme === 'dark' ? 'dark' : 'light'}`}>
            <div className="app-wrapper">
            <Header />
            <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
              <Search />
              <Results />
            </SearchContext.Provider>
            </div>
          </div>
        </FontContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App