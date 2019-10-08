const mongooose = require("mongoose");

const BookingSchema = new mongooose.Schema({
  date: String,
  approved: Boolean,
  user: {
    type: mongooose.Schema.Types.ObjectId,
    ref: "User"
  },
  spot: {
    type: mongooose.Schema.Types.ObjectId,
    ref: "Spot"
  }
});

module.exports = mongooose.model("Booking", BookingSchema);
