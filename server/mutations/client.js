const Client=require('../models/Client');
const Project=require('../models/Project');
const ClientType=require("../schema/client.js");

const {GraphQLObjectType,GraphQLNonNull,GraphQLID,GraphQLString}=require('graphql');

const client=new GraphQLObjectType({
    name:"clientMutation",
    fields:{
        addClient:{
            type:ClientType,
            args:{
                name:{type:GraphQLNonNull(GraphQLString)},
                email:{type:GraphQLNonNull(GraphQLString)},
                phone:{type:GraphQLNonNull(GraphQLString)},
            },
            resolve(parent,args){
                let client=new Client({
                    name:args.name,
                    email:args.email,
                    phone:args.phone
                });
                return client.save();
            }
        },
        deleteClient:{
            type:ClientType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)},
            },
            resolve(parent,args){
                Project.find({clientId:args.id}).then((projects)=>{
                    projects.forEach((project)=>{
                        project.remove();
                    })
                })
                return Client.findByIdAndRemove(args.id);
            }
        },
    }
})

module.exports=client;