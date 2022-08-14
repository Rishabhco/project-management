const clientMutation=require('./client');
const projectMutation=require('./project');

const {GraphQLObjectType}=require('graphql');

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'The base mutation',
    fields: {
        client: {
            type: clientMutation,
            resolve: () => { return {} }
        },
        project: {
            type: projectMutation,
            resolve: () => { return {} }
        }
    }
})

module.exports=Mutation;