const {AuthenticationError} = require('apollo-server');

const jwt = require('jsonwebtoken');
const { key } = require('../../keys');

module.exports = (context)=>{
    const authHeader = context.req.headers.authorization;
    if(authHeader){
        const token =authHeader.split('Bearrer')[1];
        if(token){
            try {
                const user = jwt.verify(token,key);
                return user;
            } catch (err) {
                throw new AuthenticationError('Invalid/Expired token')
            }
        }
        throw new Error("Authentication token must be 'Bearer [oken]")
    }
    throw new Error('Authorization header must be privided');
}