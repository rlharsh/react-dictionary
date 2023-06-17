import { createContext, Context } from "react";

interface FontContextType {
    font: string;
    description: string;
    setFont?: (name: string, description: string) => void;
};

export const FontContext: Context<FontContextType | null> = createContext<FontContextType | null>(null);