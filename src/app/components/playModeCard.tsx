import React, { useState } from 'react'
import { MemberProp, Wizard, Apprentice, Member } from '../models/models'

const PlayModeCard: React.FC<MemberProp> = ({ member, onClick }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    return (
        <>
            <div
                className="p-2 bg-gray-900 rounded-xl flex flex-col hover:opacity-80 hover:cursor-pointer"
                onClick={() => {
                    onClick()
                    openModal()
                }}
            >
                {/* Top section: Wizard + School */}
                {(member.role === 'Wizard' || member.role === 'Apprentice') ? (
                    <section className="p-1 flex flex-row justify-evenly md:flex-row gap-2">
                        <div>
                            <h2 className="text-lg text-white font-bold">
                                {member.role === 'Wizard' ? 'Wizard' : 'Apprentice'}:{' '}
                                <span className="bg-white px-1 text-black inline-block w-full md:w-48 rounded-lg">{member.name}</span>
                            </h2>
                        </div>
                        <div>
                            <h2 className="text-lg text-white font-bold">
                                School:{' '}
                                <span className="bg-white px-1 text-black inline-block w-full md:w-34 rounded-lg">
                                    {(member as Wizard | Apprentice).school}
                                </span>
                            </h2>
                        </div>
                    </section>
                ) : (
                    <section className="p-1 flex flex-row justify-evenly md:flex-row gap-2">
                        <div>
                            <h2 className="text-lg text-white font-bold">
                                Name:{' '}
                                <span className="bg-white px-1 text-black inline-block w-full md:w-48 rounded-lg">{member.name}</span>
                            </h2>
                        </div>
                        <div>
                            <h2 className="text-lg text-white font-bold">
                                Type:{' '}
                                <span className="bg-white px-1 text-black inline-block w-full md:w-32 rounded-lg">{member.role}</span>
                            </h2>
                        </div>
                    </section>
                )}

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

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-lg p-6 max-w-md w-full"
                        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside content
                    >
                        <h2 className="text-xl font-bold mb-4">{member.name}</h2>

                        <div className="mb-4">
                            <h3 className="font-semibold">Items:</h3>
                            <p className="whitespace-pre-wrap">{member.items || "-"}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold">Notes:</h3>
                            <p className="whitespace-pre-wrap">{member.notes || "-"}</p>
                        </div>

                        <button
                            onClick={closeModal}
                            className="mt-6 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default PlayModeCard
