import React, { useRef } from "react";
import { GoogleMap, LoadScriptNext } from "@react-google-maps/api";
import "./GoogleMap.css";

interface GoogleMapComponentProps {
  location: { lat: number; lng: number };
  icon: string;
}

export const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  location, icon
}) => {

  const mapContainerStyle = {
    width: "80%",
    height: "400px",
  };

  const mapOptions = {
    zoom: 15,
    center: location,
    mapId: "94e52e0686a339c2",
  };

  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );

  const handleMapLoad = (map: google.maps.Map) => {
    if (window.google?.maps?.marker?.AdvancedMarkerElement) {
      const markerElement = document.createElement("img");
      markerElement.src = icon //"/img/yellow-card.png"; //icon//"/img/yellow-card.png";
      markerElement.style.width = "40px";
      markerElement.style.height = "40px";
      markerElement.alt = "Custom Marker";

      const advancedMarker =
        new window.google.maps.marker.AdvancedMarkerElement({
          position: location,
          map: map,
          content: markerElement,
          title: "Custom Marker",
        });

      advancedMarker.addListener("click", () => {
        const googleMapsUrl = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
        window.open(googleMapsUrl, "_blank");
      });


      if (advancedMarker) markerRef.current = advancedMarker;
    } else {
      console.error("AdvancedMarkerElement is not available.");
    }
  };

  return (
    <div className="maps-container">
      <LoadScriptNext
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? ""}
        libraries={["marker"]}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          options={mapOptions}
          onLoad={handleMapLoad}
        ></GoogleMap>
      </LoadScriptNext>
    </div>
  );
};
