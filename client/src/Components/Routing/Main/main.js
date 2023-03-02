import './main.css';
import Spinner from '../../../Spinner'
import Info from './Info/info'
import { useMemo } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api"
import Battery from '../../../Assets/batteryRed16.png'




function Main() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, //data for this information is hidden to protect my google account API KEY
  });
  const mapOptions = {
    fullscreenControl: false,
  };


  if (!isLoaded) {
    return <Spinner />
  }
  return <MapContainer />

  function MapContainer() {
    const center = useMemo(() => ({ lat: 45.57, lng: -73.48 }), []);

    return (
      <GoogleMap zoom={9} center={center} options={mapOptions} mapContainerClassName="MapContainer" >
        <Info />
        <MarkerF position={center}  icon={Battery}/>
      </GoogleMap>
    )
  }
}

export default Main;