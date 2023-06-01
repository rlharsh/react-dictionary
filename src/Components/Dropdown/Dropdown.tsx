import { useContext, useState, useMemo, useCallback } from 'react';
import '../../assets/CSS/Dropdown.css';

import { FontContext } from '../../Hooks/FontContext';
import { ThemeContext } from '../../Hooks/ThemeContext';

const Dropdown = () => {
    
    const [visible, setVisible] = useState(false);
    const fontContext = useContext(FontContext);
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error("useContext must be used within a ThemeProvider");
    }

    if (!fontContext) {
        throw new Error("useContext must be used within a FontProvider");
    }

    const { theme } = themeContext;
    const { font, description, setFont } = fontContext;
    
    const getThemeClass = useMemo(() => theme === 'dark' ? 'dark' : 'light', [theme]);
    const getThemeClassButton = useMemo(() => theme === 'dark' ? 'dropdown-menu__button__dark' : 'dropdown-menu__button__light', [theme]);

    const handleButtonClick = useCallback((key: string, description: string) => {
        setFont?.(key, description);
    }, []);

    const fonts = [
        {key: 'sans-serif', desc: 'Sans Serif'},
        {key: 'serif', desc: 'Serif'},
        {key: 'mono', desc: 'Mono'}
    ];

    // Renders the drop down div, that is visible
    // whenever visible is set to true.
    const renderDropDown = () => {
        if (!visible) {
            return null;
        }

        return (
            <div className={`dropdown-menu ${getThemeClass}`}>
                {fonts.map(({key, desc}) => (
                    <button 
                        key={key}
                        onClick={() => handleButtonClick(key, desc)} 
                        className={`${key} dropdown-menu__button ${getThemeClassButton}`}
                        aria-label={`Change display font to ${desc}.`}>
                        {desc}
                    </button>
                ))}
            </div>
        );
    }

    // Handles the click of the dropdown menu.
    const handleDropDownClick = useCallback(() => {
        setVisible(val => !val);
    }, []);

    return (
        <div className='dropdown' onClick={handleDropDownClick}>
            <p className={font}>
                { description }
            </p>
            <svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7L13 1" stroke="#A445ED" strokeWidth="1.5"/>
            </svg>
            {
                renderDropDown()
            } 
        </div>
    );
}

export default Dropdown