const PgBoss = require('pg-boss');

const boss = new PgBoss('postgres://user:password@localhost:5432/my_database');

boss.on('error', error => console.error(error));

boss.start().then(() => {
    console.log('pg-boss запущен и готов к работе!');
});