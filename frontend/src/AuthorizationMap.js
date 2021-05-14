// TODO: Remove this line when the file is more properly implemented.
/* eslint-disable */
import React, { Component } from "react";
import L from "leaflet";
import axios from 'axios';
import LeafletWms from "leaflet.wms";
import scriptLoader from "react-async-script-loader";
import ReactDOMServer from "react-dom/server";
import "leaflet.markercluster";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "./vendor/leaflet/leaflet-measure/leaflet-measure.css";
import "./vendor/leaflet/mouse-coordinates/leaflet.mousecoordinate";
import "./vendor/leaflet/grouped-layer-control/leaflet.groupedlayercontrol.min";
import { PIN } from "./assets";

/**
 * @class AuthorizationMap.js is a Leaflet Map component.
 */
export const baseMapsArray = ["World Topographic Map", "World Imagery"];

export const admininstrativeBoundariesLayerArray = [
  "BC Mine Regions",
  "Natural Resource Regions"
];

export const roadLayerArray = ["Roads DRA", "Forest Tenure Roads"];

export const tenureLayerArray = [
  "Coal Licence Applications",
  "Coal Leases",
  "Coal Licences",
  "Mining Leases",
  "Mineral Claims",
  "Placer Leases",
  "Placer Claims",
  "Crown Granted Mineral Claims"
];

export const tenureLayerStyles = {
  "Crown Granted Mineral Claims": {
    color: "#A83800",
    fillOpacity: 0,
    width: 1
  },
  "Coal Licence Applications": {
    color: "#5C5C5C",
    fillOpacity: 0,
    width: 1
  },
  "Coal Leases": {
    fillColor: "#858585",
    color: "#FFFFFF",
    fillOpacity: 0.75,
    width: 1
  },
  "Coal Licences": {
    fillColor: "#C2C2C2",
    color: "#FFFFFF",
    fillOpacity: 0.75,
    width: 1
  },
  "Mining Leases": {
    color: "#E600A9",
    width: 1,
    fillOpacity: 0
  },
  "Mineral Claims": {
    fillColor: "#FF73DF",
    color: "#FFFFFF",
    fillOpacity: 0.75,
    width: 1
  },
  "Placer Leases": {
    color: "#5200CC",
    fillOpacity: 0,
    width: 1
  },
  "Placer Claims": {
    fillColor: "#751AFF",
    color: "#FFFFFF",
    fillOpacity: 0.75,
    width: 1
  }
};

const leafletWMSTiledOptions = {
  transparent: true,
  tiled: true,
  uppercase: true,
  format: "image/png"
};

const SELECTED_ICON = L.icon({
  iconUrl: PIN,
  iconSize: [60, 60]
});
const UNSELECTED_ICON = L.icon({ iconUrl: PIN, iconSize: [60, 60] });

// Override global Leaflet.WMS Layer request to return data
// into an HTML format so that it renders properly in the iframe
// Disabling Eslint because this is an extension of an internal method
/* eslint-disable */
LeafletWms.Source = LeafletWms.Source.extend({
  getFeatureInfoParams(point, layers) {
    // Hook to generate parameters for WMS service GetFeatureInfo request
    let wmsParams;
    let overlay;
    if (this.options.untiled) {
      // Use existing overlay
      wmsParams = this._overlay.wmsParams;
    } else {
      // Create overlay instance to leverage updateWmsParams
      overlay = this.createOverlay(true);
      overlay.updateWmsParams(this._map);
      wmsParams = overlay.wmsParams;
      wmsParams.layers = layers.join(",");
    }
    const infoParams = {
      request: "GetFeatureInfo",
      info_format: "text/html",
      query_layers: layers.join(","),
      X: point.x,
      Y: point.y
    };
    return L.extend({}, wmsParams, infoParams);
  },
  parseFeatureInfo: function(result, url) {
    // Hook to handle parsing AJAX response
    if (result == "error") {
      // AJAX failed, possibly due to CORS issues.
      // Try loading content in <iframe>.
      result = "<iframe src='" + url + "' style='width:380px'>";
    }
    return result;
  },
  showFeatureInfo: function(latlng, info) {
    // Hook to handle displaying parsed AJAX response to the user
    if (!this._map) {
      return;
    }
    this._map.openPopup(info, latlng, { className: "leaflet-wms-popup" });
  }
});

