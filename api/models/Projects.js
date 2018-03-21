/* This is The Projects Schema For MongoDB and Mongoose ORM.
 * It contain fields for id,name, creater, link,image,description,
 * team_members,contact,looking_for,comments,due_date,
 * # of Views,tags,category,creation_date,status,upvotes
*/

// interface mongoosePaginateOptions {
//     query?: object,
//     options?: object
// }
// interface mongoosePaginatePlugin extends Schema {
//     plugin(
//         plugin: (schema: mongoosePaginatePlugin, options?:mongoosePaginateOptions) => void,
//         options?: mongoosePaginateOptions
//      ): Schema;
// }

// Require Mongose ORM 
var Mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
// Require Mongoose Schema to Make Mongoose Object
var Schema = Mongoose.Schema;
Schema.plugin(mongoosePaginate);

// Lets create Schema Object
// The formet will be x = { variables like type and conditionals...} fallowed by ','
var ProjectSchema = new Schema({
    name:       {type: String},
    creator:    {type: String},
    githubLink: {type: String},
    mockupLink: {type: String},
    liveLink:   {type: String},
    image:      {type: Array}, 
    team:       {type: Array},
    description:{type: String},
    contact:    {type: String},
    lookingFor: {type: Array},
    comments:   {type: String},//?
    createdAt:  {type: Date,default: Date.now},
    dueDate:    {type: Date},
    views:      {type: Number},
    category:   {type: String},
    tags:       {type: Array},
    status:     {type: String},
    upVotes:    {type: Number},
    modifiedAt: {type: Date,default: Date.now}
});

// This will creates database named "Projects" in the Database
var Projects =  Mongoose.model("Projects", ProjectSchema);

// We are making available it to other files
module.exports = Projects;
