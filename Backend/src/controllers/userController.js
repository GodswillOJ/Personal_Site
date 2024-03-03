import { Post, User } from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

dotenv.config();

const JWT_Phrase = process.env.JWT;

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

  const newUser = new User({ username, email, password: hashedPassword, is_admin: 0 });

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

export const LoginVerify = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Received login request for username:', username);

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found:', username);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log('Invalid password for user:', username);
      return res.status(401).json({ error: 'Invalid credentials password or username' });
    }

    // Generate JWT token
    if (user.is_admin === 0) {
      const token = jwt.sign({ userId: user._id }, JWT_Phrase, { expiresIn: '1d' }); // set to 1 day
      
      res.json({ access_token: token, userID: user._id });
    } else {
      // Change the status to 401 for consistency with the frontend
      res.status(401).json({ error: 'Invalid credentials' });
    }
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
    res.json(userData);
  } catch (error) {
    console.error('Error fetching user data for dashboard:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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

      const mailOptions = {
          from: emailUser,
          to: email,
          subject: 'For Verification mail',
          html: '<p>Hii '+username+', please click here to <a href="https://personal-site-awu4.onrender.com/api/user/verify?id='+ userId +'">Verify</a> your mail</p>'
      }
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
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a unique token using JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Save the token to the user document
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

    await user.save();

    // Send reset password email
    await sendResetPasswordMail(user.username, user.email, token);

    return res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Error in forget password:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

export const sendResetPasswordMail = async (username, email, token) => {
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

    const mailOptions = {
      from: emailUser,
      to: email,
      subject: 'Reset Password',
      html: `<p>Hi ${username},</p>
             <p>Please click <a href="https://personal-site-awu4.onrender.com/reset-password/${token}">here</a> to reset your password.</p>`
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