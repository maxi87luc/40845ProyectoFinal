



import ContainerMongoDb from '../../containers/ContainerMongoDb.js';




class OrdersDaoMongoDb extends ContainerMongoDb {

    constructor(name, model) {
        super(name, model)
    }

    
}

export default OrdersDaoMongoDb;