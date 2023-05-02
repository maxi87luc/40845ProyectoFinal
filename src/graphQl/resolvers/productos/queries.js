import {productos} from '../../../index.js'

export const productQueries = {
  productos: async () => await productos.getAll(),
  producto: async (_, { productId }) => productos.getById(productId),
};