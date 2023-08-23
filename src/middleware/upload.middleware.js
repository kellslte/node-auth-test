import formidable from "formidable"
import { rename } from 'fs';
import config from "../config/main.config.js";

const { publicPath } = config.storage;

export const uploadProfileImage = async function ( req, res, next )
{
    const form = formidable( {} );

    form.parse( req, ( err, fields, files ) =>
    {
        if ( err )
        {
            next( err );
        }
        
        const [ PersistentFile  ] = files.profileImage;

        const oldpath = PersistentFile.filepath;

        const newPath = publicPath(PersistentFile.originalFilename);
        
        rename( oldpath, newPath, ( e ) =>
        {
            if ( e ) throw new ApplicationError( e.message, 500 );
        } );

        
        for (const field in fields) {
            if (Object.hasOwnProperty.call(fields, field)) {
                req.body[field] = fields[field][0];
            }
        };
        
        req.body.profileImagePath = newPath;
        
        next();
    });
}