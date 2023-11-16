const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: String, 
  timeStamp: Date, 
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
});

commentSchema.set("toJSON", {
  transform: (comment, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("userComment", commentSchema);
