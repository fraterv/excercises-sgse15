class Greeter {
    constructor(message) {
        this.message = message;
    }

    greet() {
        let element = document.querySelector('#output');
        element.textContent = this.message;
    }
}

function exec() {
    let greeter = new Greeter('Hello World!');
    greeter.greet();
}
