const { request, response } = require("express");
const User = require("../model/user");
const UserLoginDto = require("../dto/userLoginDto");
const jwt = require('jsonwebtoken');

const login = async (request, response) => {
  try {
    const userLoginDto = Object.assign(new UserLoginDto(), request.body);
    //const userLoginDto = new UserLoginDto(request.body);
    /*
    {
        username: "username",
        password: "P@ssw0rd"
    }
    */

    const user = await User.findByCredentials(userLoginDto.username, userLoginDto.password);
    //await getUserByUsername(userLoginDto.username);
    // We Check the user
    if (!user) {
      return response.status(404).send("User Not Found");
    }

    const token = await user.generateAuthToken();

    response.status(202).send({ user: user, token: token });
  } catch (err) {
    response.status(401).send("Invalid credential");
  }
};

const getUserByUsername = async (username) => {
  User.findOne({ username: username }).then((result) => {
    return result;
  });
};

const createUser = async (request, response) => {
    const user = new User(request.body);
    try{
        await user.save();
        const token = await user.generateAuthToken();
        response.status(201).send({user, token});
    }catch(err){
        response.status(400).send(err.message);
    }
} 

const logout = async (request, response) => {
    const token = request.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await getUserByUsername(decoded.username);
        user.token = null;
        await user.save();
    }catch(err){
        response.status(500).send(err.message)
    }

}

module.exports = { login, createUser, logout }