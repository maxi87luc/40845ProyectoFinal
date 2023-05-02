export const typeDefs = `#graphql
  type Producto {
    name: String!
    description: String!
    code: String!
    price: Int!
    thumbnail: String!
    stock: Int!
  }
  input ProductToAdd {
    name: String!
    description: String!
    code: String!
    price: Int!
    thumbnail: String!
    stock: Int!
  }
  type Query {
    productos: [Producto]!
    producto(productId: ID!): Producto!
  }
  type Mutation {
    addProduct(productToAdd: ProductToAdd!): Producto!
  }
`;