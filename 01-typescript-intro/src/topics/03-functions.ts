
function addNumbers(a: number,b:number):number  {
    return a + b
}
const result: number = addNumbers(1,2)

const addNumbersArrow = (a:number, b: number):number =>{
    return a + b
}
const resultArrow:number = addNumbersArrow(1,2)

interface Character {
    name: string,
    hp: number,
    showHp: () => void,
} 
const healCharacter = ( character: Character, amount: number) =>{
    character.hp += amount;
}
const strider: Character = {
    name: 'strider',
    hp: 50,
    showHp() {
        console.log( `puntos de vida ${this.hp}`)
    }
}
healCharacter(strider, 10)


interface Address {
    calle: string,
    pais: string,
    ciudad: string
}

interface SuperHero {
    name: string,
    age: number,
    address: Address,
    showAddress: () => string
}

const superHeroe: SuperHero = {
    name: 'Spiderman',
    age: 30,
    address: {
        calle: 'Main St',
        pais: 'USA',
        ciudad: 'NY'
    },
    showAddress() {
        return this.name + ', ' + this.address.ciudad
    },
}

export {}