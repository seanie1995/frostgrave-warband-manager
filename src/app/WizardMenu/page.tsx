"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { Member, MemberProp, Wizard, Apprentice, Spell } from "@/models/models";
import { MyContext } from "@/context/Context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import Gamecodex from "@/assets/Codex.json";

const WizardPage = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("MyContext must be used within a provider");
  }
  const router = useRouter();
  const { fullWarband, setFullWarband } = context;

  const [wizard, setWizard] = useState<Wizard | null>(null);
  const [wizardSpells, setWizardSpells] = useState<Spell[] | null>([]);
  const [spellList, setSpellList] = useState<Spell[] | null>([]);
  const [addSpellModal, setAddSpellModal] = useState<boolean>(false);
  const [chosenSpell, setChosenSpell] = useState<Spell | null>(null);
  const [deleteSpellMode, setDeleteSpellMode] = useState<boolean>(false);

  useEffect(() => {
    if (!fullWarband || fullWarband.length === 0) return;
    const found = fullWarband.find((e) => e.role === "Wizard") as Wizard;
    if (!found) return;

    try {
      const foundSpells = found?.spells as Spell[];
      const selectableSpells = Gamecodex.spells.filter(
        (s) => !foundSpells.some((existing) => existing.name === s.name),
      );

      const updatedTargetNumberSpells = ModifyTargetNumbers(selectableSpells);

      const sortedSpells = updatedTargetNumberSpells.sort((a, b) =>
        a.schoolName.localeCompare(b.schoolName),
      );

      setChosenSpell(sortedSpells[0]);
      setSpellList(sortedSpells);
      setWizardSpells(foundSpells);
      setWizard(found);
    } catch (e) {
      alert(e);
    }
  }, [fullWarband]);

  const ModifyTargetNumbers = (Spells: Spell[]) => {
    const schoolName = wizard?.school;
    const school = Gamecodex.schools.find((s) => s.name === schoolName);

    const updatedSpells = Spells.map((spell) => {
      let newTargetNumber = spell.targetNumber;

      if (school?.aligned.includes(spell.school)) {
        newTargetNumber += 2;
      } else if (school?.neutral.includes(spell.school)) {
        newTargetNumber += 4;
      } else if (school?.opposed.includes(spell.school)) {
        newTargetNumber += 6;
      }

      return {
        ...spell,
        targetNumber: newTargetNumber,
      };
    });

    return updatedSpells;
  };

  const handleAddSpell = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    let updatedSpells;

    if (chosenSpell) {
      updatedSpells = wizardSpells?.concat(chosenSpell);

      if (updatedSpells) {
        setWizardSpells(updatedSpells);
      }
    } else {
      throw new Error();
    }
  };

  const handleDeleteSpell = (spellName: string) => {
    if (!wizardSpells) return;

    var updatedWizardSpells = wizardSpells?.filter((e) => e.name !== spellName);

    setWizardSpells(updatedWizardSpells);
    setDeleteSpellMode(false);
    alert("Don't forget to press save");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    try {
      var updatedWizard = wizard;

      if (updatedWizard) {
        updatedWizard.spells = wizardSpells ?? [];
      }

      const updatedWarband = fullWarband.map((w) =>
        w.name === updatedWizard?.name ? updatedWizard : w,
      );

      console.log(updatedWizard);

      setFullWarband(updatedWarband);

      localStorage.setItem("warband", JSON.stringify(updatedWarband));
      setDeleteSpellMode(false);
      setAddSpellModal(false);
      alert("Changes saved successfuly");
    } catch (ex) {
      alert(ex);
    }
  };

  return (
    <main className="min-h-screen w-full pb-20 px-4 flex flex-col items-center">
      <form
        className="glass-panel p-6 rounded-xl shadow-md w-full max-w-4xl mt-8 space-y-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-white text-center">
          Your Wizard
        </h1>

        <input
          type="text"
          name="wizardName"
          placeholder="Name"
          required
          className="bg-black/30 border border-white/20 rounded w-full px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-[var(--accent-color)]"
          value={wizard?.name || ""}
          onChange={(e) =>
            setWizard((prev) =>
              prev ? { ...prev, name: e.target.value } : null,
            )
          }
        />
        <h2 className="text-lg font-bold text-slate-300">
          School:{" "}
          <span className="text-[var(--accent-color)]">{wizard?.school}</span>
        </h2>
        <div className="flex max-w-full">
          <div className="flex gap-6 flex-col w-full">
            <div className="gap-3 flex flex-wrap">
              <div className="flex flex-col gap-2">
                <label className="font-bold text-slate-300">Level</label>
                <input
                  type="number"
                  required
                  className="bg-black/30 border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                  onChange={(e) =>
                    setWizard((prev) =>
                      prev ? { ...prev, level: Number(e.target.value) } : null,
                    )
                  }
                  value={wizard?.level || ""}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-slate-300">Exp</label>
                <input
                  type="number"
                  required
                  className="bg-black/30 border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                  onChange={(e) =>
                    setWizard((prev) =>
                      prev
                        ? { ...prev, experience: Number(e.target.value) }
                        : null,
                    )
                  }
                  value={wizard?.experience || 0}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-slate-300">Gold</label>
                <input
                  type="number"
                  required
                  className="bg-black/30 border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                  onChange={(e) =>
                    setWizard((prev) =>
                      prev ? { ...prev, gold: Number(e.target.value) } : null,
                    )
                  }
                  value={wizard?.gold || "0"}
                />
              </div>
            </div>
            {/* STAT LINE */}
            <div className="flex flex-wrap gap-3">
              <div className="flex flex-col gap-2">
                <label className="font-bold text-slate-300">Move</label>
                <input
                  type="number"
                  className="bg-black/30 border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                  required
                  onChange={(e) =>
                    setWizard((prev) =>
                      prev ? { ...prev, move: Number(e.target.value) } : null,
                    )
                  }
                  value={wizard?.move || 0}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-slate-300">Fight</label>
                <input
                  type="number"
                  className="bg-black/30 border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                  required
                  onChange={(e) =>
                    setWizard((prev) =>
                      prev ? { ...prev, fight: Number(e.target.value) } : null,
                    )
                  }
                  value={wizard?.fight || 0}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-slate-300">Shoot</label>
                <input
                  type="number"
                  className="bg-black/30 border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                  required
                  onChange={(e) =>
                    setWizard((prev) =>
                      prev ? { ...prev, shoot: Number(e.target.value) } : null,
                    )
                  }
                  value={wizard?.shoot || 0}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-slate-300">Armor</label>
                <input
                  type="number"
                  className="bg-black/30 border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                  required
                  onChange={(e) =>
                    setWizard((prev) =>
                      prev ? { ...prev, armour: Number(e.target.value) } : null,
                    )
                  }
                  value={wizard?.armour || 0}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-slate-300">Will</label>
                <input
                  type="number"
                  className="bg-black/30 border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                  required
                  onChange={(e) =>
                    setWizard((prev) =>
                      prev ? { ...prev, will: Number(e.target.value) } : null,
                    )
                  }
                  value={wizard?.will || 0}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-slate-300">Health</label>
                <input
                  type="number"
                  className="bg-black/30 border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)]"
                  required
                  onChange={(e) =>
                    setWizard((prev) =>
                      prev ? { ...prev, health: Number(e.target.value) } : null,
                    )
                  }
                  value={wizard?.health || 0}
                />
              </div>
            </div>
            {/* ITEMS AND NOTES */}
            <div className="flex flex-col gap-2">
              <label className="font-bold text-slate-300">Items</label>
              <input
                type="text"
                name="items"
                placeholder="Items"
                className="bg-black/30 border border-white/20 rounded px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-[var(--accent-color)]"
                onChange={(e) =>
                  setWizard((prev) =>
                    prev ? { ...prev, items: e.target.value } : null,
                  )
                }
                value={wizard?.items || ""}
              />
              <label className="font-bold text-slate-300">Notes</label>
              <input
                type="text"
                name="notes"
                placeholder="Notes"
                className="bg-black/30 border border-white/20 rounded px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-[var(--accent-color)]"
                onChange={(e) =>
                  setWizard((prev) =>
                    prev ? { ...prev, notes: e.target.value } : null,
                  )
                }
                value={wizard?.notes || ""}
              />
            </div>
            {/* ALL SPELLS */}
            <div>
              <label htmlFor="" className="font-bold text-slate-300">
                {wizard?.name}'s Spells
              </label>
              <ul className="flex flex-row gap-4 flex-wrap mt-2">
                {!wizardSpells ? (
                  <p className="text-slate-400">No Spells</p>
                ) : (
                  wizardSpells.map((spells) => (
                    <li
                      className="bg-white/5 border border-white/10 p-2 rounded font-bold flex text-white"
                      key={spells.name}
                      value={spells.name}
                    >
                      {spells.name} - {spells.targetNumber} |{" "}
                      {spells.targetNumber + 2}
                      {deleteSpellMode ? (
                        <button
                          onClick={() => handleDeleteSpell(spells.name)}
                          className="bg-red-600 px-2 ml-2 rounded-md hover:cursor-pointer hover:bg-red-400"
                        >
                          X
                        </button>
                      ) : null}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
        {addSpellModal ? (
          <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
            <p className="pb-2 font-bold text-white">Choose Spell</p>
            <select
              name="spell"
              value={chosenSpell ? JSON.stringify(chosenSpell) : ""}
              className="bg-black/30 border border-white/20 rounded px-3 py-2 text-white focus:outline-none focus:border-[var(--accent-color)] min-w-[200px]"
              onChange={(e) => setChosenSpell(JSON.parse(e.target.value))}
            >
              {spellList?.map((spell) => (
                <option
                  value={JSON.stringify(spell)}
                  key={spell.name}
                  className="text-black"
                >
                  {spell.name} - {spell.schoolName} - {spell.targetNumber} |{" "}
                  {spell.targetNumber + 2}
                </option>
              ))}
            </select>
            <button
              className="min-w-20 rounded-md px-4 py-2 hover:bg-green-600 hover:cursor-pointer bg-green-700 ml-2 text-white transition-colors"
              onClick={handleAddSpell}
            >
              Add
            </button>
          </div>
        ) : null}
        <div className="flex flex-row gap-2 flex-wrap">
          <button
            type="submit"
            className="min-w-20 rounded-md px-4 py-2 hover:bg-[var(--accent-hover)] hover:cursor-pointer bg-[var(--accent-color)] text-slate-900 font-bold transition-colors"
          >
            Save
          </button>
          <button
            onClick={(e) => setAddSpellModal((prev) => !prev)}
            type="button"
            className="rounded-md px-4 py-2 hover:bg-white/20 hover:cursor-pointer bg-white/10 border border-white/20 text-white transition-colors"
          >
            Add Spells
          </button>
          <button
            onClick={(e) => setDeleteSpellMode((prev) => !prev)}
            type="button"
            className="rounded-md px-4 py-2 hover:bg-red-500 hover:cursor-pointer bg-red-600 text-white transition-colors"
          >
            Remove Spells
          </button>
          <button
            onClick={(e) => router.push("/EditSpells")}
            type="button"
            className="rounded-md px-4 py-2 hover:bg-white/20 hover:cursor-pointer bg-white/10 border border-white/20 text-white transition-colors"
          >
            Modify Spells
          </button>
        </div>
      </form>
    </main>
  );
};

export default WizardPage;
