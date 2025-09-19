import { Controller, Get, Body, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto'; // We'll create this DTO

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get the profile of the currently logged-in user' })
  getProfile(@GetUser('sub') userId: string) {
    return this.usersService.findById(userId);
  }

  @Patch('me')
  @ApiOperation({
    summary: 'Update the profile of the currently logged-in user',
  })
  updateProfile(
    @GetUser('sub') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    // We will need to create the UpdateUserDto and add the update logic to the service
    return this.usersService.update(userId, updateUserDto);
  }
}

//----------------------------------------------------------------------------------------------

// import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
// import { UsersService } from './users.service'
// import { CreateUserDto } from './dto/create-user.dto'
// import { UpdateUserDto } from './dto/update-user.dto'
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

// @Controller('users')
// @UseGuards(JwtAuthGuard)
// export class UsersController {
//     constructor(private readonly usersService: UsersService) { }

//     @Post()
//     create(@Body() createUserDto: CreateUserDto) {
//         return this.usersService.create(createUserDto)
//     }

//     @Get()
//     findAll() {
//         return this.usersService.findAll()
//     }

//     @Get(':id')
//     findOne(@Param('id') id: string) {
//         return this.usersService.findById(+id)
//     }

//     @Patch(':id')
//     update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
//         return this.usersService.update(+id, updateUserDto)
//     }

//     @Delete(':id')
//     remove(@Param('id') id: string) {
//         return this.usersService.remove(+id)
//     }
// }
