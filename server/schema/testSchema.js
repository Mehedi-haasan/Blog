const graphql = require('graphql');
// var lodash = require('lodash');
// const { userData, userHobby, userPost } = require('../database/data');


const person = new graphql.GraphQLObjectType({
    name: "Person",
    description: "Description for person",
    fields: () => ({
        id: { type: graphql.GraphQLString },
        name: { type: graphql.GraphQLString },
        age: { type: graphql.GraphQLInt },
        isMarried: { type: graphql.GraphQLBoolean },
        gpa: { type: graphql.GraphQLFloat }
    })
})

const RootQuery = new graphql.GraphQLObjectType({
    name: "RootQueryType",
    description: "Description",
    fields: {
        person: {
            type: person,
            args: {
                id: { type: graphql.GraphQLString },
                name: { type: graphql.GraphQLString },
                age: { type: graphql.GraphQLInt },
                isMarried: { type: graphql.GraphQLBoolean },
                gpa: { type: graphql.GraphQLFloat }
            },
            resolve(parent, args) {
                let personObj = {
                    id: args.id,
                    name: args.name,
                    age: args.age,
                    isMarried: args.isMarried,
                    gpa: args.gpa
                }
                // Implement your resolve function here to fetch and return user data
                return personObj

            }
        },
    }
});


module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
});