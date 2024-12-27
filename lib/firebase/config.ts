import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBJdEAptW8me9WvenwuL1DJjGc81_fUrtk',
  authDomain: 'gama-ai.firebaseapp.com',
  projectId: 'gama-ai',
  storageBucket: 'gama-ai.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:123456789'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);