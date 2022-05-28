const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const validateEmail = require('../utils/validateEmail');


const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: [validateEmail, 'Please enter a valid Email address!']
    },
    createdAt: {
        type: Date, 
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]

},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

// get total count of friends on retrieval 
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
})
const User = model('User', UserSchema);

// export model
module.exports = User;