module.exports.typeDefs = `#graphql
  type Producto {
    name: String!
    description: String!
    code: String!
    price: String!
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
    products: [Product]!
    product(productId: id!): Product!
  }
  type Mutation {
    addProduct(productToAdd: ProductToAdd!): Product!
  }
`;