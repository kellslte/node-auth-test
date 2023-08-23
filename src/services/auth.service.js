import { ApplicationError } from "../helpers/error.helper.js";
import { User } from "../models/user.model.js";
import argon from 'argon2';
import { issuetoken } from "./jwt.service.js";

export const register = async function ( payload )
{
    const { name, email, password, passwordConfirmation, profileImagePath } =
      payload;

    // check that the password is the same as the confirm password field
    if ( password !== passwordConfirmation ) throw new ApplicationError( "Passwords do not match", 422 );
    
    // check if their is an existing user account with the email address
    if ( await User.findOne( { email: email } ) ) throw new ApplicationError( "A user account with the email address already exists", 422 );

    // hash the user password
    const hash = await argon.hash(password);

    // create a new user account
    return await User.create( {
        name: name,
        email: email,
        password: hash,
        profileImage: profileImagePath
    } );
}

export const login = async function ( payload )
{
    const { email, password } = payload;
    
    // verify that the user exists
    const user = await User.findOne( { email: email } );

    if ( !user ) throw new ApplicationError( "User account not found", 404 );

    // verify the user password
    if ( !( await argon.verify( user.password, password ) ) ) throw new ApplicationError( "Invalid email or password", 401 );

    // generate the token
    const authUser = {
        sub: user.id,
        name: user.name,
        email: user.email,
        image: user.profileImage
    }

    return issuetoken( authUser );
}

export const requestPasswordReset = async function ( payload ) { }

export const resetPassword = async function ( payload ) { }