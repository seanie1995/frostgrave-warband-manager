import React from 'react'
import "./styles/modifyModal.css"
import { Member, MemberProp, Wizard, Apprentice } from "../models/models"

const modifyModal: React.FC<MemberProp> = ({ member }) => {
    return (
        <main className="flex items-center justify-center">
            <form
                className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
            >
                <h2 className='text-center'>{member.role}</h2>
                <input
                    type="text"
                    name="wizardName"
                    placeholder="Name"
                    className="w-full border rounded px-3 py-2 max-w-xs mx-auto block text-center"
                    required
                    defaultValue={member.name}
                />
                <div className='gap-2 flex flex-col flex-wrap justify-evenly'>

                    <div className='gap-2 flex flex-rowl flex-wrap justify-evenly'>
                        {member.role === "Wizard" ? (
                            <div className='flex flex-row gap-2'>
                                <div className="statContainer">
                                    <label htmlFor="level" className="whitespace-nowrap">Level</label>
                                    <input
                                        type="text"
                                        id="level"
                                        name="level"
                                        className="w-24 border rounded px-3 py-2"
                                        required
                                        defaultValue={(member as Wizard).level}
                                    />
                                </div>
                                <div className="statContainer">
                                    <label htmlFor="exp" className="whitespace-nowrap">Exp</label>
                                    <input
                                        type="number"
                                        id="exp"
                                        name="exp"
                                        className="w-24 border rounded px-3 py-2"
                                        required
                                        defaultValue={(member as Wizard).experience}
                                    />
                                </div>
                                <div className="statContainer">
                                    <label htmlFor="gold" className="whitespace-nowrap">Gold</label>
                                    <input
                                        type="number"
                                        id="gold"
                                        name="gold"
                                        className="w-24 border rounded px-3 py-2"
                                        required
                                        defaultValue={(member as Wizard).gold}
                                    />
                                </div>
                            </div>
                        ) : null}

                        <div className="statContainer">
                            <label htmlFor="move" className="whitespace-nowrap">Move</label>
                            <input
                                type="number"
                                id="move"
                                name="move"
                                className="w-24 border rounded px-3 py-2"
                                required
                                defaultValue={member.move}
                            />
                        </div>

                        <div className="statContainer">
                            <label htmlFor="fight" className="whitespace-nowrap">Fight</label>
                            <input
                                type="number"
                                id="fight"
                                name="fight"
                                className="w-24 border rounded px-3 py-2"
                                required
                                defaultValue={member.fight}
                            />
                        </div>

                        <div className="statContainer">
                            <label htmlFor="shoot" className="whitespace-nowrap">Shoot</label>
                            <input
                                type="number"
                                id="shoot"
                                name="shoot"
                                className="w-24 border rounded px-3 py-2"
                                required
                                defaultValue={member.shoot}
                            />
                        </div>

                        <div className="statContainer">
                            <label htmlFor="armor" className="whitespace-nowrap">Armor</label>
                            <input
                                type="number"
                                id="armor"
                                name="armor"
                                className="w-24 border rounded px-3 py-2"
                                required
                                defaultValue={member.armour}
                            />
                        </div>

                        <div className="statContainer">
                            <label htmlFor="will" className="whitespace-nowrap">Will</label>
                            <input
                                type="number"
                                id="will"
                                name="will"
                                className="w-24 border rounded px-3 py-2"
                                required
                                defaultValue={member.will}
                            />
                        </div>

                        <div className="statContainer">
                            <label htmlFor="health" className="whitespace-nowrap">Health</label>
                            <input
                                type="number"
                                id="health"
                                name="health"
                                className="w-24 border rounded px-3 py-2"
                                required
                                defaultValue={member.health}
                            />
                        </div>
                    </div>

                </div>
                <button
                    type="submit"
                    className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-600"
                >
                    Save Wizard
                </button>
                <button
                    type="button"
                    className="w-full text-white py-2 rounded bg-gray-800  hover:bg-gray-600"
                    onClick={() => {
                        // You can add cancel logic here
                        console.log("Cancelled");
                    }}
                >
                    Return
                </button>
                <button
                    type="button"
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-400"
                    onClick={() => {
                        // You can add cancel logic here
                        console.log("Cancelled");
                    }}
                >
                    Delete
                </button>
            </form>
        </main>
    )
}

export default modifyModal


