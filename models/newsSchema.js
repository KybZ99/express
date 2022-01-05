const mongoose =require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  title:  {type: String, required: [true, "Tytuł jest wymagany"]}, 
  description: {type: String, required: [true, "Opis jest wymagany"]},
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("News", newsSchema);