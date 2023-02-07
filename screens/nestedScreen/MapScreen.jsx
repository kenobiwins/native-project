import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = ({ route }) => {
  // const [currentLocation, setCurrentLocation] = useState(null);
  const [marker, setMarker] = useState(null);
  useEffect(() => {
    if (route.params) {
      setMarker(route.params.photoLocation);
      // setCurrentLocation(route.params.currentLocation);
    }
  }, [route.params]);

  if (!marker) {
    return;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: marker.latitude,
          longitude: marker.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.006,
          }}
          title={route.params.regionName}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
