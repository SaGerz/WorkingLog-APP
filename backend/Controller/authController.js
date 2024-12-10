const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../Models/db');

const registerUser = async (req, res) => {
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


const loginUser = async (req, res) => {
  const {email, password} = req.body;

  if(!email || !password){
    res.status(400).json({message: "Email and Password are required"});
  }

  const queryUser = `SELECT * FROM users WHERE email = ?`;
  const queryEmployee = `SELECT * FROM employees WHERE user_id = ?`

  try {
    const [userResult] = await db.query(queryUser, [email]);
    const user = userResult[0];

    if(!user) {
      return res.status(404).json({message: "User tidak ditemukan"});
    }

    const isPassword = await bycrypt.compare(password, user.password);
    if(!isPassword) {
      return res.status(401).json({message: "Password Salah"})
    }


    const [employeeResult] = await db.query(queryEmployee, [user.id]);
    const employee = employeeResult[0];

    if (!employee) {
      return res.status(404).json({message: "User tidak ditemukan"});
    }

    // Jwt 
    const token = jwt.sign(
      {userId: user.id, email: user.email, employeeId: employee.id},
      process.env.JWT_SECRET, {expiresIn: '5m'}
    )

    res.status(200).json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        email: user.email,
        employeeId: employee.id
      }
    })
  } catch (error) {
    console.error("Error saat login : ", error);
    res.status(500).json({message: "Login gagal", "Error": error});
  }

}



module.exports = {registerUser, loginUser}