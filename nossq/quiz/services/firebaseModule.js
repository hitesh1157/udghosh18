import firebase from 'firebase';
import * as config from '../config/config.json';

const firebaseModule = firebase.initializeApp(config);
export default firebaseModule;
