const connect = require('connect');
const serveStatic = require('serve-static');

const PORT=8080;

connect().use(serveStatic(__dirname+'/src')).listen(PORT, () => {
    console.log(`Frontend server running on ${PORT}...`);
});