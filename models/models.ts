// types.ts
export interface Soldier {

    name: string;
    role: string;
    move: number;
    fight: number;
    shoot: number;
    armour: number;
    will: number;
    health: number;
    items: string;
    notes: string;

}

export interface Apprentice {
    name: string;
    role: "Apprentice";
    level: number;
    experience: number;
    move: number;
    fight: number;
    shoot: number;
    armour: number;
    will: number;
    health: number;
    items: string;
    notes: string;
}

export interface Wizard {
    name: string;
    role: "Wizard";
    move: number;
    fight: number;
    shoot: number;
    armour: number;
    will: number;
    health: number;
    items: string;
    notes: string;

}

export type Member = Soldier | Apprentice | Wizard;
