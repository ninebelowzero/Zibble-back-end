var User      = require('../models/user');

function update(req, res){
  User.findById(req.params.id, function(err, user){
    if (!user) return res.status(404).json({ message: "User not found." });
    if (err) return res.status(500).json({ message: err });
      
    user.email           = req.body.email            || user.email;         
    user.password        = req.body.password         || user.password;      
    user.experience      = req.body.experience       || user.experience;    
    user.blockers.push(req.body.blockers);

    user.save(function(err){
      if (err) return res.status(500).json({ message: err });
      res.status(200).json({ message: "User updated." });
    });

  });
}

function getBlockers(req, res){
  User.findById(req.params.id, function(err, user){
    if (!user) return res.status(404).json({ message: "User not found." });
    if (err) return res.status(500).json({ message: err });

    res.status(200).json({ blockers: user.blockers });

  });
}

module.exports = {
  update      : update,
  getBlockers : getBlockers
}