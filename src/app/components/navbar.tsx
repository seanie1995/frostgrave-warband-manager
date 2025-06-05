"use client"

import React, { useState, useContext, useRef } from 'react'
import { MyContext } from '../context/Context'
import { Member } from '../models/models'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const context = useContext(MyContext)

    if (!context) throw new Error("You dun goofed")

    const { fullWarband, setFullWarband } = context

    const fileInputRef = useRef<HTMLInputElement>(null)

    const downloadWarband = () => {
        const dataStr = JSON.stringify(fullWarband)
        const blob = new Blob([dataStr], { type: 'application/json' })
        const url = URL.createObjectURL(blob)

        const a = document.createElement('a')
        a.href = url
        a.download = 'warband.json'
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

    return (
        <nav className="relative inline-block text-left p-4 bg-gray-900 w-full">
            <button
                type="button"
                onClick={() => setIsOpen(prev => !prev)}
                className="inline-flex justify-center  rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-black text-sm font-medium hover:bg-gray-700"
            >
                Menu
            </button>

            {isOpen && (
                <div className="origin-top-left absolute left-4 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1 text-gray-800" role="menu">
                        <a href="/" className="block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">Edit Mode</a>
                        <a href="/PlayPage" className="block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">Play Mode</a>
                        <a href="/YourSpells" className="block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">Your Spells</a>
                        <a href="/WarbandBuilder" className="block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">Add a Member</a>

                        <button
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={downloadWarband}
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
                        >
                            Upload Warband
                        </button>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
