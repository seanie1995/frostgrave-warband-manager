import React from 'react'
import { Member, MemberProp, Wizard, Apprentice } from "@/models/models"

const MemberCard: React.FC<MemberProp> = ({ member, onClick }) => {
    const isSpellcaster = member.role === "Wizard" || member.role === "Apprentice";
    
    return (
        <div 
            className="glass-panel p-4 rounded-xl flex flex-col hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all duration-300 cursor-pointer group relative overflow-hidden" 
            onClick={onClick}
        >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Header Section */}
            <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-2">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-wide group-hover:text-[var(--accent-color)] transition-colors">
                        {member.name}
                    </h2>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-[var(--accent-color)] border border-white/5">
                        {member.role}
                    </span>
                </div>
                {isSpellcaster && (
                    <div className="text-right">
                        <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">School</span>
                        <div className="text-sm font-medium text-white">{(member as Wizard | Apprentice).school}</div>
                    </div>
                )}
            </div>

            {/* Wizard Specific Stats */}
            {member.role === "Wizard" && (
                <div className="grid grid-cols-3 gap-2 mb-4 bg-black/20 rounded-lg p-2">
                    <div className="text-center">
                        <div className="text-xs text-slate-400 uppercase">Level</div>
                        <div className="font-bold text-[var(--accent-color)]">{(member as Wizard).level}</div>
                    </div>
                    <div className="text-center border-l border-white/10">
                        <div className="text-xs text-slate-400 uppercase">Exp</div>
                        <div className="font-bold text-white">{(member as Wizard).experience}</div>
                    </div>
                    <div className="text-center border-l border-white/10">
                        <div className="text-xs text-slate-400 uppercase">Gold</div>
                        <div className="font-bold text-yellow-400">{(member as Wizard).gold}</div>
                    </div>
                </div>
            )}

            {/* Main Stats Grid */}
            <div className="grid grid-cols-6 gap-1 mb-4">
                {[
                    { label: 'M', value: member.move },
                    { label: 'F', value: member.fight },
                    { label: 'S', value: member.shoot },
                    { label: 'A', value: member.armour },
                    { label: 'W', value: member.will },
                    { label: 'H', value: member.health }
                ].map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center bg-white/5 rounded p-1">
                        <span className="text-[10px] text-slate-400 font-bold">{stat.label}</span>
                        <span className="text-sm font-bold text-white">{stat.value}</span>
                    </div>
                ))}
            </div>

            {/* Footer: Notes & Items */}
            <div className="grid grid-cols-2 gap-3 mt-auto">
                <div className="bg-black/20 rounded-lg p-2 h-24 overflow-hidden">
                    <h3 className="text-xs text-slate-400 uppercase font-bold mb-1">Notes</h3>
                    <p className="text-xs text-slate-300 line-clamp-4">{member.notes || "—"}</p>
                </div>
                <div className="bg-black/20 rounded-lg p-2 h-24 overflow-hidden">
                    <h3 className="text-xs text-slate-400 uppercase font-bold mb-1">Items</h3>
                    <p className="text-xs text-slate-300 line-clamp-4">{member.items || "—"}</p>
                </div>
            </div>
        </div>
    )
}

export default MemberCard
