"use client"

import React, { useState, useContext, useRef } from 'react'
import { MyContext } from '../context/Context'
import { Member, Wizard } from '../models/models'
import { useRouter } from 'next/navigation'


const Navbar = () => {
    const router = useRouter()   // <-- instantiate router
    const [isOpen, setIsOpen] = useState(false)
    const [isPlayMode, setIsPlayMode] = useState(false);
    const context = useContext(MyContext)

    if (!context) throw new Error("You dun goofed")

    const { fullWarband, setFullWarband } = context


    const fileInputRef = useRef<HTMLInputElement>(null)

    const downloadWarband = () => {
        const dataStr = JSON.stringify(fullWarband)
        const blob = new Blob([dataStr], { type: 'application/json' })
        const url = URL.createObjectURL(blob)

        const wizard = fullWarband.find(e => e.role === 'Wizard') as Wizard;

        const wizardName = wizard.name;

        const a = document.createElement('a')
        a.href = url
        a.download = `${wizardName}'s Warband.json`
        a.click()

        URL.revokeObjectURL(url)
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (event) => {
            try {
                setFullWarband([])
                const json = JSON.parse(event.target?.result as string) as Member[]
                setFullWarband(json)
                localStorage.setItem('warband', JSON.stringify(json))
                console.log("Uploaded JSON:", json)
            } catch {
                alert("Invalid JSON file")
            }
        }
        reader.readAsText(file)
    }

    const onUploadButtonClick = () => {
        fileInputRef.current?.click()
    }

    const goToWizardMenu = () => {
        if (fullWarband.find(e => e.role === "Wizard")) {
            router.push('/WizardMenu')
        } else (
            alert("You have no wizard")
        )
    }

    const ClearWarband = () => {
        const confirmed = window.confirm("Are you sure you want to clear warband?")
        if (!confirmed) return;

        setFullWarband([])
        localStorage.clear();
        setIsOpen(false);
        router.push("/")
    }

    return (
        <nav className="relative flex justify-between text-right p-4 bg-gray-900 w-screen">
            <a href="/"><h1 className='font-bold text-white text-3xl'>FROSTGRAVE MANAGER</h1></a>
            <div>
                {!isPlayMode ?

                    <button
                        type="button"
                        onClick={() => { router.push('/PlayPage'), setIsPlayMode(prev => !prev), setIsOpen(false) }}  // <-- navigate on click
                        className="inline-flex justify-center mr-1  rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-black text-sm font-medium hover:bg-gray-200"
                    >
                        Play Mode
                    </button> :
                    <button
                        type="button"
                        onClick={() => { router.push('/'), setIsPlayMode(prev => !prev), setIsOpen(false) }}  // <-- navigate on click
                        className="inline-flex justify-center mr-1  rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-black text-sm font-medium hover:bg-gray-200"
                    >
                        Edit Mode
                    </button>}
                <button
                    type="button"
                    onClick={() => { goToWizardMenu(), setIsOpen(false) }}  // <-- navigate on click
                    className="inline-flex justify-center mr-1  rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-black text-sm font-medium hover:bg-gray-200"
                >
                    Wizard Menu
                </button>
                <button
                    type="button"
                    onClick={() => { router.push('/YourSpells'), setIsOpen(false) }}  // <-- navigate on click
                    className="inline-flex justify-center mr-1  rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-black text-sm font-medium hover:bg-gray-200"
                >
                    Spells
                </button>
                <button
                    type="button"
                    onClick={() => setIsOpen(prev => !prev)}
                    className="inline-flex justify-center mr-1  rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-black text-sm font-medium hover:bg-gray-200"
                >
                    &#9776;
                </button>
                {isOpen && (
                    <div className="origin-top-right absolute right-4 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                        <div className="py-1 text-gray-800" role="menu">
                            <a href="/YourSpells" className="block px-4 py-2 text-sm text-left hover:bg-gray-100" role="menuitem">Your Spells</a>
                            <a href="/EditSpells" className="block px-4 py-2 text-sm text-left hover:bg-gray-100" role="menuitem">Edit Spells</a>
                            <a href="/WarbandBuilder" className="block px-4 py-2 text-sm text-left hover:bg-gray-100" role="menuitem">Add a Member</a>
                            <a href="/AllSpells" className="block px-4 py-2 text-sm text-left hover:bg-gray-100" role="menuitem">All Spells</a>
                            <button
                                className="block px-4 py-2 text-sm text-left hover:bg-gray-100"
                                onClick={downloadWarband}
                                role="menuitem"
                            >
                                Download Warband
                            </button>

                            {/* Hidden file input */}
                            <input
                                type="file"
                                accept="application/json"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                className="hidden"
                            />

                            <button
                                className="block px-4 py-2 text-sm hover:bg-gray-100"
                                onClick={onUploadButtonClick}
                                role="menuitem"
                            >
                                Upload Warband
                            </button>
                            <button
                                className="block px-4 py-2 text-sm hover:bg-gray-100"
                                onClick={ClearWarband}
                                role="menuitem"
                            >
                                Clear Warband
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
