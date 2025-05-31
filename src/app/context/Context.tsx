// MyContext.tsx
"use client"
import React, { createContext, useState, ReactNode, useEffect } from 'react';
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

    useEffect(() => {
        const currentWarband = localStorage.getItem('warband')

        if (!currentWarband) return;

        try {
            const parsed = JSON.parse(currentWarband) as Member[];
            setFullWarband(parsed)
        } catch (e) {
            console.error("Failed to parse warband")
        }
    }, [])


    return (
        <MyContext.Provider value={{ state, setState, fullWarband, setFullWarband }
        }>
            {children}
        </MyContext.Provider>
    );
};
