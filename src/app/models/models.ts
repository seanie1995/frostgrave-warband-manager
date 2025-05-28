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
    school: string;
    spells: (Spell | null)[];
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
    school: string;
    role: "Wizard";
    spells: (Spell | null)[];
    move: number;
    fight: number;
    shoot: number;
    armour: number;
    will: number;
    health: number;
    items: string;
    notes: string;
    experience: number;
    level: number;
    gold: number;
}

export interface Item {
    name: string;
}

export interface Spell {
    name: string;
    school: number;
    description: string;
    targetNumber: number;
    type: string;
}

export interface School {
    id: number;
    name: string;
    aligned: number[];
    neutral: number[]
}

export interface MemberProp {
    member: Member;
}

export type Member = Soldier | Apprentice | Wizard;

export type MemberOrMembers = Member | Member[];