const Project=require('../models/Project');
const ProjectType=require("../schema/project.js");

const {GraphQLObjectType,GraphQLID,GraphQLList}=require('graphql');

const projectQuery=new GraphQLObjectType({
    name:"projectQueryType",
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
        }
    }
})

module.exports=projectQuery;