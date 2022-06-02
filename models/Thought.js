const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema (
    {
        reactionId: {
            
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'No input!',
            trim: true,
            maxlength: 280
        },
        userName: {
            type: String,
            required: 'Please enter a username!',
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },    
    },
    {
        toJSON: {
            getters: true
        }
    }
); 

const ThoughtSchema = new Schema (
    {
        username: {
            type: String,
            required: 'Please enter a name!',
            trim: true
        },
        thoughtBody: {
            type: String,
            required: 'No input!',
            minlength: 1,
            maxlength: 280,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        // use reaction schema to validate data for a reply
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);