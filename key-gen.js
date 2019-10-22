const NodeRSA = require('node-rsa');
const fs = require('fs');
const argv = require('yargs').argv;

function generateKeyPair() {

    // bits / key size - https://en.wikipedia.org/wiki/Key_size#Asymmetric_algorithm_key_lengths
    const key = new NodeRSA({b:512});

    // advanced options - https://github.com/rzcoder/node-rsa/wiki/Advanced-options
    // key.setOptions({        
    // })

    key.generateKeyPair();

    return key.exportKey('pkcs1-pem');
}

function createJWKS (pemFilePath) {

    const keyPem = generateKeyPair();
    console.log(`Key generated: ${keyPem}`);

    console.log('');

    fs.writeFile(pemFilePath, keyPem, err => {
        if (err) {
            return console.error(err);
        }
        console.log(`PEM file created: ${pemFilePath}`);
    });
}

const outputFile = argv.o; 
if (!outputFile) {
    return console.log(`Require Out file location! 
Usage example:
node key-gen.js -o my-private-key.pem
    o : output file path
`)
}

createJWKS(outputFile);