#import "AppDelegate.h"
#import <GoogleMaps/GoogleMaps.h>
#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [GMSServices provideAPIKey:@"AIzaSyAKjCsYhVGRmvf8crfUxnOMZu0aY8aJYsw"];

  

  self.moduleName = @"ripple";
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

 - (BOOL) application: (UIApplication *) application
 continueUserActivity: (nonnull NSUserActivity *)userActivity
   restorationHandler: (nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
  {
    if ([userActivity.activityType isEqualToString:NSUserActivityTypeBrowsingWeb]) {
      if (self.authorizationFlowManagerDelegate) {
        BOOL resumableAuth = [self.authorizationFlowManagerDelegate resumeExternalUserAgentFlowWithURL:userActivity.webpageURL];
        if (resumableAuth) {
          return YES;
        }
      }
    }
    return [RCTLinkingManager application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
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
