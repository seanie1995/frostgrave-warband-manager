# Frostgrave Warband Manager

A **Next.js (React + TypeScript)** web app for managing your *Frostgrave* warbands.  
Keep track of your wizard, apprentice, soldiers, spells, equipment, and more — all in one place.

About Frostgrave

Frostgrave is a fantasy skirmish wargame by Joseph A. McCullough, published by Osprey Games.
This project is a fan-made companion app and is not affiliated with or endorsed by Osprey Games.

---

## ✨ Features

- 📖 Create and manage multiple **warbands**  
- 🧙 Track **wizard** and **apprentice** stats  
- ⚔️ Add, edit, and remove **soldiers** with their gear  
- ✨ Manage known **spells** for your wizard and apprentice  
- 💰 Keep track of **gold, items, and resources**  
- 📤 Export and 📥 import warbands as **JSON** for easy sharing or backup  
- 💾 All data stored **locally in your browser** (no account or server needed)  

---

## 🚀 Tech Stack

- [Next.js](https://nextjs.org/) – React framework  
- [TypeScript](https://www.typescriptlang.org/) – Type safety  
- [Tailwind CSS](https://tailwindcss.com/) – Styling  
- Local storage / JSON – Persistent data without a backend  

---

## 📂 Project Structure
├── public/ # Static assets
├── src/app/ # App source code
│ ├── components/ # Reusable UI components
│ ├── lib/ # Utility functions, data helpers
│ └── pages/ # Page routes
├── next.config.ts # Next.js configuration
├── tsconfig.json # TypeScript configuration
├── package.json # Dependencies & scripts
└── README.md # This file


---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (comes with Node)

### Installation
```bash
# Clone the repository
git clone https://github.com/seanie1995/frostgrave-warband-manager.git

# Enter the project folder
cd frostgrave-warband-manager

# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
