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
    BackgroundGeolocation.ready({
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      stopOnTerminate: false,
      startOnBoot: true,
      debug: true,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
    }, (state) => {
      console.log('[BackgroundGeolocation] ready: ', state);
      if (!state.enabled) {
        BackgroundGeolocation.start();
      }
    });

    // 위치 업데이트 리스너 등록
    BackgroundGeolocation.onLocation(
      (location: Location) => {
        console.log('[Location] ', location);
      },
      (error: LocationError) => {
        console.warn('[Location Error] ', error);
      }
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
