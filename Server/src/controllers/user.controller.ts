import HttpStatus from 'http-status-codes';
import UserService from '../services/user.service';
import { Request, Response, NextFunction } from 'express';
import { publishMessage } from '../utils/rabbitMq';

class UserController {

  public UserService = new UserService();
  // Controller for registering a new user
  public register = async (req: Request, res: Response) => {
    try {
      const { name, email, username, password } = req.body;
      const newUser = await this.UserService.registerUser(name, email, username,  password); 
      if(newUser && newUser._id ){
        //send the new user data to the RabbitMQ Queue = userQueue
        publishMessage('user-queue',{"userId":newUser._id,action:"Register Successfully....."})
      }
      else{
        console.error("user ID not found in response Data");
      }
      res.status(201).send({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };
  
 
  // Controller for logging in a user
public login = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    // Choose either email or username as input
    const emailOrUsername = email || username;

    if (!emailOrUsername || !password) {
      return res.status(400).send({ message: 'Email/Username and password are required' });
    }

    const token = await this.UserService.loginUser(emailOrUsername, password);
    
    res.status(200).send({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};


  // Forgot Password
  public forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      await this.UserService.forgotPassword(email);
      res.status(200).send({ message: 'Reset token sent to email successfully' });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  // Reset Password From Authorization header
  public resetPassword = async (req: Request, res: Response) => {
    try {
      // Extract the token from the Authorization header
      const bearerToken = req.header('Authorization');
      if (!bearerToken) {
        return res.status(400).json({ message: 'Authorization token is required' });
      }
      const token = bearerToken.split(' ')[1]; // Remove "Bearer" prefix
      const { newPassword, confirmPassword } = req.body;
      await this.UserService.resetPassword(token, newPassword, confirmPassword);
      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

}

export default UserController;


