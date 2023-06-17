import { useContext } from 'react';
import { ThemeContext } from '../../Hooks/ThemeContext';

import Dropdown from '../Dropdown/Dropdown';
import '../../assets/CSS/Header.css';

const Header = () => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error("useContext must be used within a ThemeProvider");
    }

    const { theme, toggleTheme } = themeContext;

    const handleCheckboxChange = () => {
        if (toggleTheme) {
            toggleTheme();
        } else {
            throw new Error("Cannot toggle theme because toggleTheme is not defined.")
        }
    }

  return (
    <section id='application-options' className='options'>
        <div className='options__icon'>
            <svg width="30" height="34" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.25 29.0548C0.25 29.469 0.585786 29.8048 1 29.8048C1.41421 29.8048 1.75 29.469 1.75 29.0548H0.25ZM2.02713 2.02713L1.4968 1.4968L1.4968 1.4968L2.02713 2.02713ZM28.7466 1.30814L28.2163 1.83842L28.2164 1.83853L28.7466 1.30814ZM28.3048 25.0465C28.3048 25.4607 28.6406 25.7965 29.0548 25.7965C29.469 25.7965 29.8048 25.4607 29.8048 25.0465H28.3048ZM4.50685 24.7979C4.09264 24.7979 3.75685 25.1337 3.75685 25.5479C3.75685 25.9622 4.09264 26.2979 4.50685 26.2979V24.7979ZM29.0548 26.2979C29.469 26.2979 29.8048 25.9622 29.8048 25.5479C29.8048 25.1337 29.469 24.7979 29.0548 24.7979V26.2979ZM4.50685 31.8116C4.09264 31.8116 3.75685 32.1474 3.75685 32.5616C3.75685 32.9759 4.09264 33.3116 4.50685 33.3116V31.8116ZM29.0548 33.3116C29.469 33.3116 29.8048 32.9759 29.8048 32.5616C29.8048 32.1474 29.469 31.8116 29.0548 31.8116V33.3116ZM1.75 29.0548V4.50685H0.25V29.0548H1.75ZM1.75 4.50685C1.75 3.77569 2.04045 3.07447 2.55746 2.55746L1.4968 1.4968C0.698492 2.29512 0.25 3.37786 0.25 4.50685H1.75ZM2.55746 2.55746C3.07448 2.04045 3.77566 1.75 4.50685 1.75V0.25C3.37783 0.25 2.29512 0.698494 1.4968 1.4968L2.55746 2.55746ZM4.50685 1.75H28.0027V0.25H4.50685V1.75ZM28.0027 1.75C28.0829 1.75 28.1597 1.78183 28.2163 1.83842L29.277 0.777855C28.9391 0.439857 28.4807 0.25 28.0027 0.25V1.75ZM28.2164 1.83853C28.273 1.89513 28.3048 1.97191 28.3048 2.05205H29.8048C29.8048 1.57415 29.615 1.11575 29.2769 0.777749L28.2164 1.83853ZM28.3048 2.05205V25.0465H29.8048V2.05205H28.3048ZM4.50685 26.2979H29.0548V24.7979H4.50685V26.2979ZM4.50685 33.3116H29.0548V31.8116H4.50685V33.3116Z" fill={ theme === 'dark' ? '#757575' : '#757575'}/>
                <path d="M4.50685 32.5616C3.57675 32.5616 2.6848 32.1921 2.02713 31.5344C1.36947 30.8768 1 29.9848 1 29.0547C1 28.1246 1.36947 27.2326 2.02713 26.575C2.6848 25.9173 3.57675 25.5479 4.50685 25.5479" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.76709 8.01355H20.2876" stroke="#757575" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        </div>
        <div className="options__settings">
            <div className="options__settings__font-selector">

            </div>
            <div className="options__settings__theme-selector">
                <Dropdown />
                <label className='switch'>
                    <input type='checkbox' onChange={handleCheckboxChange} checked={theme === 'dark' ? true : false}/>
                    <span className='slider round'></span>
                </label>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1 10.449C0.998458 12.8283 1.80169 15.1383 3.27914 17.0033C4.75659 18.8683 6.82139 20.1788 9.13799 20.7218C11.4545 21.2647 13.8866 21.0082 16.039 19.994C18.1912 18.9797 19.9373 17.2673 20.9931 15.1352C11.5442 15.1352 6.85799 10.4479 6.85799 1C5.09842 1.87311 3.61767 3.22033 2.58266 4.88981C1.54765 6.5593 0.999502 8.48469 1 10.449Z" stroke={theme === 'dark' ? '#A445ED' : '#757575'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    </section>
  )
}

export default Header