// MyContext.tsx
"use client"
import React, { createContext, useState, ReactNode } from 'react';
import { Member } from '../models/models';
// Define the type for the context state
type MyContextType = {
    state: string | null;
    setState: (state: string | null) => void;
    fullWarband: Member[];
    setFullWarband: React.Dispatch<React.SetStateAction<Member[]>>;
};

// Create the context with a default value
export const MyContext = createContext<MyContextType | undefined>(undefined);

// Define the props for the provider component
type MyProviderProps = {
    children: ReactNode;
};

export const MyProvider = ({ children }: MyProviderProps) => {
    const [state, setState] = useState<string | null>(null);

    const [fullWarband, setFullWarband] = useState<Member[]>([]);


    return (
        <MyContext.Provider value={{ state, setState, fullWarband, setFullWarband }
        }>
            {children}
        </MyContext.Provider>
    );
};
