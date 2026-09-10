function generateUsername() {
    return `ketty_${Date.now()}`;
}

function generatePassword() {
    return "Password@123";
}

module.exports = {
    generateUsername,
    generatePassword
};