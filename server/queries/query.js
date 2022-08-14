const clientQuery=require('./client');
const projectQuery=require('./project');
const {GraphQLObjectType}=require('graphql');

const Query=new GraphQLObjectType({
    name: 'Query',
    description: 'The base query',
    fields: {
        client: {
            type: clientQuery,
            resolve: () => { return {} }
        },
        project: {
            type: projectQuery,
            resolve: () => { return {} }
        }
    }
})

module.exports=Query;