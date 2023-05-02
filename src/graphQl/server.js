
import { ApolloServer } from '@apollo/server';
import {typeDefs} from './typeDefs.js'
import {resolvers} from './resolvers/index.js'


 

export const server = new ApolloServer({
  typeDefs,
  resolvers,
});