const getFirstNationLayer = () => {
  const firstNationSource = LeafletWms.source(
    ENVIRONMENT.firstNationsLayerUrl,
    leafletWMSTiledOptions
  );
  return firstNationSource.getLayer(
    "WHSE_ADMIN_BOUNDARIES.PIP_CONSULTATION_AREAS_SP"
  );
};

const getMajorMinePermittedAreas = () => {
  const majorMinesSource = LeafletWms.source(
    "https://openmaps.gov.bc.ca/geo/pub/WHSE_MINERAL_TENURE.HSP_MJR_MINES_PERMTTD_AREAS_SP/ows",
    { ...leafletWMSTiledOptions, identify: false }
  );
  return majorMinesSource.getLayer(
    "pub:WHSE_MINERAL_TENURE.HSP_MJR_MINES_PERMTTD_AREAS_SP"
  );
};

class AuthorizationMap extends Component {
  state = {
    currentMarker: null,
    lat: 53.7267,
    long: -127.7384,
    zoom: 6,
    active: "authorization"
  };

  componentDidMount() {
    // Create the basic leaflet map
    this.map = L.map("leaflet-map", {
      attributionControl: false,
      center: [this.state.lat, this.state.long],
      zoom: this.state.zoom,
      worldCopyJump: true,
      zoomAnimationThreshold: 8,
      minZoom: 4
    });

    // this.fetchData();

    // Add Topographic BaseMap by default
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
    ).addTo(this.map);

    // Load external leaflet libraries for WebMap and Widgets
    this.handleMapInitiate(this.state.active)
  }

  handleMapInitiate = (button) => {
     this.asyncScriptStatusCheck();

    // Add MinePin clusters
    this.addPinClusters(button);
  }

