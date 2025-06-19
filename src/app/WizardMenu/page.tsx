import React, { ChangeEvent, useContext, useState } from 'react'
import { Member, MemberProp, Wizard, Apprentice } from "../models/models"
import { MyContext } from '../context/Context'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const WizardPage = () => {
    return (
        <main className="min-h-screen w-screen bg-gray-50 p-4">
            <form className="flex flex-col justify-center bg-white p-6 rounded-xl shadow-md w-screen space-y-4">
                <h1 className='text-2xl font-bold'>Wizard</h1>
                <h2 className='font-bold text-xl'>School</h2>
                <input
                    type="text"
                    name="wizardName"
                    placeholder="Name"
                    required
                    className='border-1 border-black rounded max-w-1/5 py-2 pl-2'
                />
                <div>
                    <div className='flex gap-6 flex-col'>
                        <div className='flex sm:max-w-screen gap-3'>
                            <div className='flex flex-col gap-2'>
                                <label>Level</label>
                                <input type="number" required className='border-1 p-1 border-black rounded' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label>Exp</label>
                                <input type="number" required className='border-1 p-1 border-black rounded' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label>Gold</label>
                                <input type="number" required className='border-1 p-1 border-black rounded' />
                            </div>
                        </div>
                        {/* STAT LINE */}
                        <div className='flex flex-wrap align-middle gap-3'>
                            <div className='flex flex-col gap-2'>
                                <label>Move</label>
                                <input type="number" className='border-1 p-1 border-black rounded' required />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label>Fight</label>
                                <input type="number" className='border-1 p-1 border-black rounded' required />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label>Shoot</label>
                                <input type="number" className='border-1 p-1 border-black rounded' required />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label>Armor</label>
                                <input type="number" className='border-1 p-1 border-black rounded' required />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label>Will</label>
                                <input type="number" className='border-1 p-1 border-black rounded' required />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label>Health</label>
                                <input type="number" className='border-1 p-1 border-black rounded' required />
                            </div>
                        </div>
                        {/* ITEMS AND NOTES */}
                        <div className='flex gap-2'>
                            <input

                                type="text"
                                name="items"
                                placeholder="Items"
                                className='border-1 py-10 pr-16 pl-2 rounded'
                            />
                            <input
                                type="text"
                                name="notes"
                                placeholder="Notes"
                                className='border-1 py-10 pr-16 pl-2 rounded'
                            />
                        </div>
                        {/* ALL SPELLS */}
                        <div>
                            <label htmlFor="">All Spells</label>
                            <ul>
                                <li>Put spells here</li>
                            </ul>
                        </div>
                    </div>



                </div>
                <button type="button" className='border-1 max-w-26 rounded-md p-1 hover:bg-gray-600 hover:cursor-pointers  bg-gray-800 text-white'>
                    Save
                </button>
            </form>
        </main>
    )
}

export default WizardPage
