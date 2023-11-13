import MapStyle from './customMapStyle.json';

export const mapViewProps = {
  customMapStyle: MapStyle,
  mapPadding: {bottom: 0, top: 20, right: 0, left: 0},
  scrollEnabled: false,
  zoomEnabled: false,
  rotateEnabled: false,
  minZoomLevel: 17,
  maxZoomLevel: 20,
  showsScale: false,
  pitchEnabled: false,
  cacheEnabled: true,
  loadingEnabled: true,
};
