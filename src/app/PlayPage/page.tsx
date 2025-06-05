'use client'

import React, { ChangeEvent, FormEvent, useContext, useEffect } from 'react'
import Gamecodex from "../assets/Codex.json";
import { useState } from 'react';
import { Member, MemberProp, Soldier, Wizard } from "../models/models"
import { MyContext } from '../context/Context';
import { error } from 'console';
import PlayModeCard from '../components/playModeCard'
import { useRouter } from 'next/navigation';

const PlayPage = () => {
    const router = useRouter();
    const context = useContext(MyContext)

    if (!context) {
        throw new Error("MyContext must be used within a MyProvider");
    }

    const { fullWarband } = context
    const goToCreatePage = () => {
        router.push('/WarbandBuilder')
    }

    const [forceOrgMessage, setForceOrgMessage] = useState<string>("");
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [isModCardVisible, setModCardIsVisible] = useState<boolean>(false);

    const handleCardClick = (member: Member) => {
        setSelectedMember(member);
        setModCardIsVisible(true);
    }

    const closeModal = () => {
        setModCardIsVisible(false);
    }

    useEffect(() => {
        const wizards = fullWarband.filter(member => member.role === "Wizard");
        const wizardCount = wizards.length;
        const totalCount = fullWarband.length;

        if (wizardCount === 0) {
            setForceOrgMessage("You have no wizards in your warband");
        } else if (wizardCount > 1) {
            setForceOrgMessage("You may only have one wizard in your warband");
        } else if (totalCount < 10) {
            setForceOrgMessage("You need ten models in your warband");
        } else {
            setForceOrgMessage("");
        }
    }, [fullWarband]);

    return (
        <main className="max-h-screen max-w-screen">
            {fullWarband.length > 0 ? <div className="flex justify-center pt-3 font-bold text-red-600"><p>{forceOrgMessage}</p></div> : null}
            <div className={`${fullWarband.length === 0 ? 'flex-col' : 'flex'} flex  flex-wrap justify-center items-center border-black p-4 gap-5 text-xl font-bold max-w-screen`}>

                {fullWarband.length === 0 ? <div className="flex-col align-middle justify-center text-center"><h1>Frostgrave Warband Manager</h1> <p>Press the + button to create members</p></div> : fullWarband.map((member, index) => (
                    <PlayModeCard key={member.name || index} member={member} onClick={() => handleCardClick(member)}></PlayModeCard>
                ))}
                <button onClick={goToCreatePage} className="bg-blue-300 rounded-2xl h-8 w-8 items-center justify-center mb-10 flex hover:opacity-80 hover:cursor-pointer"><p className="align-middle text-lg">+</p></button>
                {/* {isModCardVisible && selectedMember ? <ModifyModal member={selectedMember} onClick={closeModal} /> : null} */}
            </div>

        </main>
    )
}

export default PlayPage
