#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Telegram Mini App deployment with tmole...\n');

// Start the local server
console.log('📡 Starting local development server...');
const server = spawn('npm', ['run', 'dev'], {
    stdio: 'pipe',
    shell: true
});

server.stdout.on('data', (data) => {
    console.log(`Server: ${data.toString().trim()}`);
});

server.stderr.on('data', (data) => {
    console.log(`Server: ${data.toString().trim()}`);
});

// Wait a bit for server to start, then start tmole
setTimeout(() => {
    console.log('\n🌐 Creating public HTTPS tunnel with tmole...');
    
    const tmole = spawn('tmole', ['8080'], {
        stdio: 'inherit',
        shell: true
    });

    tmole.on('error', (err) => {
        if (err.code === 'ENOENT') {
            console.log('\n❌ tmole not found. Install it with:');
            console.log('   npm install -g tmole');
            console.log('\nThen run this script again.');
        } else {
            console.error('Error starting tmole:', err);
        }
        process.exit(1);
    });

    // Handle cleanup
    process.on('SIGINT', () => {
        console.log('\n🛑 Shutting down...');
        server.kill();
        tmole.kill();
        process.exit(0);
    });

}, 3000);

console.log('\n📋 Next steps after tmole starts:');
console.log('1. Copy the HTTPS URL from tmole');
console.log('2. Go to @BotFather in Telegram');
console.log('3. Use /newapp or /editapp to set your Mini App URL');
console.log('4. Test your app in Telegram!');
console.log('\nPress Ctrl+C to stop both servers.');