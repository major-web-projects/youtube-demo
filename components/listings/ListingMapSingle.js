import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFqb3J3ZWIiLCJhIjoiY2tyaXYweHU2MnpjdjJ2cXUzcTU1eGhndiJ9.t1kD_xyUdNgcdjCgnmssZg";

const ListingMapSingle = ({ coordinates = [], zoomInit = 9 }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [coords, setCoords] = useState(coordinates);
  const [zoom, setZoom] = useState(zoomInit);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: coords,
      zoom: zoom,
      // interactive: false,
    });
    new mapboxgl.Marker().setLngLat(coordinates).addTo(map.current);
  }, [coords]);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

    map.current.on("move", () => {
      setCoords([
        map.current.getCenter().lng.toFixed(4),
        map.current.getCenter().lat.toFixed(4),
      ]);
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);

  return (
    <div>
      <div
        className="sidebar"
        // style={{
        //   backgroundColor: "rgba(35, 55, 75, 0.9)",
        //   color: "#ffffff",
        //   padding: "6px 12px",
        //   fontFamily: "monospace",
        //   zIndex: 1,
        //   position: "absolute",
        //   top: 0,
        //   left: 0,
        //   margin: "12px",
        //   borderRadius: "4px",
        // }}
      >
        Longitude: {coords[0]} | Latitude: {coords[1]} | Zoom: {zoom}
      </div>
      <div
        ref={mapContainer}
        className="map-container"
        // style={{
        //   height: "400px",
        // }}
      />
    </div>
  );
};

export default ListingMapSingle;
