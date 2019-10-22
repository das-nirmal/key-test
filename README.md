# Key Generator (key-gen.js)
```
node key-gen -o <output-pem-file>
```

Example
```
node key-gen -o 'keys/my-private-key.pem'
```
# Key Store (index.js)

```
const pemFiles = ['keys/my-private-key.pem'];

const KeyStore = require('./key-store);

let ks = new KeyStore();
await ks.initiate(pemFiles);

// output jwk set
console.log(`${ks.getKeysetJson()}`);
```