class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    sayHello() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

const user1 = new Person("Pradum", 21);
user1.sayHello();  // Output: Hello, my name is Pradum and I am 21 years old.
