const Users = require("../../models/userModel")
const router = require("express").Router()

router.post("/follow/:followUser/:followerToken", (req, res) => {
  const { followUser, followerToken } = req.params

  Users.findById(followUser, (err, model) => {
    const followers = model.followers
    let followerIds = []

    for (let i = 0; i < followers.length; i++) {
      followerIds.push(followers[i]._id.toString())
    }

    if (followerIds.includes(followerToken)) {
      model.followers = followerIds.filter((e) => e !== followerToken)
      res.send({ success: true, msg: "removed follower" })
    } else {
      model.followers.push(followerToken)
      res.send({ success: true, msg: "added follower" })
    }
    model.save()
  })

  Users.findById(followerToken, (err, model) => {
    const following = model.following
    let followingIds = []

    for (let i = 0; i < following.length; i++) {
      followingIds.push(following[i]._id.toString())
    }

    if (followingIds.includes(followUser)) {
      model.following = followingIds.filter((e) => e !== followUser)
    } else {
      model.following.push(followUser)
    }
    model.save()
  })
})

module.exports = router
