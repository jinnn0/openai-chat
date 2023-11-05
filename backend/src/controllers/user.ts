import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User.js';
import { hash, compare } from 'bcrypt';
import { createToken } from '../utils/token-manager.js';
import { COOKIE_NAME } from '../utils/constants.js';

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

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(401)
        .send({ message: 'User already registered', name, email });

    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // First, remove the previous token of the user
    res.clearCookie(COOKIE_NAME),
      {
        path: '/',
        domain: 'localhost',
        httpOnly: true,
        signed: true,
      };

    // Create token
    const token = createToken(user._id.toString(), user.email, '7d');

    // Send token as a cookie
    const expires = new Date();
    expires.setDate(expires.getDate() + 7); // token should expire after 7 days of creation

    res.cookie(COOKIE_NAME, token, {
      path: '/',
      domain: 'localhost',
      expires,
      httpOnly: true,
      signed: true,
    });

    res.status(201).json({ message: 'OK', name: user.name, email: user.email });
  } catch (error) {
    console.log('catch error => ', error);
    res.status(500).json({ message: 'ERROR', cause: error.message });
  }
};

const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send('User not registered');
    }

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send('Incorrect Password');
    }

    console.log('userLogin user: ', user);
    // First, remove the previous token of the user
    res.clearCookie(COOKIE_NAME),
      {
        path: '/',
        domain: 'localhost',
        httpOnly: true,
        signed: true,
      };

    // Create token
    const token = createToken(user._id.toString(), user.email, '7d');

    // Send token as a cookie
    const expires = new Date();
    expires.setDate(expires.getDate() + 7); // token should expire after 7 days of creation

    res.cookie(COOKIE_NAME, token, {
      path: '/',
      domain: 'localhost',
      expires,
      httpOnly: true,
      signed: true,
    });

    res.status(200).json({ message: 'OK', name: user.name, email: user.email });
  } catch (error) {
    console.log('catch error => ', error);
    res.status(500).json({ message: 'ERROR', cause: error.message });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  console.log('verifyUser: ');
  try {
    // user token check
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res.status(401).send('User not registered OR Token malfunctioned');
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    return res
      .status(200)
      .json({ message: 'OK', name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: 'ERROR', cause: error.message });
  }
};

export const userLogout = async (req: Request, res: Response) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send('User not registered OR Token malfunctioned');
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: 'localhost',
      signed: true,
      path: '/',
    });

    return res
      .status(200)
      .json({ message: 'OK', name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: 'ERROR', cause: error.message });
  }
};

export { getAllusers, userSignup, userLogin };
