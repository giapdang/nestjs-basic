import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('update-info')
  @ApiOperation({ summary: 'Update user info' })
  @ApiBody({ type: UpdateUserDto })
  @ApiBearerAuth()
  async updateOne(@Body() body: UpdateUserDto, @Req() req: any) {
    const { userId } = req.user;
    return await this.usersService.updateOne(userId, body);
  }
}
