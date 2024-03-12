const graphql = require('graphql');
var lodash = require('lodash');
const User = require('../models/user.model')
const Hobby = require('../models/hobby.model')
const Post = require('../database/data');


// Creating type
const userType = new graphql.GraphQLObjectType({
    name: "User",
    description: "Documentation for user...",
    fields: () => ({
        id: { type: graphql.GraphQLString },
        name: { type: graphql.GraphQLString },
        age: { type: graphql.GraphQLInt },
        profession: { type: graphql.GraphQLString },
        post: {
            type: new graphql.GraphQLList(postType),
            resolve(parent, args) {
                return lodash.filter(userPost, { userId: parent.id })
            }
        },
        hobby: {
            type: new graphql.GraphQLList(hobbyType),
            resolve(parent, args) {
                return lodash.filter(userHobby, { userId: parent.id })
            }
        },
    })
});


const hobbyType = new graphql.GraphQLObjectType({
    name: "Hobby",
    description: "Docomentation for hobby...",
    fields: () => ({
        id: { type: graphql.GraphQLString },
        title: { type: graphql.GraphQLString },
        description: { type: graphql.GraphQLString },
        user: {
            type: graphql.GraphQLString
        },
    })
});

const postType = new graphql.GraphQLObjectType({
    name: "Post",
    description: "Docomentation for Post...",
    fields: () => ({
        id: { type: graphql.GraphQLString },
        title: { type: graphql.GraphQLString },
        description: { type: graphql.GraphQLString },
        user: {
            type: userType,
            resolve(parent, args) {
                return lodash.find(userData, { id: parent.userId })
            }
        },
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
            resolve(parent, args) {
                // Implement your resolve function here to fetch and return user data
                return User.findById(args.id)
                    .exec();
            }
        },
        users: {
            type: new graphql.GraphQLList(userType),
            resolve: () => {
                // Fetch all users from MongoDB using Mongoose
                return User.find({})
                           .exec(); // Execute the query as a promise
            }
        },

        hobby: {
            type: hobbyType,
            args: { id: { type: graphql.GraphQLString } },
            resolve(parent, args) {
                return lodash.find(userHobby, { id: args.id })

            }
        },
        post: {
            type: postType,
            args: { id: { type: graphql.GraphQLString } },
            resolve(parent, args) {
                return lodash.find(userPost, { id: args.id })

            }
        },
    }
});


const Mutation = new graphql.GraphQLObjectType({
    name: "MUtation",
    fields: {
        createUser: {
            type: userType,
            args: {
                // id: { type: graphql.GraphQLString },
                name: { type: graphql.GraphQLString },
                age: { type: graphql.GraphQLInt },
                profession: { type: graphql.GraphQLString }
            },
            resolve(parent, args) {
                let user = User({
                    // id: args.id,
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                });
                return user.save()

            }
        },
        updateUser: {
            type: userType,
            args: {
                id: { type: graphql.GraphQLString },
                name: { type: graphql.GraphQLString },
                age: { type: graphql.GraphQLInt },
                profession: { type: graphql.GraphQLString }
            },
            resolve(parent, args) {
                let updateUser = userData.findByIdAndUpdate()
            }
        },
        createPost: {
            type: postType,
            args: {
                id: { type: graphql.GraphQLString },
                title: { type: graphql.GraphQLString },
                description: { type: graphql.GraphQLString },
                userId: { type: graphql.GraphQLString },
            },
            resolve(parent, args) {
                let postData = {
                    id: args.id,
                    title: args.title,
                    description: args.description,
                    userId: args.userId,
                };
                return postData

            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
