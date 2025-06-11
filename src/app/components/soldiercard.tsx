import React from 'react'

const soldiercard = () => {
    return (
        <div className="p-2 w-xl bg-gray-900 rounded-xl flex flex-col">
            {/* Top section: Wizard + School */}
            <section className="p-1 flex flex-row justify-evenly md:flex-row gap-2 transition-transform duration-200 hover:scale-105">
                <div>
                    <h2 className="text-lg text-white font-bold">
                        Name: <span className="bg-white px-1 text-black inline-block w-full md:w-48 rounded-lg">Roy</span>
                    </h2>
                </div>
                <div>
                    <h2 className="text-lg text-white font-bold">
                        Type: <span className="bg-white px-1 text-black inline-block w-full md:w-32 rounded-lg">Elementalist</span>
                    </h2>
                </div>
            </section>

            {/* Level, Exp, Gold */}
            <section className="p-1 flex flex-row sm:flex-row flex-wrap gap-2 justify-evenly">
                <div>
                    <h2 className="text-sm text-white font-bold">
                        Level: <span className="bg-white px-2 text-black inline-block rounded-lg">500</span>
                    </h2>
                </div>
                <div>
                    <h2 className="text-sm text-white font-bold">
                        Exp: <span className="bg-white px-2 text-black inline-block rounded-lg">200</span>
                    </h2>
                </div>
                <div>
                    <h2 className="text-sm text-white font-bold">
                        Gold: <span className="bg-white px-2 text-black inline-block rounded-lg">200</span>
                    </h2>
                </div>
            </section>

            {/* Stats */}
            <section className="p-1 flex flex-wrap justify-center gap-2">
                <div className="w-16 flex flex-col items-center justify-center">
                    <h3 className="text-white text-sm font-bold mb-1">Move</h3>
                    <p className="bg-white w-14 text-lg font-bold rounded-lg text-center">6</p>
                </div>
                <div className="w-16 flex flex-col items-center justify-center">
                    <h3 className="text-white text-sm font-bold mb-1">Fight</h3>
                    <p className="bg-white w-14 text-lg font-bold rounded-lg text-center">+2</p>
                </div>
                <div className="w-16 flex flex-col items-center justify-center">
                    <h3 className="text-white text-sm font-bold mb-1">Shoot</h3>
                    <p className="bg-white w-14 text-lg font-bold rounded-lg text-center">0</p>
                </div>
                <div className="w-16 flex flex-col items-center justify-center">
                    <h3 className="text-white text-sm font-bold mb-1">Armor</h3>
                    <p className="bg-white w-14 text-lg font-bold rounded-lg text-center">+10</p>
                </div>
                <div className="w-16 flex flex-col items-center justify-center">
                    <h3 className="text-white text-sm font-bold mb-1">Will</h3>
                    <p className="bg-white w-14 text-lg font-bold rounded-lg text-center">10</p>
                </div>
                <div className="w-16 flex flex-col items-center justify-center">
                    <h3 className="text-white text-sm font-bold mb-1">Health</h3>
                    <p className="bg-white w-14 text-lg font-bold rounded-lg text-center">14</p>
                </div>
            </section>

            {/* Notes & Items */}
            <div className="flex flex-col md:flex-row gap-2 p-1">
                <section className="flex flex-col w-full md:w-1/2"  >
                    <h3 className="text-white text-xl font-bold mb-1">Notes</h3>
                    <p className="bg-white h-32 rounded-lg w-full p-1 overflow-auto text-sm"></p>
                </section>
                <section className="flex flex-col w-full md:w-1/2">
                    <h3 className="text-white text-xl font-bold mb-1">Items</h3>
                    <p className="bg-white h-32 rounded-lg w-full p-1 overflow-auto text-sm"></p>
                </section>
            </div>
        </div>
    )
}

export default soldiercard
