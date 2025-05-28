'use client';

import Image from "next/image";
import MemberCard from "./components/wizardcard"
import { useRouter } from "next/navigation";
import { MyContext } from "./context/Context";
import { useContext } from "react";

export default function Home() {
  const router = useRouter();
  const context = useContext(MyContext)

  if (!context) {
    throw new Error("MyContext must be used within a MyProvider");
  }

  const { fullWarband } = context
  const goToCreatePage = () => {
    router.push('/WarbandBuilder')
  }


  return (
    <>
      <main className="max-h-lvh max-w-screen">
        <div className={`${fullWarband.length === 0 ? 'flex-col' : 'flex'} flex  flex-wrap justify-center items-center border-black p-4 gap-5 text-xl font-bold max-w-screen`}>
          {fullWarband.length === 0 ? <div className="flex-col align-middle justify-center text-center"><h1>Frostgrave Warband Manager</h1> <p>Press the + button to create members</p></div> : fullWarband.map((member, index) => (
            <MemberCard key={member.name || index} member={member}></MemberCard>
          ))}
          <button onClick={goToCreatePage} className="bg-blue-300 rounded-2xl h-8 w-8 items-center justify-center flex hover:opacity-80 hover:cursor-pointer"><p className="align-middle text-lg">+</p></button>

        </div>

      </main>
    </>
  );
}

