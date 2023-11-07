export class LocationDto {
  readonly latitude: number;
  readonly longitude: number;
}

export class CreateRippleDto {
  readonly title: string;
  readonly artist: string;
  readonly albumCoverUrl: string;
  readonly spotifyExternalUrl: string;
  readonly location: LocationDto;
  readonly tag: string[];
  readonly likes: number;
  readonly createdAt: Date;
  readonly expiresAt: Date;
}
