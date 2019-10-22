const jose = require('node-jose');
const fs = require('fs');
const util = require('util');
const fsReadPromise = util.promisify(fs.readFile);

async function initiateKeyStore(pemFiles) {

    const keystore = jose.JWK.createKeyStore();

    if (!pemFiles) {
        return keystore;
    }

    await pemFiles.reduce(async (acc, file) => {
        const data = await fsReadPromise(file);
        return keystore.add(data, 'pem');
    }, Promise.resolve());

    // todo: delete / comment next line
    // console.log(`${JSON.stringify(keystore.toJSON(), null, 4)}`);

    return keystore;
}

class KeyStore {

    async initiate(pemFiles) {
        this.keyStore = await initiateKeyStore(pemFiles);
    }

    // Return the public keys of the keystore as a JWK-set:
    getKeysetJson () {
        return JSON.stringify(this.keyStore.toJSON(), null, 2);
    }

    getKeybyId() {
        //
    }
}

module.exports = KeyStore;

// Uncomment to test
/*
(async function test() {
    let ks = new KeyStore();
    await ks.initiate(['keys/my-private-key.pem']);

    console.log(`Done!`);
    console.log(`${ks.getKeysetJson()}`);
})();
*/

