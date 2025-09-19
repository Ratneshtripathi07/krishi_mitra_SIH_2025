import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User, Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { phoneNumber },
    });
  }

  // Updated to accept a role
  async createUser(phoneNumber: string, role?: Role): Promise<User> {
    return this.prisma.user.create({
      data: {
        phoneNumber,
        role: role || Role.FARMER, // Defaults to FARMER if not provided
      },
    });
  }

  async update(userId: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });
  }
}
