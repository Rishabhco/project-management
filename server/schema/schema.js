const {projects,clients}=require('../sampleData');

const {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLList,GraphQLSchema}=require('graphql');

const ClientType=new GraphQLObjectType({
    name:"Client",
    fields:{
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        phone:{type:GraphQLString}
    }
})

const RootQuery=new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        clients:{
            type:new GraphQLList(ClientType),
        },
        client:{
            type:ClientType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return clients.find(client=>client.id===args.id);
            }
        }
    }
})

module.exports=new GraphQLSchema({
    query:RootQuery
})