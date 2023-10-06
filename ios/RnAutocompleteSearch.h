
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNRnAutocompleteSearchSpec.h"

@interface RnAutocompleteSearch : NSObject <NativeRnAutocompleteSearchSpec>
#else
#import <React/RCTBridgeModule.h>

@interface RnAutocompleteSearch : NSObject <RCTBridgeModule>
#endif

@end
