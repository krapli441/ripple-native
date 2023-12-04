export class LocationDto {
  readonly type: string = 'Point';
  readonly coordinates: number[];
}

export class CreateRippleDto {
  readonly userId: string;
  readonly userObjectId: string;
  readonly title: string;
  readonly artist: string;
  readonly albumCoverUrl: string;
  readonly spotifyExternalUrl: string;
  readonly location: LocationDto;
  readonly tag: string[];
  readonly isActive: boolean;
  readonly expiresAt: Date;
  readonly likesUsers: string[];
}
