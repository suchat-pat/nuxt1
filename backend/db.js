const mysql = require('mysql2')
const pool = mysql.createPool({
    host:'mysql',
    user:'root',
    password:'1234',
    database:'nuxt1',
    dateStrings: true,
    timezone: '+07:00',
})

module.exports = pool.promise()