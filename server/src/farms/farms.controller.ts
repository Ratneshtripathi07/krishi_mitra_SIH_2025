import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    ParseUUIDPipe,
} from '@nestjs/common';
import { FarmsService } from './farms.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Farms')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('farms')
export class FarmsController {
    constructor(private readonly farmsService: FarmsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new farm for the logged-in user' })
    create(@GetUser('sub') userId: string, @Body() createFarmDto: CreateFarmDto) {
        return this.farmsService.create(userId, createFarmDto);
    }

    @Get()
    @ApiOperation({ summary: "Get all of the logged-in user's farms" })
    findAll(@GetUser('sub') userId: string) {
        return this.farmsService.findAllByUser(userId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific farm by its ID' })
    findOne(
        @GetUser('sub') userId: string,
        @Param('id', ParseUUIDPipe) id: string,
    ) {
        return this.farmsService.findOne(userId, id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a specific farm' })
    update(
        @GetUser('sub') userId: string,
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateFarmDto: UpdateFarmDto,
    ) {
        return this.farmsService.update(userId, id, updateFarmDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a specific farm' })
    remove(
        @GetUser('sub') userId: string,
        @Param('id', ParseUUIDPipe) id: string,
    ) {
        return this.farmsService.remove(userId, id);
    }
  }