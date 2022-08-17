const Project=require('../models/Project');
const ProjectType=require("../schema/project.js");

const {GraphQLObjectType,GraphQLNonNull,GraphQLEnumType,GraphQLID,GraphQLString}=require('graphql');

const project=new GraphQLObjectType({
    name:"projectMutation",
    fields:{
        addProjects:{
            type:ProjectType,
            args:{
                name:{type:GraphQLNonNull(GraphQLString)},
                description:{type:GraphQLNonNull(GraphQLString)},
                status:{
                    type:new GraphQLEnumType({
                        name:"ProjectStatus",
                        values:{
                           new:{value:'Not Started'},
                           progress:{value:'In Progress'},
                           completed:{value:'Completed'},
                        },
                    }),
                    defaultValue:'Not Started',
                },
                clientId:{type:GraphQLNonNull(GraphQLID)},
            },
            resolve(parent,args){
                let project=new Project({
                    name:args.name,
                    description:args.description,
                    status:args.status,
                    clientId:args.clientId
                });
                return project.save();
            },
        },
        deleteProject:{
            type:ProjectType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)},
            },
            resolve(parent,args){
                return Project.findByIdAndRemove(args.id);
            }
        },
        updateProject:{
            type:ProjectType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)},
                name:{type:GraphQLString},
                description:{type:GraphQLString},
                status:{
                    type:new GraphQLEnumType({
                        name:"StatusUpdate",
                        values:{
                           new:{value:'Not Started'},
                           progress:{value:'In Progress'},
                           completed:{value:'Completed'},
                        }
                    }),
                },
            },
            resolve(parent,args){
                return Project.findByIdAndUpdate(args.id,{
                    $set:{
                        name:args.name,
                        description:args.description,
                        status:args.status
                    }
                },{new:true});
            }
        }
    }
})

module.exports=project;