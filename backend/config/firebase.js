const firebase = require('firebase/app');
const {getDatabase} =  require('firebase/database');

const firebaseConfig = {
    apiKey: "AIzaSyAW9m8kJfHzP0rOSFzZ106bYtwWCxXyPmc",
    authDomain: "generate-working-api.firebaseapp.com",
    projectId: "generate-working-api",
    storageBucket: "generate-working-api.appspot.com",
    messagingSenderId: "136960188068",
    appId: "1:136960188068:web:e018c7b4337797e8931031",
    measurementId: "G-BK517H4FHH",
    databaseURL: "https://generate-working-api-default-rtdb.firebaseio.com"
};

const app = firebase.initializeApp(firebaseConfig);
const database = getDatabase(app);
const connectDatabase = () => {
    try {
        if(database)
            console.log('Connected to Firebase realtime database');
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDatabase;

