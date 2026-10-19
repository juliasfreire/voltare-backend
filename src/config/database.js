const mysql = require("mysql2/promise")

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port:process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,

    ssl:{
        rejectUnauthorized: false
    },

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports = db;