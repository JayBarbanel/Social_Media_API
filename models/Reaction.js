const { Schema, model , Types }= require('mongoose');


// Schema to create Student model
const reactionSchema = new Schema(
  {
    reactionId: {
        type:Schema.Types.ObjectId,
        default:()=>new Types.ObjectId(),
    },
    createdAt: {
      type: Date,
    default:Date.now,
    get:(time)=>new Date(time).toLocaleDateString()
    },
    reactionBody: {
      type: String,
      required: true,
      minlength:1,
      maxlength:280,
    },
    username: {
      type:String,
      required:true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);


module.exports = reactionSchema;