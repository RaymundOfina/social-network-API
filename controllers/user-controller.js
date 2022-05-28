const { User } = require('../models');

const userController = {
    // GET all users
    getAllUsers(req, res) {
        // mongoose .find() method, very much like sequelize's .findAll()
        User.find({})
        .populate({
            path: 'thoughts',
            // removes from thoughts data returned
            select: '-__v'
        })
        // removes from user data returned
        .select('-__v')
        // sort in descending order by _id, always giving newest thoughts first order
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: ('-__v')
        })
        .populate({
            path: 'friends',
            select: ('-__v')
        })
        .select('-__v')
        .then(dbUserData => {
            // unable to locate user
            if (!dbUserData) {
                res.status(404).json({ message: 'Unable to locate user' });
                return;
            } 
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // create user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // update user by id
    updateUser({ params, body}, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .populate({ path: 'friends', select: '-__v' })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'Unable to locate user' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    // delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'Unable to locate user' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate({_id: params.userId}, {$push: { friends: params.friendId } }, { new: true } ) 
        .populate({ 
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'Unable to locate user' })
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err))
    },

    // delete friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate({_id: params.userId}, {$pull: { friends: params.friendId }}, { new: true })
        .populate({ 
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {           

            if (!dbUserData) {
                res.status(404).json({ message: 'Unable to locate user' })
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err))
    },
};

module.exports = userController;