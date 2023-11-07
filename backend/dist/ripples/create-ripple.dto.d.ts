export declare class LocationDto {
    readonly latitude: number;
    readonly longitude: number;
}
export declare class CreateRippleDto {
    readonly userId: string;
    readonly title: string;
    readonly artist: string;
    readonly albumCoverUrl: string;
    readonly spotifyExternalUrl: string;
    readonly location: LocationDto;
    readonly tag: string[];
    readonly likes: number;
    readonly expiresAt: Date;
}
