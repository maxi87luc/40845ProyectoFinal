
import { productMutations } from "./productos/mutation.js";
import { productQueries } from "./productos/queries.js"

export const  resolvers = {
  Query: {
    ...productQueries,
  },

  Mutation: {
    ...productMutations,
  },
};