const net = require('node:net')
const readline = require('node:readline')

const client = new net.Socket()
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

client.connect(4000, '127.0.0.1', () => {
    console.log('conectou', process.pid)

    rl.addListener('line', (line) => {
        console.log('► line:', line)
        const options = { message: line, data: new Date() }
        const texto = JSON.stringify(options)
        client.write(texto)
    })
})

function gracefulShutdown(code) {
    console.info(`Received ${code || 'unknown'} signal in process ${process.pid}`);
    client.end()
    process.exit(1)
}

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
process.on("exit", () => gracefulShutdown('exit'));

