
import { productMutations } from "./productos/mutations";
import { productQueries } from "./productos/queries"


module.exports.resolvers = {
  Query: {
    ...productQueries,
  },

  Mutation: {
    ...productMutations,
  },
};