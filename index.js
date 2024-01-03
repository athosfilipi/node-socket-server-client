const net = require('node:net');

const handleConnection = (socket) => {
    console.log('Someone connected.');

    socket.on('end', () => {
        console.log('Someone disconnected. [end]');
        // console.log('Someone disconnected.', socket);
    });

    socket.on('close', () => {
        console.log('Someone disconnected. [close]');
        // console.log('Someone disconnected.', socket);
    });

    socket.on('error', err => {
        console.error('Socket error:', err.message);
    });

    socket.on('data', (buffer) => { 
        const jsonText = buffer.toString();
        const dataObj = JSON.parse(jsonText)
        
        console.log(dataObj)
        console.log(dataObj.data)
        console.log('► data: ',dataObj.message)
        
    })
};

const server = net.createServer(handleConnection);

const handleServerListening = () => {
    console.log('Socket was started at port 4000', process.pid);
};

server.listen(4000, '127.0.0.1', handleServerListening);

function gracefulShutdown(code) {
    console.info(`Received ${code || 'unknown'} signal in process ${process.pid}`);
    process.exit(1)
}

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
process.on("exit", () => gracefulShutdown('exit'));