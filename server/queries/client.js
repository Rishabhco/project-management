const Client=require('../models/Client');
const ClientType=require("../schema/client.js");

const {GraphQLObjectType,GraphQLID,GraphQLList}=require('graphql');

const clientQuery=new GraphQLObjectType({
    name:"clientQueryType",
    fields:{
        clients:{
            type:new GraphQLList(ClientType),
            resolve(parent,args){
                return Client.find();
            }
        },
        client:{
            type:ClientType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Client.findById(args.id);
            }
        }
    }
})

module.exports=clientQuery;