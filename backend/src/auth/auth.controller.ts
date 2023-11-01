import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('spotify')
  @UseGuards(AuthGuard('spotify'))
  async spotifyAuth(@Request() req) {
    console.log('Spotify authentication started');
  }

  @Get('spotify/callback')
  @UseGuards(AuthGuard('spotify'))
  async spotifyAuthCallback(@Request() req) {
    console.log('Spotify authentication callback');
    console.log('User info:', req.user);
    return req.user;
  }
}
