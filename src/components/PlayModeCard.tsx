import React, { useState } from "react";
import { MemberProp, Wizard, Apprentice } from "@/models/models";

const PlayModeCard: React.FC<MemberProp> = ({ member, onClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <div>
      <div
        className="p-2 bg-blue-900 rounded-xl flex flex-col hover:opacity-80 hover:cursor-pointer transition-transform duration-200 hover:scale-105"
        onClick={() => {
          onClick();
          toggleDropdown();
        }}
      >
        {/* Top section: Wizard + School */}
        {member.role === "Wizard" || member.role === "Apprentice" ? (
          <section className="p-1 flex flex-row justify-evenly md:flex-row gap-2">
            <div>
              <h2 className="text-lg text-white font-bold">
                {member.role === "Wizard" ? "Wizard" : "Apprentice"}:{" "}
                <span className="bg-white px-1 text-black inline-block w-full md:w-48 rounded-lg">
                  {member.name}
                </span>
              </h2>
            </div>
            <div>
              <h2 className="text-lg text-white font-bold">
                School:{" "}
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
                Name:{" "}
                <span className="bg-white px-1 text-black inline-block w-full md:w-48 rounded-lg">
                  {member.name}
                </span>
              </h2>
            </div>
            <div>
              <h2 className="text-lg text-white font-bold">
                Type:{" "}
                <span className="bg-white px-1 text-black inline-block w-full md:w-32 rounded-lg">
                  {member.role}
                </span>
              </h2>
            </div>
          </section>
        )}

        {/* Stats */}
        <section className="p-1 flex justify-evenly">
          <div className="w-16 flex flex-col items-center justify-center">
            <h3 className="text-white text-sm font-bold mb-1">M</h3>
            <p className="bg-white text-black w-10 text-lg font-bold rounded-lg text-center">
              {member.move}
            </p>
          </div>
          <div className="w-16 flex flex-col items-center justify-center">
            <h3 className="text-white text-sm font-bold mb-1">F</h3>
            <p className="bg-white text-black w-10 text-lg font-bold rounded-lg text-center">
              {member.fight}
            </p>
          </div>
          <div className="w-16 flex flex-col items-center justify-center">
            <h3 className="text-white text-sm font-bold mb-1">S</h3>
            <p className="bg-white text-black w-10 text-lg font-bold rounded-lg text-center">
              {member.shoot}
            </p>
          </div>
          <div className="w-16 flex flex-col items-center justify-center">
            <h3 className="text-white text-sm font-bold mb-1">A</h3>
            <p className="bg-white text-black w-10 text-lg font-bold rounded-lg text-center">
              {member.armour}
            </p>
          </div>
          <div className="w-16 flex flex-col items-center justify-center">
            <h3 className="text-white text-sm font-bold mb-1">W</h3>
            <p className="bg-white text-black w-10 text-lg font-bold rounded-lg text-center">
              {member.will}
            </p>
          </div>
          <div className="w-16 flex flex-col items-center justify-center">
            <h3 className="text-white text-sm font-bold mb-1">HP</h3>
            <p className="bg-white text-black w-10 text-lg font-bold rounded-lg text-center">
              {member.health}
            </p>
          </div>
        </section>
      </div>

      {/* Dropdown content */}
      {isDropdownOpen && (
        <div className="glass-panel rounded-b-xl p-4 mt-1 max-w-md mx-auto shadow-md">
          <div className="mb-4">
            <h3 className="font-semibold text-sm text-slate-300">Items:</h3>
            <p className="whitespace-pre-wrap text-sm text-white">
              {member.items || "-"}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-slate-300">Notes:</h3>
            <p className="whitespace-pre-wrap text-sm text-white">
              {member.notes || "-"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayModeCard;