handleButtonClick = (button) => {
  this.handleMapInitiate(button);
}

  asyncScriptStatusCheck = () => {
    if (this.props.isScriptLoaded && this.props.isScriptLoadSucceed) {
      // Add the widgets and the WebMap once the external libraries are loaded
      // this.addWidgets();
      // this.initWebMap();
    } else {
      setTimeout(this.asyncScriptStatusCheck, 200);
    }
  };

  createPin = (data) => {
    const marker = L.marker([data.latitude, data.longitude]).bindPopup(
      "Loading..."
    );

    let icon = UNSELECTED_ICON;
    // if (this.props.mineGuid === mine.mine_guid) {
    //   icon = SELECTED_ICON;
    //   this.setState({ currentMarker: marker });
    // }
    marker.setIcon(icon);

    this.markerClusterGroup.addLayer(marker);
    marker.on("click", this.handlePinClick(data));
  };

  handlePinClick = data => e => {
    console.log(data);
    if (this.state.currentMarker) {
      this.state.currentMarker.setIcon(UNSELECTED_ICON);
    }
    e.target.setIcon(SELECTED_ICON);
    this.setState({ currentMarker: e.target });

    const popup = e.target.getPopup();
    popup.setContent(this.renderPopup(data));
  };

  addPinClusters = (button) => {
    // Add Clustered MinePins
    this.markerClusterGroup = L.markerClusterGroup({ animate: false });

    axios
      .get(`http://localhost:3000/${button}`)
      .then(res => {
        this.setState({active: button})
        res.data.map(this.createPin);
        console.log(res)
      })
      .catch(error => {
        console.log(error);
      });
    // this.createPin();
    this.map.addLayer(this.markerClusterGroup);
  };

  addWidgets = () => {
    // Add Mouse coordinate widget
    L.control
      .mouseCoordinate({ utm: true, position: "topright" })
      .addTo(this.map);

    // Add ScaleBar widget
    L.control.scale({ imperial: false }).addTo(this.map);

    // Add Measure widget
    const measureControl = new L.Control.Measure({
      position: "topright",
      primaryLengthUnit: "kilometers",
      activeColor: "#3c3636",
      completedColor: "#5e46a1"
    });
    measureControl.addTo(this.map);
  };

  addWebMapLayers = () => {
    const majorMinePermittedAreas = getMajorMinePermittedAreas();
    this.map.addLayer(majorMinePermittedAreas);
    const groupedOverlays = {
      Authorizations: {
        Authorizations: this.markerClusterGroup,
        "Major Mine Permitted Areas": majorMinePermittedAreas
      },
      Roads: this.getLayerGroupFromList(roadLayerArray),
      "Natural Features": {
        "NTS Contour Lines": this.getLayerGroupFromList(["NTS Contour Lines"])
      },
      "Mineral, Placer, and Coal Tenures": this.getLayerGroupFromList(
        tenureLayerArray
      ),
      "Administrative Boundaries": this.getLayerGroupFromList(
        admininstrativeBoundariesLayerArray
      ),
      "First Nations": {
        "Indian Reserves and Band Names": this.getLayerGroupFromList([
          "Indian Reserves and Band Names"
        ]),
        "First Nations PIP Consultation Areas": getFirstNationLayer()
      }
    };

    L.control
      .groupedLayers(this.getLayerGroupFromList(baseMapsArray), groupedOverlays)
      .addTo(this.map);
  };

  getLayerGroupFromList = groupLayerList => {
    const result = {};
    const layerList = this.webMap.layers;
    groupLayerList.forEach(groupLayer => {
      layerList.forEach(layer => {
        if (layer.title === groupLayer) {
          result[groupLayer] = layer.layer;

          if (tenureLayerArray.includes(layer.title)) {
            const subLayers = layer.layer._layers;

            for (const layerID in subLayers) {
              let flLayer = subLayers[layerID];
              flLayer = Object.create(flLayer);

              flLayer.__proto__.setStyle(function(feature) {
                return tenureLayerStyles[layer.title];
              });
            }
          }
        }
      });
    });
    return result;
  };

  initWebMap() {
    // Fetch the WebMap
    this.webMap = window.L.esri.webMap("803130a9bebb4035b3ac671aafab12d7", {
      map: this.map
    });

    // Once the WebMap is loaded, add the rest of Layers and tools
    this.webMap.on("load", () => {
      // Add the WebMap layers and the Layer control widget
      this.addWebMapLayers();

      // Esri WebMap resets the zoom level, zoom back to props coordinates after they're done loading
      const resetZoomCheckID = setInterval(() => {
        if (this.map.getZoom() !== this.state.zoom) {
          this.map.setView(
            [this.state.lat, this.state.long],
            this.state.zoom,
            true
          );

          // Stop checking
          clearInterval(resetZoomCheckID);
        }
      }, 5);
    });
  }

  renderPopup = (data) => {
    console.log(data);
    return ReactDOMServer.renderToStaticMarkup(<div style={{overflow: "auto"}}>{JSON.stringify(data, null)}</div>);
  };

  render() {
    return (
      <div>
        <div className="btn-group button-group-center">
  <a href="#authorization" className="btn btn-primary" aria-current="page" active={this.state.active === "authorization"} onClick={(event) => this.handleButtonClick("authorization")}>Authorization</a>
  <a href="#nrced" className="btn btn-primary" active={this.state.active === "nrced"} onClick={(event) => this.handleButtonClick("nrced")}>NRCED Inspections</a>
  <a href="#application" className="btn btn-primary">Applications</a>
</div>
      <div
        style={{ height: "91.5vh", width: "100%", zIndex: 0, bottom: 0, position: "absolute" }}
        id="leaflet-map"
      />
      </div>
    );
  }
}

export default scriptLoader(
  [],
  // Load Esri Leaflet
  "https://unpkg.com/esri-leaflet@2.3.0/dist/esri-leaflet.js",
  // Load Esri Leaflet Renderers
  "https://cdn.jsdelivr.net/leaflet.esri.renderers/2.0.2/esri-leaflet-renderers.js",
  // Load Leaflet Omnivore
  "https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-omnivore/v0.3.1/leaflet-omnivore.min.js",
  // // Load Leaflet esri webMap
  "http://127.0.0.1:3001/src/vendor/leaflet/esri-leaflet-webmap/esri-leaflet-webmap.js",
  // // Load Leaflet measure
  "http://127.0.0.1:3001/src/vendor/leaflet/leaflet-measure/leaflet-measure.en.js"
)(AuthorizationMap);
