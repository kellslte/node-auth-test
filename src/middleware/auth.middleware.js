import { ApplicationError } from "../helpers/error.helper.js";
import { verifyToken } from "../services/jwt.service.js";

export const authMiddleware = async function ( req, res, next )
{
    const authHeader = req.headers[ 'Authorization' ];
    // Bearer asfldsifjioef.jkafudhieufhjkejdbgedf.jksfuheiuf

    const token = authHeader?.split( ' ' )[ 1 ];
    /* 
    [
    'Bearer',
    'asfldsifjioef.jkafudhieufhjkejdbgedf.jksfuheiuf'
    ]
    */
    
    if ( !token ) throw new ApplicationError( "Invalid user credentials", 401 );

    req.user = verifyToken( token );

    next();
}