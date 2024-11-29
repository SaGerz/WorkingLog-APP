const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../Models/db');

const register = async (req, res) => {
  const {email, password, name, role} = req.body;

  if(!email || !password || !name || !role) {
    res.status(400).json({message: "All fields are Required"});
  }

  try {
    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    const [existingUser] = await db.query(checkEmailQuery, [email]);

    if(existingUser.length > 0){
        res.status(400).json({
            message: "Email already registered"
        });
    }

    const hashedPassword = await bycrypt.hash(password, 10);

    const insertUserQuery =`INSERT INTO users (email, password) VALUES (?, ?)`;
    const [userResult] = await db.query(insertUserQuery, [email, hashedPassword]);

    const userId = userResult.insertId;

    const insertEmployeeQuery = `INSERT INTO employees (user_id, name, role) VALUES (?, ? , ?)`;
    await db.query(insertEmployeeQuery, [userId, name, role]);

    res.status(201).json({
        message: "Registrasion Succes",
        user : {
            id: userId,
            email,
            name,
            role
        }
    })

  } catch(error){
    res.status(500).json({message: "Registration Failed", error: error.message});
  }

}


module.exports = {register}