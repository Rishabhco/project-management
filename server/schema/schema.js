const Query=require("../queries/query");
const Mutation=require("../mutations/mutation");
const {GraphQLSchema}=require("graphql");

module.exports=new GraphQLSchema({
    query:Query,
    mutation:Mutation,
});