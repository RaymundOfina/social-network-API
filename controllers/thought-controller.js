const { Thought, User } = require('../models');

const thoughtController = {
    getThoughts(req, res) {
        // mongoose .find() method, very much like sequelize's .findAll()
        Thought.find({})
        .populate({
            path: 'reactions',
            // removes from thoughts data returned
            select: '-__v'
        })
        // removes from user data returned
        .select('-__v')
        // sort in descending order by _id, always giving newest thoughts first order
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: ('-__v')
        })
        .select('-__v')
        .then(dbThoughtData => {
            // if no user is found, send 404
            if (!dbThoughtData) {
                res.status(404).json({ message: 'Unable to locate ID' });
                return;
            } 
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // add comment
    addThought({params, body}, res) {
        console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                // where
                { _id: params.userId },
                // what
                {  $push: { thoughts: _id }},
                // how
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'Unable to locate ID' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'Unable to locate ID' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err));
    },

    // update user by id
    updateThought({ params, body}, res) {
        
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'Unable to locate ID' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // remove comment
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'Unable to locate ID' })
            }
            res.json(deletedThought)
            return User.findOneAndUpdate(
                { _id: params.id },
                
                { $pull: { thoughts: params.id } },
                { new: true }
            );
        })

        .catch(err => res.json(err));
    },

    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbReactionData => {
            if (!dbReactionData) {
                res.status(404).json({ message: 'Unable to locate ID' });
                return
            }
            // return user data to the user
            res.json(dbReactionData);
        })        
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;