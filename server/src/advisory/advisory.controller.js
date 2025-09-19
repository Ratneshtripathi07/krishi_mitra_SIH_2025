// import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common'
// import { AdvisoryService } from './advisory.service'
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
// @Controller('advisory')
// @UseGuards(JwtAuthGuard)
// export class AdvisoryController {
//     constructor(private readonly advisoryService: AdvisoryService) { }
//     @Get()
//     findAll(@Request() req) {
//         return this.advisoryService.findAllForUser(req.user.userId)
//     }
//     @Get(':id')
//     findOne(@Param('id') id: string) {
//         return this.advisoryService.findOne(+id)
//     }
//     @Post('generate')
//     generateAdvice(@Request() req, @Body() body: { cropType: string; location: string }) {
//         return this.advisoryService.generateAdvice(req.user.userId, body.cropType, body.location)
//     }
// }
