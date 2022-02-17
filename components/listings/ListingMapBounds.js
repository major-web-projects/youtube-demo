import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFqb3J3ZWIiLCJhIjoiY2tyaXYweHU2MnpjdjJ2cXUzcTU1eGhndiJ9.t1kD_xyUdNgcdjCgnmssZg";

const ListingMap = ({ locations = [], zoomInit = 9 }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [coords, setCoords] = useState(locations);
  const [zoom, setZoom] = useState(zoomInit);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: coords[0].coordinates,
      zoom: zoom,
      // interactive: false,
    });
    // new mapboxgl.Marker().setLngLat(coordinates).addTo(map.current);
    if (coords.length > 1) {
      const bounds = new mapboxgl.LngLatBounds();

      coords.forEach((loc) => {
        new mapboxgl.Marker().setLngLat(loc.coordinates).addTo(map.current);

        bounds.extend(loc.coordinates);
      });

      map.current.fitBounds(bounds, {
        padding: { top: 100, bottom: 150, left: 100, right: 50 },
      });
    }
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
        ref={mapContainer}
        className="map-container"
        // style={{
        //   height: "400px",
        // }}
      />
    </div>
  );
};

export default ListingMap;
