#import "AppDelegate.h"
#import <GoogleMaps/GoogleMaps.h>
#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [GMSServices provideAPIKey:@"AIzaSyAKjCsYhVGRmvf8crfUxnOMZu0aY8aJYsw"];

  // 커스텀 스타일 적용
  GMSMapID *mapID = [[GMSMapID alloc] initWithMapID:@"your_custom_map_id_here"];
  GMSMapView *mapView = [GMSMapView mapWithFrame:CGRectZero mapID:mapID camera:camera];

  NSError *error;
  NSString *style = @"d0d7c500142e631f";
  GMSMapStyle *mapStyle = [GMSMapStyle styleWithJSONString:style error:&error];

  if (!mapStyle) {
    NSLog(@"스타일 문자열 오류: %@", [error localizedDescription]);
  } else {
    mapView.mapStyle = mapStyle;
  }

  self.moduleName = @"ripple";
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
