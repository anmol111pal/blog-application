const shortid = require("shortid");
const User = require("../models/UserModel.js");

const loggedInUsers = require("./login.js");

const getUserDetails = async (req, res) => {
    if(req.cookies.user_id) {
        const user_id = req.cookies.user_id;
        const user = await User.findOne({_id: user_id}, {username: 1, name: 1, email: 1, posts: 1, createdAt: 1, _id: 0});
        res.status(200).send(user);
    } else {
        res.status(401).send({
            code: 401,
            message: "Auth error."
        });
    }
}

const update = async (req, res) => {
    if(req.cookies.user_id) {
        let user = req.body;
        try {
            const resp = await User.updateOne({
                _id: req.cookies.user_id
            }, {
                ...user
            });

            if(resp.modifiedCount === 1) {
                console.log("Modified : ", resp.modifiedCount);
                console.log("Update Successful");
                user = await User.findOne({_id: req.cookies.user_id}, {username: 1, name: 1, email: 1, posts: 1, createdAt: 1, _id: 0}); // to send the updated user-details

                res.status(200).send({
                    code: 200,
                    message: "Profile Updated Sucessfully",
                    user
                });
            }
        } catch(err) {
            console.log("Error while updating: ", err);
        }

    } else {
        res.status(401).send({
            code: 401,
            message: "Auth Error"
        });
    }

}

const register = async (req, res) => {
    const user = req.body;

    const createdUser = await User.create(user);

    // const user_id = shortid.generate();
    loggedInUsers.set(createdUser._id.toString(), true);
    res.cookie("user_id", createdUser._id.toString());
    console.log(`${user.name} logged in`);
    res.status(200).send({
        user
    });
}

const login = async (req, res) => {
    const {username, password} = req.body;

    const userMatch = await User.findOne({username, password}) || null;
    if(userMatch === null) {
        console.log("Error logging in.");
        res.status(401).send({
            code: 401,
            message: "Invalid credentials!"
        });
    } else {
        console.log(`${userMatch.name} logged in`);
        // const user_id = shortid.generate();
        loggedInUsers.set(userMatch._id.toString(), true);
        res.cookie("user_id", userMatch._id.toString());
        res.status(200).send({
            userMatch
        });
    }
}

const logout = async (req, res) => {
    if(req.cookies.user_id) {
        res.clearCookie("user_id");
        loggedInUsers.delete(req.cookies.user_id);
        res.status(200).send({
            code: 200,
            message: "Logged out successfully."
        });
    } else {
        res.status(401).send({
            code: 401,
            message: "Auth error."
        });
    }
}

module.exports = {
    getUserDetails, register, login, logout, update
}