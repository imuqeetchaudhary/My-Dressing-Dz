const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const secretKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

const decrypt = (text) => {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(text.iv, 'hex'));
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(text.password, 'hex')), decipher.final()]);
    return decrpyted.toString();
};

module.exports = {
    encrypt,
    decrypt
};