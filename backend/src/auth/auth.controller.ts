import { Controller, Get, UseGuards, Request, Res } from '@nestjs/common';
import { Response } from 'express';
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

  @Get('spotify-url')
  getSpotifyAuthUrl(@Res() res: Response) {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const redirectUri = 'http://192.168.0.215:3000/auth/spotify/callback';
    console.log(redirectUri);
    const scopes = 'user-read-private user-read-email';
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&scope=${encodeURIComponent(scopes)}`;

    return res.json({ authUrl });
  }
}
