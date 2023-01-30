
import connectToDb from "../../config/mongoDbConfig.js";


import ContainerMongoDb from '../../containers/ContainerMongoDb.js';




class ProductosDaoMongoDb extends ContainerMongoDb {

    constructor(object) {
        super(object)
    }

    
}

export default ProductosDaoMongoDb;