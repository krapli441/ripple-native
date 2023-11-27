// useBackgroundLocation.ts
import {useEffect} from 'react';
import BackgroundGeolocation, {
  Location,
  HttpEvent,
  LocationError,
} from 'react-native-background-geolocation';

const useBackgroundLocation = () => {
  useEffect(() => {
    // 위치 서비스 구성
    BackgroundGeolocation.ready(
      {
        locationAuthorizationRequest: 'WhenInUse',
        locationAuthorizationAlert: {
          titleWhenNotEnabled: '위치 서비스가 필요합니다',
          titleWhenOff: '위치 서비스가 꺼져 있습니다',
          instructions:
            "앱 설정으로 이동하여 위치 접근 권한을 '항상'으로 설정해주세요.",
          cancelButton: '취소',
          settingsButton: '설정',
        },
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 0,
        heartbeatInterval: 5,
        stopOnTerminate: false,
        startOnBoot: true,
        debug: true,
        logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      },
      state => {
        console.log('[BackgroundGeolocation] ready: ', state);
        if (!state.enabled) {
          BackgroundGeolocation.start();
        }
      },
    );

    // 위치 업데이트 리스너 등록
    BackgroundGeolocation.onLocation(
      (location: Location) => {
        console.log('[Location] ', location);
      },
      (error: LocationError) => {
        console.warn('[Location Error] ', error);
      },
    );

    // HTTP 리스너 등록
    BackgroundGeolocation.onHttp((response: HttpEvent) => {
      console.log('[HTTP] ', response);
      if (!response.success) {
        console.warn('[HTTP Error] ', response);
      }
    });

    // 앱이 종료될 때 리스너 해제
    return () => {
      BackgroundGeolocation.removeListeners();
    };
  }, []);
};

export default useBackgroundLocation;
