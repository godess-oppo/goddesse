import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(data: { email: string; password: string; firstName: string; lastName: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...data,
        passwordHash: hashedPassword,
      },
    });
    
    const token = this.jwtService.sign({ id: user.id });
    return { user: { ...user, passwordHash: undefined }, token };
  }

  async login(data: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    
    if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const token = this.jwtService.sign({ id: user.id });
    return { user: { ...user, passwordHash: undefined }, token };
  }

  async validateUser(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, firstName: true, lastName: true, role: true },
    });
  }
}
