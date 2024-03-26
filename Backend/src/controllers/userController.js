import { Post, User } from '../models/User.js';
import { Category } from '../models/category.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

dotenv.config();

const JWT_Phrase = process.env.JWT;

// insrting clients

export const insertUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input fields
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  const user = await User.findOne({ username });

  if (user) {
    return res.status(400).json({ error: 'User already exists on the site' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword, role: 'user' });

  try {
    const savedUser = await newUser.save();
    if (savedUser) {
      // Call sendVerifyMail function with user details
      sendVerifyMail(savedUser.username, savedUser.email, savedUser._id);
      console.log(savedUser);
      res.json(savedUser);
    } else {
      res.status(500).json({ error: 'Error in verifying user' });
    }
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// inserting Admin
export const insertAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input fields
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  const user = await User.findOne({ username });

  if (user) {
    return res.status(400).json({ error: 'User already exists on the site' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword, role: 'admin' });

  try {
    const savedUser = await newUser.save();
    if (savedUser) {
      // Call sendVerifyMail function with user details
      sendVerifyMail(savedUser.username, savedUser.email, savedUser._id);
      console.log(savedUser);
      res.json(savedUser);
    } else {
      res.status(500).json({ error: 'Error in verifying user' });
    }
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// user login

export const LoginVerify = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Retrieve user's role from the database
    const role = user.role;

    // Check if the user's role is "admin"
    if (role !== 'user') {
      return res.status(403).json({ error: 'Access forbidden for admin users' });
    }

    // Generate JWT token with user's role
    const token = jwt.sign({ userId: user._id, role }, JWT_Phrase, { expiresIn: '1d' });

    res.json({ access_token: token, userID: user._id });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// admin logi verify
  export const AdminLoginVerify = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if the user exists
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Check if the password is correct
      const validPassword = await bcrypt.compare(password, user.password);
  
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Retrieve user's role from the database
      const role = user.role;
  
      // Check if the user's role is "admin"
      if (role !== 'admin') {
        return res.status(403).json({ error: 'Access forbidden for non-admin users' });
      }
  
      // Generate JWT token with user's role
      const token = jwt.sign({ userId: user._id, role }, JWT_Phrase, { expiresIn: '1d' });
  
      res.json({ access_token: token, userID: user._id });
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
export const Home = async (req, res) => {
  try {
    // Check if the user is logged in
    if (req.user) {
      // Fetch user data here
      const userData = await User.findById(req.user.userId); // Assuming you have a User model
      res.json({ message: 'Welcome home!', userData });
    } else {
      res.json({ message: 'Welcome home!' }); // For unauthorized users
    }
  } catch (error) {
    console.error('Error loading home page:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to fetch user data for the dashboard
export const fetchUserData = async (req, res) => {
  try {
    // Fetch user data
    const userData = await User.findById(req.user.userId); // Assuming you have a User model
    console.log(userData)
    res.json(userData);
  } catch (error) {
    console.error('Error fetching user data for dashboard:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const fetchCatData = async (req, res) => {
  try {
    // Fetch user data
    // const userData = await Category.findById(req.user.userId); 
    // console.log(userData)
    // res.json(userData);
    let category = new Category({
      name: req.body.name,
      tags: req.body.tags,
      description: req.body.description
    })
      category = await category.save()

    if (category) {
      res.json(category);
    } else {
      console.error('Error is setting up category')
      res.status(500).json({error: 'Error in adding category'})
    }
  } catch (error) {
    console.error('Error at backend Server category controller:', error);
    res.status(500).json({ error: 'Internal Server Error Category Controller' });
  }
};


// For verify mail
const port = process.env.PORT
const emailUser = process.env.EmailUser
const emailPassword = process.env.EmailPassword

export const sendVerifyMail = async(username, email, userId)=> {
  try {
      const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          requireTLS: true,
          auth: {
              user: emailUser,
              pass: emailPassword
          }
      });

      const VerifyLink = `https://personal-site-static.onrender.com/userMailVerify/${userId}`;

      const mailOptions = {
        from: emailUser,
        to: email,
        subject: 'Verify Mail Link',
        html: `<p>Hi ${username},<br/>Please click <a href="${VerifyLink}">here</a> to verify your mail</p>`
      };

      transporter.sendMail(mailOptions, function(error, info){
          if (error) {
              console.log(error)
          } else {
              console.log('Email has been sent:-', info.response)
          }
      })
  } catch (error) {
      console.log(error.message)
  }
}

//Reset Password 
const JWT_SECRET = process.env.JWT_SECRET;

// other controller functions...

// Forget Password

export const getResetPassword = async (req, res) => {
  try {
    res.json({message : 'Reset password'});
  } catch (error) {
    console.error('Error loading forget password page:', error);
    res.status(500).json({ error: 'Forget Password Internal Server Error' });
  }
}

export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  console.log(email);

  try {
    // Find user by email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.send({ error: 'User not found' });
    }

    // Generate a unique token using JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Save the token to the user document
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

    await user.save();

    var userId = user._id;

    // Send reset password email
    await sendResetPasswordMail(user.username, userId, user.email, token);

    return res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Error in forget password:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

export const sendResetPasswordMail = async (username, userId, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      requireTLS: true,
      auth: {
        user: emailUser,
        pass: emailPassword
      }
    });

    const resetLink = `https://personal-site-static.onrender.com/reset-password/${userId}/${token}`;

    const mailOptions = {
      from: emailUser,
      to: email,
      subject: 'Reset Password',
      html: `<p>Hi ${username},<br/>Please click <a href="${resetLink}">here</a> to reset your password</p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error('Error sending password reset email:', error);
      } else {
        console.log('Password reset email sent:', info.response);
      }
    });
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Decode the token to get user ID
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Save the user with the new password
    await user.save();

    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};