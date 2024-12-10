import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;
    
    const existingUser = await this.userModel.findOne({
      $or: [{ username }, { email }],
    });
    
    if (existingUser) {
      throw new UnauthorizedException('Username or email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({
      username,
      email,
      password: hashedPassword,
      lastLogin: new Date(),
    });

    await user.save();
    return { message: 'User registered successfully' };
  }

  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    user.lastLogin = new Date();
    await user.save();

    return { token };
  }

  async getUserInfo(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const lastLogin = new Date(user.lastLogin);
    const now = new Date();
    const hoursSinceLogin = (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60);

    if (hoursSinceLogin >= 8) {
      throw new UnauthorizedException('Session expired, please login again');
    }

    return {
      username: user.username,
      email: user.email,
      lastLogin: user.lastLogin,
    };
  }

  async getAllUsers() {
    const users = await this.userModel.find().select('username email lastLogin -_id');
    return users;
  }
}