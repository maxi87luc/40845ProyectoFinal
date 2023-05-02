
import {productos} from '../../../index.js'

module.exports.productMutations = {
  addProduct: async (_, { productToAdd }) => await productos.save(productToAdd),
};