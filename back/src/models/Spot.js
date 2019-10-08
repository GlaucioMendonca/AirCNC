const mongooose = require("mongoose");

const SpotSchema = new mongooose.Schema({
  thumbnail: String,
  company: String,
  price: Number,
  techs: [String],
  user: {
    type: mongooose.Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  toJSON: {
    virtuals: true
  },
});

SpotSchema.virtual('thumbnail_url').get(function(){
  return `http://10.0.0.11:3333/files/${this.thumbnail}`
})

module.exports = mongooose.model("Spot", SpotSchema);
