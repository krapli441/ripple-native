export declare class LocationDto {
    readonly type: string;
    readonly coordinates: number[];
}
export declare class CreateRippleDto {
    readonly userId: string;
    readonly userObjectId: string;
    readonly title: string;
    readonly artist: string;
    readonly albumCoverUrl: string;
    readonly spotifyExternalUrl: string;
    readonly location: LocationDto;
    readonly tag: string[];
    readonly likesUsers: string[];
}
