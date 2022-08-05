jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token , 'SERVER_SECRET_OUALID');
        const userId = decodeToken.userId;
        console.log(token);

        if( req.body.userId && req.body.userId !== userId) {
            throw 'User Id not Available';
        } else {
            next();
        }

    }catch(e) {
        return res.status(401).json({
            message:e
        })
    }

}