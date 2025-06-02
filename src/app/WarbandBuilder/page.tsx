'use client'
import React, { useContext, useEffect } from 'react'
import { useRouter } from "next/navigation";

import { MyContext } from '../context/Context';
import { Member } from '../models/models';

const warbandBuilder = () => {

    const context = useContext(MyContext);

    if (!context) {
        console.error("Context Error");
        return;
    }

    const { fullWarband } = context;

    const router = useRouter();

    const goToCreateWizard = () => {
        router.push("/WizardCreator");
    }

    const goToCreateApprentice = () => {

        const hasWizards = fullWarband.some((m: Member) => m.role === "Wizard")

        if (!hasWizards) {
            alert("You need a wizard to create an apprentice")
            return;
        } else {
            router.push("/ApprenticeCreator");
        }


    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center ">
            <div className="border-2 border-black p-4 flex flex-col gap-5 text-xl font-bold">
                <h1 className="text-xl text-center">Create Warband </h1>
                <button onClick={goToCreateWizard} className="bg-black text-white rounded-2xl p-1.5 hover:cursor-pointer">Create Wizard</button>
                <button onClick={goToCreateApprentice} className="bg-black text-white rounded-2xl p-1.5 hover:cursor-pointer">Create Apprentice</button>
                <button className="bg-black text-white rounded-2xl p-1.5 hover:cursor-pointer">Recruit Soldiers</button>


            </div>
        </main>
    )
}

export default warbandBuilder
