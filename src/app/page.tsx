'use client';

import MemberCard from "@/components/MemberCard"
import ModifyModal from "@/components/ModifyModal"
import { useRouter } from "next/navigation";
import { MyContext } from "@/context/Context";
import { useContext, useState } from "react";
import { Member } from "@/models/models";

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
  const [isOpen, setIsOpen] = useState(false); // Added missing state for modal

  const handleCardClick = (member: Member) => {
    setSelectedMember(member);
    setModCardIsVisible(true);
    setIsOpen(true);
  }

  const closeModal = () => {
    setModCardIsVisible(false);
    setIsOpen(false);
    setSelectedMember(null);
  }

  const wizards = fullWarband.filter(member => member.role === "Wizard");
  const wizardCount = wizards.length;
  const totalCount = fullWarband.length;

  let forceOrgMessage = "Frostgrave Warband Manager";
  let forceOrgColor = "bg-slate-500"; // Default color

  if (wizardCount === 0) {
    forceOrgColor = "bg-red-500"
    forceOrgMessage = "You have no wizards in your warband";
  } else if (wizardCount > 1) {
    forceOrgColor = "bg-red-500"
    forceOrgMessage = "You may only have one wizard in your warband";
  } else if (totalCount < 10) {
    forceOrgColor = "bg-yellow-500"
    forceOrgMessage = "You need ten models in your warband";
  } else {
    forceOrgColor = "bg-green-500"
    forceOrgMessage = "Warband Ready";
  }


  return (
    <main className="min-h-screen pb-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
            {/* Header / Status Bar */}
            {fullWarband.length > 0 && (
                <div className="glass-panel rounded-xl p-4 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${forceOrgColor} shadow-[0_0_10px_rgba(255,255,255,0.5)]`}></div>
                        <span className="text-white font-medium tracking-wide">{forceOrgMessage}</span>
                    </div>
                    <div className="text-slate-400 text-sm">
                        {fullWarband.length} Members
                    </div>
                </div>
            )}

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fullWarband.map((member, index) => (
                    <MemberCard 
                        key={index} 
                        member={member} 
                        onClick={() => handleCardClick(member)} 
                    />
                ))}
                
                {/* Add Button */}
                <button
                    onClick={goToCreatePage}
                    className="glass-panel rounded-xl flex flex-col items-center justify-center min-h-[300px] hover:bg-white/5 transition-all duration-300 group border-dashed border-2 border-white/20 hover:border-[var(--accent-color)]"
                >
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:bg-[var(--accent-color)] group-hover:text-black">
                        <span className="text-4xl font-light text-white group-hover:text-black">+</span>
                    </div>
                    <span className="text-slate-400 font-medium group-hover:text-white transition-colors">Add Member</span>
                </button>
            </div>

            {/* Empty State */}
            {fullWarband.length === 0 && (
                <div className="text-center py-20">
                    <h2 className="text-3xl font-bold text-white mb-4">Your Warband is Empty</h2>
                    <p className="text-slate-400 mb-8">Start by adding a Wizard to lead your warband into the frozen city.</p>
                </div>
            )}

            {isOpen && selectedMember && (
                <ModifyModal 
                    member={selectedMember} 
                    onClick={closeModal}
                    isOpen={isOpen}
                />
            )}
        </div>
    </main>
  );
}

