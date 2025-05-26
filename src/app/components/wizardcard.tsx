import React from 'react'

const WizardCard = () => {
    return (
        <div className="p-4 w-full max-w-4xl mx-auto bg-black rounded-2xl flex flex-col">
            {/* Top section: Wizard + School */}
            <section className="p-2 flex flex-row justify-evenly md:flex-row gap-4">
                <div>
                    <h2 className="text-2xl text-white font-bold">
                        Wizard: <span className="bg-white pl-2 pr-2 text-black inline-block w-full md:w-80 rounded-xl">Roy</span>
                    </h2>
                </div>
                <div>
                    <h2 className="text-2xl text-white font-bold">
                        School: <span className="bg-white pl-2 pr-2 text-black inline-block w-full md:w-48 rounded-xl">Elementalist</span>
                    </h2>
                </div>
            </section>

            {/* Level, Exp, Gold */}
            <section className="p-2 flex flex-row sm:flex-row flex-wrap gap-4 justify-evenly">
                <div>
                    <h2 className="text-xl  text-white font-bold">
                        Level: <span className="bg-white px-3 text-black inline-block rounded-xl">500</span>
                    </h2>
                </div>
                <div>
                    <h2 className="text-xl  text-white font-bold">
                        Exp: <span className="bg-white px-3 text-black inline-block rounded-xl">200</span>
                    </h2>
                </div>
                <div>
                    <h2 className="text-xl  text-white font-bold">
                        Gold: <span className="bg-white px-3 text-black inline-block rounded-xl">200</span>
                    </h2>
                </div>
            </section>

            {/* Stats */}
            <section className="p-2 flex flex-wrap justify-between gap-4">
                <div className="w-24 flex flex-col items-center justify-center">
                    <h3 className="text-white text-xl  font-bold mb-1">Move</h3>
                    <p className="bg-white w-20 text-xl font-bold rounded-xl text-center">6</p>
                </div>
                <div className="w-24 flex flex-col items-center justify-center">
                    <h3 className="text-white text-xl  font-bold mb-1">Fight</h3>
                    <p className="bg-white w-20 text-xl font-bold rounded-xl text-center">+2</p>
                </div>
                <div className="w-24 flex flex-col items-center justify-center">
                    <h3 className="text-white text-xl  font-bold mb-1">Shoot</h3>
                    <p className="bg-white w-20 text-xl font-bold rounded-xl text-center">0</p>
                </div>
                <div className="w-24 flex flex-col items-center justify-center">
                    <h3 className="text-white text-xl  font-bold mb-1">Armor</h3>
                    <p className="bg-white w-20 text-xl font-bold rounded-xl text-center">+10</p>
                </div>
                <div className="w-24 flex flex-col items-center justify-center">
                    <h3 className="text-white text-xl font-bold mb-1">Will</h3>
                    <p className="bg-white w-20 text-xl font-bold rounded-xl text-center">10</p>
                </div>
                <div className="w-24 flex flex-col items-center justify-center">
                    <h3 className="text-white text-xl  font-bold mb-1">Health</h3>
                    <p className="bg-white w-20 text-xl font-bold rounded-xl text-center">14</p>
                </div>
            </section>

            {/* Notes & Items */}
            <div className="flex flex-col md:flex-row gap-4 p-2">
                <section className="flex flex-col w-full md:w-1/2"  >
                    <h3 className="text-white text-2xl font-bold mb-1">Notes</h3>
                    <p className="bg-white h-40 rounded-xl w-full p-2 overflow-auto"></p>
                </section>
                <section className="flex flex-col w-full md:w-1/2">
                    <h3 className="text-white text-2xl font-bold mb-1">Items</h3>
                    <p className="bg-white h-40 rounded-xl w-full p-2 overflow-auto"></p>
                </section>
            </div>
        </div>
    )
}

export default WizardCard
