const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
});

const Users = mongoose.model("User", UserSchema);

module.exports = Users;