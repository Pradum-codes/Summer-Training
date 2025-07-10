function Person(name, age) {
    this.name = name;
    this.age = age;

    this.introduce = function() {
        console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
    };
}

const person1 = new Person("Pradum", 22);
const person2 = new Person("Kumar", 30);

person1.introduce(); // Output: Hi, I'm Alice and I'm 25 years old.
person2.introduce(); // Output: Hi, I'm Bob and I'm 30 years old.
