import React from 'react';

interface SearchContextType {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = React.createContext<SearchContextType | undefined>(undefined);