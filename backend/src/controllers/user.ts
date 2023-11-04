import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User.js';
import { hash, compare } from 'bcrypt';

const getAllusers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();

    res.status(200).json({ message: 'OK', users });
  } catch (error) {
    console.log('catch error => ', error);
    res.status(500).json({ message: 'ERROR', cause: error.message });
  }
};

const userSignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(200).json({ message: 'OK', id: user._id.toString() });
  } catch (error) {
    console.log('catch error => ', error);
    res.status(500).json({ message: 'ERROR', cause: error.message });
  }
};

export { getAllusers, userSignup };
