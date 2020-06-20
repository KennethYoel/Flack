// Template for roll results
//const template = Handlebars.compile("<li>You rolled a {{value}}</li>");

// Grab the source.
const source = document.querySelector('#result').innerHTML;

// Compile it using Handlebars.
const template = Handlebars.compile(source);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#roll').onclick = () => {

        // Generate random rolls.
        const counter = parseInt(document.querySelector('#counter').value);
        const rolls = [];
        let total = 0;
        for (let i = 0; i < counter; i++) {
            const value = Math.floor(Math.random() * 6) + 1;
            rolls.push(value);
        total += value;
        };

        // Add roll result to DOM.
        const content = template({values: rolls, total: total});
        console.log(template({'values': roll}));
        document.querySelector('#rolls').innerHTML += content;
    };
});