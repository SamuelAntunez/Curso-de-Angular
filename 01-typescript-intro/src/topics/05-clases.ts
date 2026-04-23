
export class Person {

    public name: string;
    public address: string;

    constructor(name: string, address: string) { 
        this.name = name
        this.address = address
    }
}


export class Hero{

    constructor ( 
        public alterEgo: string, 
        public age: number,
        public person: Person,
    ) { }
}
const juan = new Person('Juan', 'new york')
const hero = new Hero('AlterEgo', 45, juan)