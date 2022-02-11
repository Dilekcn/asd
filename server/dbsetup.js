const fs = require("fs");
const { Pool } = require("pg");

const dbUrl = process.env.DATABASE_URL || "postgres://localhost:5432/asd";

const pool = new Pool({
	connectionString: dbUrl,
	connectionTimeoutMillis: 5000,
	ssl: /localhost|192.168./ig.test(dbUrl) ? false : { rejectUnauthorized: false },
});

const dbScript = fs.readFileSync("./server/dbsetup.sql").toString();

pool.query(dbScript)
    .then(() => console.info("running db restore script..."))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });