'use client';

import Image from "next/image";
import MemberCard from "./components/membercard"
import ModifyModal from "./components/modifyModal"
import { useRouter } from "next/navigation";
import { MyContext } from "./context/Context";
import { useContext } from "react";
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

  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isModCardVisible, setModCardIsVisible] = useState<boolean>(false);

  const handleCardClick = (member: Member) => {
    setSelectedMember(member);
    setModCardIsVisible(true);
  }

  const closeModal = () => {
    setModCardIsVisible(false);
  }

  const testWizard: Wizard = {
    name: "Sean",
    school: "Witch",
    spells: [] as (Spell | null)[],
    role: "Wizard",
    move: 6,
    fight: 2,
    shoot: 0,
    armour: 10,
    will: 4,
    health: 14,
    items: "",
    notes: "",
    experience: 0,
    level: 1,
    gold: 200
  }


  return (
    <>
      <main className="max-h-lvh max-w-screen">
        <div className={`${fullWarband.length === 0 ? 'flex-col' : 'flex'} flex  flex-wrap justify-center items-center border-black p-4 gap-5 text-xl font-bold max-w-screen`}>
          {fullWarband.length === 0 ? <div className="flex-col align-middle justify-center text-center"><h1>Frostgrave Warband Manager</h1> <p>Press the + button to create members</p></div> : fullWarband.map((member, index) => (
            <MemberCard key={member.name || index} member={member} onClick={() => handleCardClick(member)}></MemberCard>
          ))}
          <button onClick={goToCreatePage} className="bg-blue-300 rounded-2xl h-8 w-8 items-center justify-center flex hover:opacity-80 hover:cursor-pointer"><p className="align-middle text-lg">+</p></button>
          {isModCardVisible && selectedMember ? <ModifyModal member={selectedMember} onClick={closeModal} /> : null}
        </div>

      </main>
    </>
  );
}

