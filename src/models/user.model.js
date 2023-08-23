import { Schema, model } from "mongoose";

const UserSchema = new Schema( {
    name: {
        type: "string",
    },

    email: {
        type: "string",
        unique: true,
    },

    password: {
        type: 'string',
    },

    profileImage: {
        type: 'string',
    }
}, { timestamps: true } );

export const User = model('User', UserSchema);