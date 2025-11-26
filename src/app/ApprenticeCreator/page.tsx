'use client'
import React, { useState, useEffect, FormEvent, useContext } from 'react';
import { MyContext } from '@/context/Context';
import { Wizard, Apprentice, MemberOrMembers } from "@/models/models";
import { useRouter } from "next/navigation";

const ApprenticeCreator = () => {
    const context = useContext(MyContext);
    const router = useRouter();

    if (!context) {
        throw new Error("MyContext must be used within a MyProvider");
    }

    const { fullWarband, setFullWarband } = context;

    const [wizard, setWizard] = useState<Wizard | null>(null);
    const [name, setName] = useState<string>("");

    useEffect(() => {
        const currentWizard = fullWarband.find((e): e is Wizard => e.role === "Wizard");
        if (currentWizard) {
            setWizard(currentWizard);
        } else {
            setWizard(null);
        }
    }, [fullWarband]);


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitting apprentice with name:", name);

        if (wizard?.role !== "Wizard") {
            console.warn("No wizard found to copy stats from");
            return;
        }

        const newApprentice: Apprentice = {
            name,
            role: "Apprentice",
            school: wizard.school,
            spells: wizard.spells,
            move: wizard.move,
            fight: wizard.fight,
            shoot: wizard.shoot,
            armour: wizard.armour,
            will: wizard.will,
            health: wizard.health,
            items: "",
            notes: "",
        };

        const updatedWarband = fullWarband.concat(newApprentice);

        localStorage.setItem('warband', JSON.stringify(updatedWarband))

        setFullWarband(updatedWarband);

        router.push("/");
    };


    return (
        <main className="xl:flex mt-6">
            <form
                className="bg-white p-6 rounded-xl w-full max-w-md space-y-4"
                onSubmit={handleSubmit}
            >
                <h1 className="text-2xl font-bold ">Create Your Apprentice</h1>

                <input
                    type="text"
                    name="apprenticeName"
                    placeholder="Apprentice Name"
                    className="w-full border rounded px-3 py-2 max-w-xs  block"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                >
                    Save Apprentice
                </button>

                <button
                    type="button"
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-gray-800"
                    onClick={() => {
                        console.log("Cancelled");
                        router.back(); // or whatever cancel action
                    }}
                >
                    Cancel
                </button>
            </form>
        </main>
    );
};

export default ApprenticeCreator;
