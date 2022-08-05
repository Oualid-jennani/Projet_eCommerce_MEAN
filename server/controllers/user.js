
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Sign Up Methode 
exports.signUp = async (req, res, next) => {
    console.log("ok");
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        const hash = await bcrypt.hash(req.body.password, 10);
        if (hash === undefined) {
            return res.status(404).json({
                message: "undefined hash"
            })
        } else {
            // Create User instance
            const user = new User({
                username: req.body.username,
                role: "admin",
                password: hash,
            });

            // Save User
            const ress = await user.save();
            if (ress !== undefined) {
                return res.status(200).json({
                    message: "User created"
                });
            }
        }
    } else {
        return res.status(404).json({
            message: "User already exist"
        });
    }
}
// Sign In Methode
exports.signIn = async (req, res, next) => {

    const user = await User.findOne({ username: req.body.username }).select('+password');
    if (user) {
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
            delete user.password;
            const jwtBearerToken = jwt.sign(
                { userId: user._id },
                'SERVER_SECRET_OUALID',
                { expiresIn: '24h' }
            );

            return res.status(200).json({
                user: user,
                token: jwtBearerToken,
                expiresIn: '24h'
            });
        } else {
            return res.status(401).json({
                message: "Wrong Password"
            });
        };

    } else {
        return res.status(401).json({
            message: "User undefined"
        });
    }

};

exports.addManager = async (req, res, next) => {

    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        const hash = await bcrypt.hash(req.body.password, 10);
        if (hash === undefined) {
            return res.status(404).json({
                message: "undefined hash"
            })
        } else {
            // Create User instance
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                role: req.body.role,
                password: hash,
            });

            // Save User
            const ress = await user.save();
            if (ress !== undefined) {
                return res.status(200).json({
                    message: "User created"
                });
            }
        }
    } else {
        return res.status(404).json({
            message: "User already exist"
        });
    }

}

// Update User Methode

exports.update = async (req, res, next) => {
    const hash = bcrypt.hash(req.body.password, 10);
    if (hash !== undefined) {
        // Create User instance
        const newUser = new User({
            username: req.body.username,
            password: hash,
        });
    }
    // Update User
    const user = await User.findOneAndUpdate({ _id: req.params.id }, { $set: newUser });
    if (user !== undefined) {
        res.status(202).json({
            message: "User updated"
        })
    } else {
        res.status(404).json({
            message: "Error Update"
        })
    }
};

// Return all Managers
exports.allManagers = async (req, res, next) => {
    let populate = "";
    let skip = 0;
    let limit = 3;
    let count=  await User.find({ role: "manager" }).count();
    let pages = Math.ceil(count/limit);

    if(req.query.page !== undefined) skip = (limit * req.query.page)-limit;

    const users = await User.find({ role: "manager" })
    .skip(skip)
    .limit(limit)
    ;
    
    if (users.length > 0) {
        return res.status(200).json({
            users: users,
        });

    } else {
        return res.status(401).json({
            message: "Managers not found"
        });
    }

};

// get Manager by Id 
exports.getManagerById = async (req, res,next) => {

    if( !req.params.id) return res.status(404).json({message: 'Manager Not Found'})

    const manager = await User.findOne({ _id: req.params.id, role: "manager" }); 

    if(!manager) return res.status(404).json({message: 'Manager Not Found'});

    return res.status(200).send(manager);
}


// Update Manager Methode

exports.updateManager = async (req, res, next) => {

    // Find user and check if has role Managers
    let manager =  await User.findOne({ _id:req.params.id ,role: "manager" });
    if("manager" !== manager.role) return res.status(404).json({message:"Manager Not Found"});
    // Create User instance
    const newUser = new User({
        _id:req.params.id,
        username: req.body.username,
        email:req.body.email,
        phoneNumber:req.body.phoneNumber
    });
    
    //Update User
    const user = await User.updateOne({ _id: req.params.id }, { $set: newUser });
    if (user !== undefined) {
        res.status(202).json({
            message: "Manager updated"
        })
    } else {
        res.status(404).json({
            message: "Error Update"
        })
    }
};

// Delete User Methode

exports.delete = async (req, res, next) => {
    const result = await User.findOneAndDelete({ _id: req.params.id });
    if (!result) res.status(404).json({
        message: "ERROR TO DELETE"
    });
    else res.status(200).json({
        message: "User Deleted"
    })
};
