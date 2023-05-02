import {productos} from '../../../index.js'

module.exports.productQueries = {
  users: async () => await productos.getAll(),
  user: async (_, { productId }) => productos.getById(Id),
};