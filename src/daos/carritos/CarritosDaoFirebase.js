

import { initializeApp } from 'firebase/app';

import config from '../../config/FirebaseConfig.js';
import ContainerFirebase from '../../containers/ContainerFirebase.js';


const app = initializeApp(config);

class CarritosDaoFirebase extends ContainerFirebase {

    constructor(name) {
        super(name)
    }

    
}

export default CarritosDaoFirebase;

