'use client'
import React from 'react'
import { useRouter } from "next/navigation";

const warbandBuilder = () => {
    const router = useRouter();

    const goToCreateWizard = () => {
        router.push("/WizardCreator");
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center ">
            <div className="border-2 border-black p-4 flex flex-col gap-5 text-xl font-bold">
                <h1 className="text-xl text-center">Create Warband </h1>
                <button onClick={goToCreateWizard} className="bg-black text-white rounded-2xl p-1.5 hover:cursor-pointer">Create Wizard/Apprentice</button>
                <button className="bg-black text-white rounded-2xl p-1.5 hover:cursor-pointer">Recruit Soldiers</button>
                <button className="bg-black text-white rounded-2xl p-1.5 hover:cursor-pointer">View Warband</button>

            </div>
        </main>
    )
}

export default warbandBuilder
