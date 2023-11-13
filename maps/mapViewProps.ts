import MapStyle from './customMapStyle.json';

export const mapViewProps = {
  customMapStyle: MapStyle,
  mapPadding: {bottom: 90, top: 0, right: 0, left: 0},
  scrollEnabled: false,
  zoomEnabled: true,
  rotateEnabled: true,
  minZoomLevel: 15,
  maxZoomLevel: 20,
  showsScale: false,
  pitchEnabled: false,
  cacheEnabled: true,
  loadingEnabled: true,
};
