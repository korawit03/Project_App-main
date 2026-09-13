const db = require("./db");
const bcrypt = require("bcryptjs");
async function createUser() {
    const username = "alice";
    const password = "alice";
    const fullname = "Alice Johnson";
    const hash = await bcrypt.hash(password, 10);
    await db.query(
        "INSERT INTO users (username, password, fullname) VALUES ($1, $2, $3)",
        [username, hash, fullname]
    );
    console.log("User created");
    process.exit();
}
createUser();