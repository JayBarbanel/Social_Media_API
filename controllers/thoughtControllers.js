const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
return User.findOneAndUpdate(
  {username:req.body.username},
    {$push:{thoughts:thought._id}},{new:true}

)
      })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
    //   .then((thought) =>
    //     !thought
    //       ? res.status(404).json({ message: 'No thought with that ID' })
    //       : User.deleteMany({ _id: { $in: thought.users } })
    //   )
      .then(() => res.json({ message: 'Thought and users deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  createReaction(req,res) {
      Thought.updateOne(
          {_id:req.params.thoughtId},
          {$push: {reactions: req.body}},
          { runValidators: true, new: true }
      )
      .then(() => res.json({ message: 'Reaction was added!' }))
      .catch((err) => res.status(500).json(err));
},
deleteReaction(req,res) {
    Thought.updateOne(
        {_id:req.params.thoughtId},
        {$pull: {reactions: {_id:req.params.reactionId} }},
        { runValidators: true, new: true }
    )
    .then(() => res.json({ message: 'Reaction was deleted!' }))
    .catch((err) => res.status(500).json(err));
}
};