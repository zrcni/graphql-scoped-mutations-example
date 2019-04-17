const { ApolloServer, gql } = require("apollo-server");

let users = [
  { id: "1", name: "User1", description: "" },
  { id: "2", name: "User2", description: "" },
  { id: "3", name: "User3", description: "" }
];

const typeDefs = gql`
  type User {
    id: ID!
    name: String
    description: String
  }

  type Query {
    users: [User!]
    user(id: ID!): User
  }

  type UserMutation {
    updateName(name: String!): User
    updateDescription(description: String!): User
  }

  type Mutation {
    user(id: ID!): UserMutation
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (root, { id }) => users.find(user => user.id === id)
  },
  Mutation: {
    user: (root, { id }) => {
      if (!id) {
        throw new Error("id variable missing in mutation.user");
      }
      return id;
    }
  },
  UserMutation: {
    updateName: (id, { name }) => {
      let updatedUser;
      users = users.map(user => {
        if (user.id === id) {
          user.name = name;
          updatedUser = user;
        }
        return user;
      });
      if (!updatedUser) {
        throw new Error(`could not find user by id ${id}`);
      }
      return updatedUser;
    },
    updateDescription: (id, { description }) => {
      let updatedUser;
      users = users.map(user => {
        if (user.id === id) {
          user.description = description;
          updatedUser = user;
        }
        return user;
      });
      if (!updatedUser) {
        throw new Error(`could not find user by id ${id}`);
      }
      return updatedUser;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
