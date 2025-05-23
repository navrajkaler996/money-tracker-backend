import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(user: any) {
    try {
      const userExists = await this.prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (userExists?.email) {
        throw new Error(`User already exists with email ${user.email}`);
      }

      const newUser = await this.prisma.user.create({ data: user });

      const payload = { sub: newUser.id, email: newUser.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
        user: newUser,
      };
    } catch (error) {
      throw new Error(`Error creating new user: ${error.message}`);
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      email: user.email,
      first_name: user.first_name,
      id: user.id,
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
