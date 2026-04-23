

let skill: string[] = ['bash', 'counter']

interface Character {
    name: string;
    age: number;
    skills: string[],
    hometown?: string | undefined
}

const strider: Character = {
    name: 'Strider',
    age: 100,
    skills: ['bash', 'charge'],
}
