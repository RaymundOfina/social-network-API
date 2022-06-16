const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

// Sets up Get  & Post 
router
    .route('/')
    .get()
    .post();

// users & id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

// friends & friendId
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

// users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

module.exports = router;