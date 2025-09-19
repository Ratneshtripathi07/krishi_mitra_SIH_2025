// import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common'
// import { CropCyclesService } from './crop-cycles.service'
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

// @Controller('crop-cycles')
// @UseGuards(JwtAuthGuard)
// export class CropCyclesController {
//     constructor(private readonly cropCyclesService: CropCyclesService) { }

//     @Post()
//     create(@Request() req, @Body() createCropCycleDto: any) {
//         return this.cropCyclesService.create(req.user.userId, createCropCycleDto)
//     }

//     @Get()
//     findAll(@Request() req) {
//         return this.cropCyclesService.findAllForUser(req.user.userId)
//     }

//     @Get(':id')
//     findOne(@Param('id') id: string) {
//         return this.cropCyclesService.findOne(+id)
//     }

//     @Patch(':id')
//     update(@Param('id') id: string, @Body() updateCropCycleDto: any) {
//         return this.cropCyclesService.update(+id, updateCropCycleDto)
//     }

//     @Delete(':id')
//     remove(@Param('id') id: string) {
//         return this.cropCyclesService.remove(+id)
//     }
// }