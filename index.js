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
    user: (root, variables) => users.find(user => user.id === variables.id)
  },
  Mutation: {
    user: (root, variables) => {
      if (!variables.id) {
        throw new Error("id variable missing in mutation.user");
      }
      return variables.id;
    }
  },
  UserMutation: {
    updateName: (id, variables) => {
      let updatedUser;
      users = users.map(user => {
        if (user.id === id) {
          user.name = variables.name;
          updatedUser = user;
        }
        return user;
      });
      if (!updatedUser) {
        throw new Error(`could not find user by id ${id}`);
      }
      return updatedUser;
    },
    updateDescription: (id, variables) => {
      let updatedUser;
      users = users.map(user => {
        if (user.id === id) {
          user.description = variables.description;
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
