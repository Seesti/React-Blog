import mongoose from 'mongoose'

const connection = {};

//kopioitu githubista suoraan mongon databaseen yhdistämistä varten

async function connect() {
    if (connection.isConnected) {

    }
    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyStates;
        if (connection.isConnected === 1) {
            return;
        }
        await mongoose.disconnect();
    }
    const db = await mongoose.connect(process.env.MONGO_URL);
    connection.isConnected = db.connections[0].readyState
}

async function disconnect() {
    if ( connection.isConnected) {
        if (process.env.NODE_ENV === 'production') {
            await mongoose.disconnect();
            connection.isConnected = false;
        }
    }
}

const db = { connect, disconnect };
export default db