
import { appendFile } from "fs";
import connectToDb from "../../config/mongoDbConfig.js";


import ContainerMongoDb from '../../containers/ContainerMongoDb.js';




class CarritosDaoMongoDb extends ContainerMongoDb {

    constructor(object) {
        super(object)
    }

    
}

export default CarritosDaoMongoDb;