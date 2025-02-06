const crypto = require("crypto");

class AuthService {
    constructor() {
        this.users = {};
    }

    hashPassword(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }

    generateToken() {
        return crypto.randomBytes(16).toString('hex');
    }

    register(username, password) {
        if (this.users[username]) return false; // Username already exists
        let passwordHash = this.hashPassword(password);
        this.users[username] = { passwordHash, token: null };
        return true;
    }

    login(username, password) {
        let user = this.users[username];
        if (!user || user.passwordHash !== this.hashPassword(password)) return null;
        let token = this.generateToken();
        user.token = token;
        return token;
    }

    logout(username) {
        if (!this.users[username]) return false;
        this.users[username].token = null;
        return true;
    }

    isAuthenticated(username, token) {
        return this.users[username] && this.users[username].token === token;
    }
}

// Test Cases

let auth = new AuthService();
auth.register('user1', 'password');
let token = auth.login('user1', 'password');
console.log(token); // Should print a token
console.log(auth.isAuthenticated("user1", token)); // true
auth.logout("user1");
console.log(auth.isAuthenticated("user1", token)); // false
