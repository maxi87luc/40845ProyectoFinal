import { initializeApp } from 'firebase/app';

import config from '../../config/FirebaseConfig.js';
import ContainerFirebase from '../../containers/ContainerFirebase.js';


const app = initializeApp(config);

class ProductosDaoFirebase extends ContainerFirebase {

    constructor(name) {
        super(name, app)
    }

    
}

export default ProductosDaoFirebase;

