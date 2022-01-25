const { Schema, model } = require('mongoose');


// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
     minlength:1,
     maxlength:280,
    },
    createdAt: {
      type: Date,
    default:Date.now,
    get:(time)=>new Date(time).toLocaleDateString()
    },
    username: {
      type:String,
      required:true,
    },
    reactions: [reactionsSchema]
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
  });

userSchema.virtual('friendCount').get(function() {
    return this.friends.length
  });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
