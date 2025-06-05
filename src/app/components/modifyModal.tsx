import React, { ChangeEvent, useContext, useState } from 'react'
import "./styles/modifyModal.css"
import { Member, MemberProp, Wizard, Apprentice } from "../models/models"
import { MyContext } from '../context/Context'

const modifyModal: React.FC<MemberProp> = ({ member, onClick }) => {

    const context = useContext(MyContext)

    if (!context) {
        throw new Error("MyContext must be used within a provider");
    }

    const { fullWarband, setFullWarband } = context;

    const [selectedMember, setSelectedMember] = useState<Member>({ ...member })

    const handleDelete = (member: Member) => {

        const updatedWarband = fullWarband.filter((e: Member) =>
            e.name !== member.name
        )
        onClick();
        setFullWarband(updatedWarband);

        localStorage.setItem('warband', JSON.stringify(updatedWarband));
    }

    const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const updatedWarband = fullWarband.map(m =>
            m.name === member.name ? selectedMember : m
        )

        setFullWarband(updatedWarband)

        onClick();
        localStorage.setItem('warband', JSON.stringify(updatedWarband))
    }

    const handleUpgrade = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const currentWizard = fullWarband.find((e: Member) => e.role === "Wizard") as Wizard | undefined;

        if (!currentWizard) {
            console.warn("No Wizard Found");
            return;
        }

        const newWizard: Wizard = {
            ...selectedMember,
            role: "Wizard",
            level: currentWizard.level < 6 ? 0 : currentWizard.level - 6,
            experience: currentWizard.experience,
            gold: currentWizard.gold,
            school: currentWizard.school,
            spells: currentWizard.spells,
            health: currentWizard.health,
            fight: currentWizard.fight
        };

        const updatedWarband = fullWarband
            .filter((e: Member) => e.name !== selectedMember.name)
            .concat(newWizard)

        setFullWarband(updatedWarband);
        localStorage.setItem("warband", JSON.stringify(updatedWarband));
        onClick();

        console.log(newWizard)

    }

    return (
        <main className="fixed flex inset-0 m-auto z-50 mt-20 justify-center items-center">
            <form
                className="bg-gray-200  p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
            >
                <h2 className='text-center'>{member.role}</h2>
                <input
                    type="text"
                    name="wizardName"
                    placeholder="Name"
                    className="w-full border rounded px-3 py-2 max-w-xs mx-auto block text-center"
                    required
                    defaultValue={member.name}
                    onChange={e => setSelectedMember(prev => ({ ...prev, name: e.target.value }))}
                />
                <div className='gap-2 flex flex-col flex-wrap justify-evenly'>

                    <div className='gap-2 flex flex-rowl flex-wrap justify-evenly'>
                        {member.role === "Wizard" ? (
                            <div className='flex flex-row gap-2'>
                                <div className="statContainer">
                                    <label htmlFor="level" className="whitespace-nowrap">Level</label>
                                    <input
                                        type="number"
                                        id="level"
                                        name="level"
                                        className="w-24 border rounded px-3 py-2"
                                        required
                                        defaultValue={(member as Wizard).level}
                                        onChange={e => setSelectedMember(prev => ({ ...prev, level: Number(e.target.value) }))}
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
                                        onChange={e => setSelectedMember(prev => ({ ...prev, experience: Number(e.target.value) }))}
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
                                        onChange={e => setSelectedMember(prev => ({ ...prev, gold: Number(e.target.value) }))}
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
                                onChange={e => setSelectedMember(prev => ({ ...prev, move: Number(e.target.value) }))}
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
                                onChange={e => setSelectedMember(prev => ({ ...prev, fight: Number(e.target.value) }))}
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
                                onChange={e => setSelectedMember(prev => ({ ...prev, shoot: Number(e.target.value) }))}
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
                                onChange={e => setSelectedMember(prev => ({ ...prev, armour: Number(e.target.value) }))}
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
                                onChange={e => setSelectedMember(prev => ({ ...prev, will: Number(e.target.value) }))}
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
                                onChange={e => setSelectedMember(prev => ({ ...prev, health: Number(e.target.value) }))}
                            />
                        </div>
                    </div>

                </div>
                <button
                    type="button"
                    className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-600"
                    onClick={handleChange}
                >
                    Save
                </button>
                <button
                    type="button"
                    className="w-full text-white py-2 rounded bg-gray-800  hover:bg-gray-600"
                    onClick={onClick}
                >
                    Return
                </button>
                <button
                    type="button"
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-400"
                    onClick={() => handleDelete(member)}
                >
                    Delete
                </button>
                {member.role === "Apprentice" ?
                    <button
                        type="button"
                        className="w-full text-white py-2 rounded bg-gray-800  hover:bg-gray-600"
                        onClick={handleUpgrade}>Upgrade to Wizard</button> :
                    null}
            </form>
        </main>
    )
}

export default modifyModal


