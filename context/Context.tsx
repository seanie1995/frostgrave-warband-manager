// MyContext.tsx
"use client"
import React, { createContext, useState, ReactNode } from 'react';

// Define the type for the context state
type MyContextType = {
    state: string | null;
    setState: (state: string | null) => void;
};

// Create the context with a default value
export const MyContext = createContext<MyContextType | undefined>(undefined);

// Define the props for the provider component
type MyProviderProps = {
    children: ReactNode;
};

export const MyProvider = ({ children }: MyProviderProps) => {
    const [state, setState] = useState<string | null>(null);

    return (
        <MyContext.Provider value={{ state, setState }
        }>
            {children}
        </MyContext.Provider>
    );
};
