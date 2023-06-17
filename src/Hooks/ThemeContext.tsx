import { createContext, Context } from "react";

interface ThemeContextType {
    theme: string;
    toggleTheme?: () => void;  
}

export const ThemeContext: Context<ThemeContextType | null> = createContext<ThemeContextType | null>(null);