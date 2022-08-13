const {GraphQLObjectType,GraphQLID,GraphQLString}=require('graphql');
const ClientType=require("../schema/client.js");
const Client=require('../models/Client');

const ProjectType=new GraphQLObjectType({
    name:"Project",
    fields:{
        id:{type:GraphQLID},
        clientId:{type:GraphQLID},
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        status:{type:GraphQLString},
        client:{
            type:ClientType,
            resolve(parent,args){
                return Client.find(parent.clientId);
            }
        }
    }
})

module.exports=ProjectType;