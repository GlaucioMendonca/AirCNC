const mongooose = require("mongoose");

const UserSchema = new mongooose.Schema({
  email: String
});

module.exports = mongooose.model("User", UserSchema);
