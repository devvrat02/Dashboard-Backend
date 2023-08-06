const UserDAO = require('../../models/user.model');
const { v4: uuidv4 } = require('uuid');
const bcrypt =require('bcrypt')
// import the JWT library for creating tokens
var jwt = require("jsonwebtoken");

const user={}
user.register=async function (req, res ){
    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;
    
        // Validate user input
        if (!(email && password && first_name && last_name)) {
          res.status(400).send("All input is required");
        }
    
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await UserDAO.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
    
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
    
        // Create user in our database
        const user = await UserDAO.create({
          first_name,
          last_name,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
        });
    
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "48h",
          }
        );
        // save user token
        user.token = token;
    
        // return new user
        return res.status(201).json(user);
      } catch (err) {
        console.log(err);
      }
}

user.edit=async function(req, res){
  const token =req.body.token || req.query.token || req.headers["x-access-token"];
  try {
    
    console.log(token,process.env.TOKEN_KEY)  
    const decoded =jwt.verify(token,process.env.TOKEN_KEY)
    const email = decoded.email;
    const { first_name, last_name } = req.body;
    const user = await UserDAO.findOne({ email: email })
    const updateuser={
          first_name,
          last_name
    };
    if(user){
      let temp=UserDAO.updateOne({email:email},
        updateuser,
        (err,res)=>{if (err) throw err ; })
        // console.log(temp)
      }
    
    return res.json({status:"ok" ,msg: 'User updated'})
  } catch (error) {
      // console.log(error);
      return res.json({status :'error', error : 'invalid token'})
  }
}

user.get=async function(req,res)  {
    const token =req.body.token || req.query.token || req.headers["x-access-token"];
    try {
      const decoded =jwt.verify(token,process.env.TOKEN_KEY)
      const email = decoded.email;
      const user = await UserDAO.findOne({ email: email })
      if(!user){
        return {status :'error', msg:'Invaild user'}
      }
        let data =await UserDAO.find({}, {first_name: 1, last_name: 1,email:1,role: 1});
        return res.json(data);    
    } catch (error) {
      return res.json({status:"error" ,error})   
    }    
}


user.auth=async function(req, res){
  try {
        const token =req.body.token || req.query.token || req.headers["x-access-token"];
        const decoded =jwt.verify(token,process.env.TOKEN_KEY)
        const email = decoded.email;
        const user = await UserDAO.findOne({ email: email },{first_name:1,last_name:1,role:1,email:1})
        return res.status(201).json(user)
    } catch (error) {
        console.log(error);
        return res.json({status :'error', error : 'invalid token'})
    }
}

user.login=async function(req, res ){
    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await UserDAO.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "48h",
            }
          );
    
          // save user token
          user.token = token;
    
          // user
         return res.status(200).json(user);
        }
        return res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }    
}

module.exports = user