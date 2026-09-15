require('dotenv').config();
const { MongoMemoryServer } = require('mongodb-memory-server');
const { spawn } = require('child_process');

async function run() {
  console.log('Starting in-memory MongoDB...');
  const mongod = await MongoMemoryServer.create({ binary: { version: '7.0.14' } });
  const uri = mongod.getUri();
  
  console.log('In-memory MongoDB started at:', uri);
  
  const env = { ...process.env, MONGODB_URI: uri, NODE_ENV: 'development' };
  
  console.log('Running seeder...');
  const seedProcess = spawn('node', ['seeds/seed.js'], { env, stdio: 'inherit' });
  
  seedProcess.on('close', (code) => {
    if (code !== 0) {
      console.error('Seeder failed with code', code);
      process.exit(code);
    }
    
    console.log('Seeder finished, starting server...');
    const serverProcess = spawn('node', ['server.js'], { env, stdio: 'inherit' });
    
    serverProcess.on('close', (serverCode) => {
      console.log('Server exited with code', serverCode);
      mongod.stop();
      process.exit(serverCode);
    });
  });
}

run().catch(console.error);
