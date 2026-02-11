"use client";

import React, { useState, useContext, useRef } from "react";
import { MyContext } from "@/context/Context";
import { Member, Wizard } from "@/models/models";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter(); // <-- instantiate router
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(MyContext);

  if (!context) throw new Error("You dun goofed");

  const { fullWarband, setFullWarband } = context;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const downloadWarband = () => {
    const dataStr = JSON.stringify(fullWarband);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const wizard = fullWarband.find((e) => e.role === "Wizard") as Wizard;

    const wizardName = wizard.name;

    const a = document.createElement("a");
    a.href = url;
    a.download = `${wizardName}'s Warband.json`;
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        setFullWarband([]);
        const json = JSON.parse(event.target?.result as string) as Member[];
        setFullWarband(json);
        localStorage.setItem("warband", JSON.stringify(json));
        console.log("Uploaded JSON:", json);
      } catch {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  const onUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const goToWizardMenu = () => {
    if (fullWarband.find((e) => e.role === "Wizard")) {
      router.push("/WizardMenu");
    } else alert("You have no wizard");
  };

  const ClearWarband = () => {
    const confirmed = window.confirm("Are you sure you want to clear warband?");
    if (!confirmed) return;

    setFullWarband([]);
    localStorage.clear();
    setIsOpen(false);
    router.push("/");
  };

  return (
    <nav className="relative flex justify-between items-center px-6 py-4 glass-panel w-full z-50 mb-6">
      <a href="/" className="group">
        <h1 className="font-bold text-white text-3xl tracking-wider group-hover:text-[var(--accent-color)] transition-colors duration-300">
          <span className="hidden sm:inline">FROSTGRAVE MANAGER</span>
          <span className="sm:hidden">FM</span>
        </h1>
      </a>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex gap-2">
          <button
            type="button"
            onClick={() => {
              (goToWizardMenu(), setIsOpen(false));
            }}
            className="px-4 py-2 rounded-lg border border-[var(--glass-border)] text-white hover:bg-white/10 transition-all duration-200"
          >
            Wizard Menu
          </button>
          <button
            type="button"
            onClick={() => {
              (router.push("/YourSpells"), setIsOpen(false));
            }}
            className="px-4 py-2 rounded-lg border border-[var(--glass-border)] text-white hover:bg-white/10 transition-all duration-200"
          >
            Spells
          </button>
        </div>

        {/* Menu Button (Visible on all screens now to access extra options) */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex justify-center items-center w-10 h-10 rounded-lg border border-[var(--glass-border)] text-white hover:bg-white/10 transition-all duration-200"
        >
          &#9776;
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-56 rounded-xl glass-panel overflow-hidden z-50 bg-[#1e293b] border border-white/10 shadow-xl">
            <div className="py-2 text-gray-200" role="menu">
              <div className="md:hidden border-b border-gray-700 mb-2 pb-2">
                <button
                  onClick={() => {
                    goToWizardMenu();
                    setIsOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-sm text-left hover:bg-white/10 hover:text-[var(--accent-color)]"
                >
                  Wizard Menu
                </button>
                <button
                  onClick={() => {
                    router.push("/YourSpells");
                    setIsOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-sm text-left hover:bg-white/10 hover:text-[var(--accent-color)]"
                >
                  Spells
                </button>
              </div>

              <a
                href="/EditSpells"
                className="block px-4 py-2 text-sm text-left hover:bg-white/10 hover:text-[var(--accent-color)]"
                role="menuitem"
              >
                Edit Spells
              </a>
              <a
                href="/WarbandBuilder"
                className="block px-4 py-2 text-sm text-left hover:bg-white/10 hover:text-[var(--accent-color)]"
                role="menuitem"
              >
                Add a Member
              </a>
              <a
                href="/AllSpells"
                className="block px-4 py-2 text-sm text-left hover:bg-white/10 hover:text-[var(--accent-color)]"
                role="menuitem"
              >
                All Spells
              </a>
              <button
                className="block w-full px-4 py-2 text-sm text-left hover:bg-white/10 hover:text-[var(--accent-color)]"
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
                className="block w-full px-4 py-2 text-sm text-left hover:bg-white/10 hover:text-[var(--accent-color)]"
                onClick={onUploadButtonClick}
                role="menuitem"
              >
                Upload Warband
              </button>
              <button
                className="block w-full px-4 py-2 text-sm text-left text-red-400 hover:bg-red-500/10 hover:text-red-300"
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
  );
};

export default Navbar;
