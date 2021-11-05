const path = require('path');
const fs = require('fs'); 
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });

fs.writeFile(
    path.join(__dirname, 'text.txt'),
    '',
    (err) => {
        if (err) throw err;
    }
);

output.write('Enter some text \n');

rl.on('line', (input) => {
    if (input == 'exit') {
        process.exit();
    } 
        fs.appendFile(
            path.join(__dirname, 'text.txt'),
            `${input}\n`,
            err => {
                if (err) throw err;
            }
        );
    
});


process.on('exit', () => output.write('Thank you for your answer. \n'));







