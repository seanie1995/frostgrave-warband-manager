'use client';

import Image from "next/image";
import WizardCard from "./components/wizardcard"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const goToCreatePage = () => {
    router.push('/WarbandBuilder')
  }


  return (
    <>
      <main className="max-h-lvh max-w-screen">
        <div className="flex flex-wrap justify-center items-center border-black p-4 gap-5 text-xl font-bold max-w-screen">
          <WizardCard />
          <button onClick={goToCreatePage} className="bg-blue-300 rounded-2xl h-8 w-8 items-center justify-center flex hover:opacity-80 hover:cursor-pointer"><p className="align-middle text-lg">+</p></button>

        </div>

      </main>
    </>
  );
}

