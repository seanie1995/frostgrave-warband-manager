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
      <main className="flex min-h-screen">
        <div className=" border-black p-4 flex flex-col gap-5 text-xl font-bold">
          <WizardCard></WizardCard>
        </div>
      </main>
    </>
  );
}

