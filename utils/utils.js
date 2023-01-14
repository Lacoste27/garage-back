/**
 * Get a hash from the password.
 */
var crypto = require('crypto');

function GetSalt(){
    return crypto.randomBytes(16).toString('hex');
}

function GetHash(password, salt){  
    return crypto.pbkdf2Sync(password,salt,
        1000, 64, `sha512`).toString(`hex`);
}

function VerifyPassword(user ,password) {
    const user_hash = crypto.pbkdf2Sync(password, 
        user.salt, 1000, 64, `sha512`).toString(`hex`);
    return user_hash == user.password;
}

module.exports = {    
    GetHash: GetHash,
    GetSalt :GetSalt,
    VerifyPassword : VerifyPassword
}