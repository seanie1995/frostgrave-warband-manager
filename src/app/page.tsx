'use client';

import Image from "next/image";
import MemberCard from "./components/membercard"
import ModifyModal from "./components/modifyModal"
import { useRouter } from "next/navigation";
import { MyContext } from "./context/Context";
import { useContext, useEffect } from "react";
import { Wizard, Spell, Member } from "./models/models";
import { useState } from "react";

export default function Home() {
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
  const [forceOrgColor, setForceOrgColor] = useState<string>()
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
      setForceOrgColor("text-red-600")
      setForceOrgMessage("You have no wizards in your warband");
    } else if (wizardCount > 1) {
      setForceOrgColor("text-red-600")
      setForceOrgMessage("You may only have one wizard in your warband");
    } else if (totalCount < 10) {
      setForceOrgColor("text-red-600")
      setForceOrgMessage("You need ten models in your warband");
    } else {
      setForceOrgColor("black")
      setForceOrgMessage("Frostgrave Warband Manager");
    }
  }, [fullWarband]);


  return (
    <>
      <main className="max-h-screen max-w-screen">
        {fullWarband.length > 0 && (
          <div className={`flex justify-center pt-3 font-bold ${forceOrgColor}`}>
            <p>{forceOrgMessage}</p>
          </div>
        )}

        <div className={`grid gap-5 p-8 text-xl font-bold border-black 
                   grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3`}>

          {fullWarband.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center col-span-full">
              <h1>Frostgrave Warband Manager</h1>
              <p>Press the + button to create members</p>
            </div>
          ) : (
            fullWarband.map((member, index) => (
              <MemberCard
                isOpen={true}
                key={member.name || index}
                member={member}
                onClick={() => handleCardClick(member)}
              />
            ))
          )}

          <button
            onClick={goToCreatePage}
            className="bg-blue-300 rounded-2xl h-8 w-8 items-center justify-center mb-10 flex hover:opacity-80 hover:cursor-pointer col-span-1 sm:col-span-1"
          >
            <p className="align-middle text-lg transition-transform duration-200 hover:scale-105">+</p>
          </button>

          {isModCardVisible && selectedMember && (
            <ModifyModal
              member={selectedMember}
              onClick={closeModal}
              isOpen={isModCardVisible}
            />
          )}
        </div>
      </main>


    </>
  );
}

