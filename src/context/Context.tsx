"use client"
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Member, Wizard } from '@/models/models';
// Define the type for the context state
type MyContextType = {
    state: string | null;
    setState: (state: string | null) => void;
    fullWarband: Member[];
    setFullWarband: React.Dispatch<React.SetStateAction<Member[]>>;
    wizardGold: number,
    setWizardGold: React.Dispatch<React.SetStateAction<number>>;
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
    const [wizardGold, setWizardGold] = useState<number>(0);

    useEffect(() => {
        const currentWarband = localStorage.getItem('warband')

        if (!currentWarband) return;

        try {
            const parsed = JSON.parse(currentWarband) as Member[];

            const wizard = parsed.find((e): e is Wizard & { role: "Wizard" } => e.role === "Wizard");

            if (!wizard) {
                return
            }

            setFullWarband(parsed)

            setWizardGold(wizard?.gold);
        } catch (e) {
            console.error("Failed to parse warband")
        }
    }, [])

    useEffect(() => {
        const wizard = fullWarband.find(m => m.role === "Wizard") as Wizard;

        if (wizard) {
            setWizardGold(wizard.gold);
        } else {
            setWizardGold(0);
        }
    }, [fullWarband])

    return (
        <MyContext.Provider value={{ state, setState, fullWarband, setFullWarband, wizardGold, setWizardGold }
        }>
            {children}
        </MyContext.Provider>
    );
};
