const clientQuery=require('../queries/client');
const projectQuery=require('../queries/project');
const clientMutation=require('../mutations/client');
const projectMutation=require('../mutations/project');

const {GraphQLSchema}=require('graphql');

module.exports=new GraphQLSchema({
    clientQuery,
    projectQuery,
    clientMutation,
    projectMutation
});