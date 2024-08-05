import { getFireStore } from 'firebase/firestore';
import firebaseDB from './firebaseDB';

const firebaseStore = getFireStore(firebaseDB);

export default firebaseStore;
