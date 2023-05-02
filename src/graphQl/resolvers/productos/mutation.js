
import {productos} from '../../../index.js'

export const productMutations = {
  addProduct: async (_, { productToAdd }) => await productos.save(productToAdd),
};