
import { ApolloServer } from '@apollo/server';
import {typeDefs} from './typeDefs.js'
import { resolvers } from './resolvers'

module.exports.server = new ApolloServer({
  typeDefs,
  resolvers,
});