#import <Foundation/Foundation.h>
#import <EXUpdates/EXUpdatesAppController.h>
#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

#import <UMCore/UMAppDelegateWrapper.h>
#import <UserNotifications/UNUserNotificationCenter.h>

#import <UserNotifications/UserNotifications.h>
#import <RNCPushNotificationIOS/RNCPushNotificationIOS.h>

@interface AppDelegate : UMAppDelegateWrapper <RCTBridgeDelegate, EXUpdatesAppControllerDelegate, UNUserNotificationCenterDelegate>

@end


