const User = require('./User');
const Fountain = require('./Fountain');

module.exports = { User, Fountain };

app.get("/", (req,res) =>{
    res.json("Hello");
  })

mongoose.connect('mongodb+srv://root:root@cluster0.1hdcug7.mongodb.net/Untitled2');