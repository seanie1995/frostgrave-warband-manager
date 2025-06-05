import React from 'react'
import { MemberProp, Wizard, Apprentice, Soldier, Member } from '../models/models'

const playModeCard: React.FC<MemberProp> = ({ member, onClick }) => {
    return (
        <div className="p-2 bg-gray-900 rounded-xl flex flex-col hover:opacity-80 hover:cursor-pointer" onClick={onClick}>
            {/* Top section: Wizard + School */}

            {member.role === "Wizard" || member.role === "Apprentice" ? <section className="p-1 flex flex-row justify-evenly md:flex-row gap-2">
                <div>
                    <h2 className="text-lg text-white font-bold">
                        {member.role === "Wizard" ? "Wizard" : "Apprentice"}: <span className="bg-white px-1 text-black inline-block w-full md:w-48 rounded-lg">{member.name}</span>
                    </h2>
                </div>
                <div>
                    <h2 className="text-lg text-white font-bold">
                        School: <span className="bg-white px-1 text-black inline-block w-full md:w-34 rounded-lg">{(member as Wizard | Apprentice).school}</span>
                    </h2>
                </div>
            </section> :
                <section className="p-1 flex flex-row justify-evenly md:flex-row gap-2">
                    <div>
                        <h2 className="text-lg text-white font-bold">
                            Name: <span className="bg-white px-1 text-black inline-block w-full md:w-48 rounded-lg">{member.name}</span>
                        </h2>
                    </div>
                    <div>
                        <h2 className="text-lg text-white font-bold">
                            Type: <span className="bg-white px-1 text-black inline-block w-full md:w-32 rounded-lg">{member.role}</span>
                        </h2>
                    </div>
                </section>}

            {/* Stats */}
            <section className="p-1 flex justify-evenly">
                <div className="w-16 flex flex-col items-center justify-center">
                    <h3 className="text-white text-sm font-bold mb-1">M</h3>
                    <p className="bg-white w-10 text-lg font-bold rounded-lg text-center">{member.move}</p>
                </div>
                <div className="w-16 flex flex-col items-center justify-center">
                    <h3 className="text-white text-sm font-bold mb-1">F</h3>
                    <p className="bg-white w-10 text-lg font-bold rounded-lg text-center">{member.fight}</p>
                </div>
                <div className="w-16 flex flex-col items-center justify-center">
                    <h3 className="text-white text-sm font-bold mb-1">S</h3>
                    <p className="bg-white w-10 text-lg font-bold rounded-lg text-center">{member.shoot}</p>
                </div>
                <div className="w-16 flex flex-col items-center justify-center">
                    <h3 className="text-white text-sm font-bold mb-1">A</h3>
                    <p className="bg-white w-10 text-lg font-bold rounded-lg text-center">{member.armour}</p>
                </div>
                <div className="w-16 flex flex-col items-center justify-center">
                    <h3 className="text-white text-sm font-bold mb-1">W</h3>
                    <p className="bg-white w-10 text-lg font-bold rounded-lg text-center">{member.will}</p>
                </div>
                <div className="w-16 flex flex-col items-center justify-center">
                    <h3 className="text-white text-sm font-bold mb-1">HP</h3>
                    <p className="bg-white w-10 text-lg font-bold rounded-lg text-center">{member.health}</p>
                </div>
            </section>
        </div>
    )
}

export default playModeCard
