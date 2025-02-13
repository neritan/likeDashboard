const { request, response } = require("express");
const Like = require("../model/like");

const notFound = "Like not found";

const getLikesList = async (request, response) => {
  console.log("here");
  Like.find({})
    .then((result) => response.json({ result }))

    .catch((err) => {
      console.error(err);
      response.json({ status: err.code, body: err.message });
    });
};

const getLike = async (request, response) => {
  Like.findById(request.params.id)
    .then((result) => {
      if (!result) return response.status(404).send(notFound);
      return response.status(200).send({ result });
    })
    .catch((err) => {
      console.error(err);
      response.json({ status: err.code, body: err.message });
    });
};

const createLike = async (
    request,  
      response
  ) => {
    let likeDto = request.body
    likeDto.likes = 1;
    console.log(likeDto);


    const retLike = new Like(likeDto); 
    const saved = await retLike.save();
    return response.status(201).send(saved);
  }
  

const deleteLike = async (request, response) => {
  try {
    const like = await Like.findByIdAndDelete(request.params.id);
    if (!like) {
      return response.status(404).send(notFound);
    }
    return response.status(201).send(like);
  } catch (err) {
    res.status(500).send(err);
  }
};


const updateLike = async (request, response) => {   
   try {
      console.log(request.body)
      const like = await Like.findByIdAndUpdate(request.params.id, request.body);
      console.log(like)
      if (!like) {
        return response.status(404).send(notFound);
      }
      return response.status(201).send(like);
    } catch (err) {
      console.log(err);
      response.status(500).send(err);
    }
  };
  
module.exports = { getLike, createLike, deleteLike, getLikesList, updateLike }  