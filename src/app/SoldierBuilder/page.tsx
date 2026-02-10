"use client";

import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import Gamecodex from "@/assets/Codex.json";
import { Member, MemberProp, Soldier, Wizard } from "@/models/models";
import { MyContext } from "@/context/Context";
import { useRouter } from "next/navigation";
import NameCodex from "@/assets/names.json";

const page = () => {
  const router = useRouter();
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("You aint got no context");
  }

  const { fullWarband, setFullWarband, wizardGold, setWizardGold } = context;

  const [selectedSoldier, setSelectedSoldier] = useState<Soldier | null>(null);
  const [soldierCodexList, setSoldierCodexList] = useState<Soldier[] | null>(
    null,
  );

  useEffect(() => {
    const rawSoldiers = Gamecodex.soldiers;

    const convertedSoldiers: Soldier[] = rawSoldiers.map((s) => ({
      name: s.name,
      role: s.class,
      move: s.move,
      fight: s.fight,
      shoot: s.shoot,
      armour: s.armour,
      will: s.will,
      health: s.health,
      items: s.gear,
      notes: s.notes,
      type: s.type,
      cost: s.cost,
    }));

    setSoldierCodexList(convertedSoldiers);
  }, []);

  useEffect(() => {
    if (!fullWarband || fullWarband.length === 0) return;

    const wizard = fullWarband.find((member) => member.role === "Wizard");
    if (!wizard) return;

    const rawSoldiers = Gamecodex.soldiers;

    const convertedSoldiers: Soldier[] = rawSoldiers.map((s) => ({
      name: s.name,
      role: s.class,
      move: s.move,
      fight: s.fight,
      shoot: s.shoot,
      armour: s.armour,
      will: s.will,
      health: s.health,
      items: s.gear,
      notes: s.notes,
      type: s.type,
      cost: s.cost,
    }));

    setSoldierCodexList(convertedSoldiers);
  }, [fullWarband]);

  const handleSelectSoldier = (e: ChangeEvent<HTMLSelectElement>) => {
    const chosen: Soldier = JSON.parse(e.target.value);
    const randomName = NameCodex.names[randomNumberGen() - 1];
    setSelectedSoldier({ ...chosen, name: randomName });
  };

  const randomName = () => {
    return NameCodex.names[randomNumberGen() - 1];
  };

  const randomNumberGen = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const specialists = fullWarband.filter(
      (member): member is Soldier =>
        "type" in member && member.type === "Specialist",
    );

    console.log(specialists.length);

    if (specialists.length >= 4) {
      alert("You have too many specialists. Max 4 ");
      return;
    }

    if (selectedSoldier && wizardGold >= selectedSoldier.cost) {
      const change = wizardGold - selectedSoldier.cost;
      const wizard = fullWarband.find(
        (member) => member.role === "Wizard",
      ) as Wizard;

      const updatedWizard = {
        ...wizard,
        gold: change,
      };

      const updatedWarband = fullWarband.map((m) =>
        m.role === "Wizard" ? updatedWizard : m,
      );

      const finalWarband = [...updatedWarband, selectedSoldier];

      console.log(updatedWarband);

      console.log(change);

      setFullWarband(finalWarband);
      setWizardGold(change);

      localStorage.setItem("warband", JSON.stringify(finalWarband));
      setSelectedSoldier((prev) =>
        prev ? { ...prev, name: randomName() } : null,
      );
    } else {
      alert("Not enough gold");
      return;
    }
  };

  const handleReturn = () => {
    router.back();
  };

  return (
    <main className="min-h-screen w-full pb-20 px-4 flex flex-col items-center">
      <form
        className="glass-panel p-6 rounded-xl flex flex-col w-full max-w-4xl space-y-6 mt-8"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center border-b border-white/10 pb-4">
          <h2 className="text-2xl font-bold text-white">Recruit Soldier</h2>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Treasury:</span>
            <span className="text-xl font-bold text-yellow-400">
              {wizardGold} gc
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <label className="block text-slate-300 mb-2 text-sm font-semibold uppercase tracking-wider">
              Select Class
            </label>
            <select
              name="soldier"
              className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--accent-color)] transition-colors"
              required
              onChange={(e) => handleSelectSoldier(e)}
            >
              {!selectedSoldier ? (
                <option value="" className="text-black">
                  Select Soldier Type
                </option>
              ) : null}

              {soldierCodexList?.length !== 0 ? (
                soldierCodexList?.map((soldier) => (
                  <option
                    key={soldier.role}
                    value={JSON.stringify(soldier)}
                    className="text-black"
                  >
                    {soldier.role} ({soldier.cost} gc)
                  </option>
                ))
              ) : (
                <option value="" className="text-black">
                  No soldiers available
                </option>
              )}
            </select>

            {selectedSoldier && (
              <div className="mt-4">
                <label className="block text-slate-300 mb-2 text-sm font-semibold uppercase tracking-wider">
                  Soldier Name
                </label>
                <input
                  className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[var(--accent-color)] transition-colors"
                  type="text"
                  placeholder="Enter Name"
                  name="soldierName"
                  value={selectedSoldier?.name ?? ""}
                  onChange={(e) =>
                    setSelectedSoldier((prev) =>
                      prev ? { ...prev, name: e.target.value } : null,
                    )
                  }
                  required
                />
              </div>
            )}
          </div>

          {selectedSoldier && (
            <div className="w-full md:w-1/2 bg-white/5 rounded-xl p-4 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">
                {selectedSoldier.role}
              </h3>

              <div className="grid grid-cols-5 gap-2 mb-4">
                <div className="text-center bg-black/20 rounded p-2">
                  <div className="text-xs text-slate-400 uppercase">Move</div>
                  <div className="font-bold text-white">
                    {selectedSoldier.move}
                  </div>
                </div>
                <div className="text-center bg-black/20 rounded p-2">
                  <div className="text-xs text-slate-400 uppercase">Fight</div>
                  <div className="font-bold text-white">
                    {selectedSoldier.fight}
                  </div>
                </div>
                <div className="text-center bg-black/20 rounded p-2">
                  <div className="text-xs text-slate-400 uppercase">Shoot</div>
                  <div className="font-bold text-white">
                    {selectedSoldier.shoot}
                  </div>
                </div>
                <div className="text-center bg-black/20 rounded p-2">
                  <div className="text-xs text-slate-400 uppercase">Armor</div>
                  <div className="font-bold text-white">
                    {selectedSoldier.armour}
                  </div>
                </div>
                <div className="text-center bg-black/20 rounded p-2">
                  <div className="text-xs text-slate-400 uppercase">Will</div>
                  <div className="font-bold text-white">
                    {selectedSoldier.will}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">Health</span>
                  <span className="text-white font-bold">
                    {selectedSoldier.health}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">Cost</span>
                  <span className="text-[var(--accent-color)] font-bold">
                    {selectedSoldier.cost} gc
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">Type</span>
                  <span className="text-white">{selectedSoldier.type}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Gear</span>
                  <span className="text-slate-200 italic">
                    {selectedSoldier.items}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4 justify-end pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 rounded-lg border border-white/10 text-white hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!selectedSoldier}
            className="px-6 py-2 rounded-lg bg-[var(--accent-color)] text-slate-900 font-bold hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-[var(--accent-color)]/20"
          >
            Recruit Soldier
          </button>
        </div>
      </form>

      {fullWarband.length !== 0 && (
        <div className="w-full max-w-6xl mt-8">
          <h3 className="font-bold text-xl text-white mb-4 pl-2 border-l-4 border-[var(--accent-color)]">
            Current Warband ({fullWarband.length})
          </h3>
          <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {fullWarband.map((member, idx) => (
              <li
                key={idx}
                className="glass-panel p-4 rounded-xl border border-white/5 hover:border-[var(--accent-color)]/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-white text-lg">
                    {member.name}
                  </h4>
                  <span className="text-xs font-semibold bg-white/10 px-2 py-0.5 rounded text-[var(--accent-color)]">
                    {member.role}
                  </span>
                </div>

                {"move" in member && (
                  <div className="grid grid-cols-5 gap-1 text-center mt-3">
                    <div className="bg-black/20 rounded p-1">
                      <div className="text-[10px] text-slate-400">M</div>
                      <div className="text-xs font-bold text-white">
                        {member.move}
                      </div>
                    </div>
                    <div className="bg-black/20 rounded p-1">
                      <div className="text-[10px] text-slate-400">F</div>
                      <div className="text-xs font-bold text-white">
                        {member.fight}
                      </div>
                    </div>
                    <div className="bg-black/20 rounded p-1">
                      <div className="text-[10px] text-slate-400">S</div>
                      <div className="text-xs font-bold text-white">
                        {member.shoot}
                      </div>
                    </div>
                    <div className="bg-black/20 rounded p-1">
                      <div className="text-[10px] text-slate-400">A</div>
                      <div className="text-xs font-bold text-white">
                        {member.armour}
                      </div>
                    </div>
                    <div className="bg-black/20 rounded p-1">
                      <div className="text-[10px] text-slate-400">H</div>
                      <div className="text-xs font-bold text-white">
                        {member.health}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};

export default page;
