const crypto = require('crypto');
const ALGO = 'aes-256-ctr';
const KEY = '87483a824d63a747d039fb4a6825378a';
const IV = 'b722a286eb0ec8ed';

export const encrypt = (text: string): string => {
    const cipher = crypto.createCipheriv(ALGO, KEY, IV);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

export const decrypt = (text: string): string => {
    const decipher = crypto.createDecipheriv(ALGO, KEY, IV);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

export default { encrypt, decrypt };
