import React from 'react'
import { Member, MemberProp, Wizard, Apprentice } from "../models/models"

const WizardCard: React.FC<MemberProp> = ({ member, onClick }) => {
    return (
        <div className="p-2 bg-gray-900 rounded-xl flex flex-col hover:opacity-80 hover:cursor-pointer transition-transform duration-200 hover:scale-105" onClick={onClick}>
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


            {/* Level, Exp, Gold */}
            {member.role === "Wizard" ? <section className="p-1 flex flex-row sm:flex-row flex-wrap gap-2 justify-evenly">
                <div>
                    <h2 className="text-sm text-white font-bold">
                        Level: <span className="bg-white px-2 text-black inline-block rounded-lg">{(member as Wizard).level}</span>
                    </h2>
                </div>
                <div>
                    <h2 className="text-sm text-white font-bold">
                        Exp: <span className="bg-white px-2 text-black inline-block rounded-lg">{(member as Wizard).experience}</span>
                    </h2>
                </div>
                <div>
                    <h2 className="text-sm text-white font-bold">
                        Gold: <span className="bg-white px-2 text-black inline-block rounded-lg">{(member as Wizard).gold}</span>
                    </h2>
                </div>
            </section> : null}

            {/* Stats */}
            <section className="p-1 flex justify-evenly">
                <div className="w-16 flex flex-col items-center justify-center">
                    <h3 className="text-white text-sm font-bold mb-1">Move</h3>
                    <p className="bg-white w-8 text-lg font-bold rounded-lg text-center">{member.move}</p>
                </div>
                <div className="w-16 flex flex-col items-center justify-center">
                    <h3 className="text-white text-sm font-bold mb-1">Fight</h3>
                    <p className="bg-white w-8 text-lg font-bold rounded-lg text-center">{member.fight}</p>
                </div>
                <div className="w-16 flex flex-col items-center justify-center">
                    <h3 className="text-white text-sm font-bold mb-1">Shoot</h3>
                    <p className="bg-white w-8 text-lg font-bold rounded-lg text-center">{member.shoot}</p>
                </div>
                <div className="w-16 flex flex-col items-center justify-center">
                    <h3 className="text-white text-sm font-bold mb-1">Armour</h3>
                    <p className="bg-white w-8 text-lg font-bold rounded-lg text-center">{member.armour}</p>
                </div>
                <div className="w-16 flex flex-col items-center justify-center">
                    <h3 className="text-white text-sm font-bold mb-1">Will</h3>
                    <p className="bg-white w-8 text-lg font-bold rounded-lg text-center">{member.will}</p>
                </div>
                <div className="w-16 flex flex-col items-center justify-center">
                    <h3 className="text-white text-sm font-bold mb-1">Health</h3>
                    <p className="bg-white w-8 text-lg font-bold rounded-lg text-center">{member.health}</p>
                </div>
            </section>

            {/* Notes & Items */}
            <div className="flex flex-col md:flex-row gap-2 p-1">
                <section className="flex flex-col w-full md:w-1/2"  >
                    <h3 className="text-white text-xl font-bold mb-1">Notes</h3>
                    <p className="bg-white h-32 rounded-lg w-full p-1 overflow-auto text-sm">{member.notes}</p>
                </section>
                <section className="flex flex-col w-full md:w-1/2">
                    <h3 className="text-white text-xl font-bold mb-1">Items</h3>
                    <p className="bg-white h-32 rounded-lg w-full p-1 overflow-auto text-sm">{member.items}</p>
                </section>
            </div>
        </div>
    )
}

export default WizardCard
