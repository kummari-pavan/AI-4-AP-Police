import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { sendResetEmail } from '../utils/emailService';

dotenv.config(); 

class UserService {

  public registerUser =  async (
    name: string, 
    email: string, 
    username: string, 
    password: string, 
   )=>{

    // Check if the username or email already exists
    const existingUser = await User.findOne({$or: [{ email: email }, { username: username }] });

    if (existingUser) {
      throw new Error('User with this email or username already exists');
    }
    
  //Here Adding Password Hashing , Before Saving Data In DB
    const salt= await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt)

    ;
    // Save the user with the hashed password
    const newUser = new User({
      name,
      email,
      username,
      password: hashPassword 
    });
    return await newUser.save();
  };


public loginUser = async (emailOrUsername: string, password: string) => {
  const user = await User.findOne({
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
  }).select("+password");

  if (!user || !user.password) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return token;
}

  // Forgot password logic
  public forgotPassword = async (email: string) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    // Generate JWT token for reset
    const resetToken = jwt.sign(
      {user:{ id: user._id }},
      process.env.JWT_SECRET ,
      { expiresIn: '12h' } 
    );

    // Send email with the token
    await sendResetEmail(email, resetToken);
  };

  // Reset password logic
  public resetPassword = async (token: string, newPassword: string, confirmPassword: string) => {
    if (newPassword !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error('Invalid token');
    }
    // Update the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });
  };

}

export default UserService;
