// const {projects,clients}=require('../sampleData');

const Project=require('../models/Project');
const Client=require('../models/Client');

const {GraphQLObjectType,GraphQLNonNull,GraphQLEnumType,GraphQLID,GraphQLString,GraphQLList,GraphQLSchema}=require('graphql');

const ClientType=new GraphQLObjectType({
    name:"Client",
    fields:{
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLString}
    }
});

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

const RootQuery=new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        projects:{
            type:new GraphQLList(ProjectType),
            resolve(parent,args){
                return Project.find();
            }
        },
        project:{
            type:ProjectType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Project.find(args.id);
            }
        },
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
                return Client.find(args.id);
            }
        }
    }
})

const mutation=new GraphQLObjectType({
    name:"Mutation",
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
                return Client.findByIdAndRemove(args.id);
            }
        },
    }
})

module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation
})