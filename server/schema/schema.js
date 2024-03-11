const graphql = require('graphql');

// Creating type
const userType = new graphql.GraphQLObjectType({
    name: "User",
    description: "Documentation for user...",
    fields: () => ({
        id: { type: graphql.GraphQLString },
        name: { type: graphql.GraphQLString },
        age: { type: graphql.GraphQLInt }
    })
});

// Root Query
const RootQuery = new graphql.GraphQLObjectType({
    name: "RootQueryType",
    description: "Description",
    fields: {
        user: {
            type: userType,
            args: { id: { type: graphql.GraphQLString } }, 
            resolve(parent, args){
                // Implement your resolve function here to fetch and return user data
            }
        }
    }
});

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
});
