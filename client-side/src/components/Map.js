import { GoogleMap, MarkerF, InfoWindowF, useLoadScript } from "@react-google-maps/api";
import { useState, useRef, useEffect } from "react";
import { useQuery } from '@apollo/client';
import { QUERY_FOUNTAINS } from "../utils/queries";
import SlideUp from './slideup';
import { BottomSheet } from 'react-spring-bottom-sheet'
import { Button, Col, Container, Card, Form, Row } from "react-bootstrap";
import { searchCoords } from "../utils/API";
import 'react-spring-bottom-sheet/dist/style.css'

export const Map = () => {
  const mapRef = useRef(null)
  
  const google = window.google ? window.google : {};
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || '',
  });
  
  const [position, setPosition] = useState({
    lat: 30.27,
    lng: -97.74
  })
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();

  const [searchInput, setSearchInput] = useState('');
  
  const { loading, data } = useQuery(QUERY_FOUNTAINS);
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }, [])

  const markers = data?.fountains || [];

  const onMapLoad = (map) => {
    mapRef.current = map;
    markers?.forEach(({ lat, lng }) => {
      const latt = parseFloat(lat)
      const lon = parseFloat(lng)
      bounds?.extend({ latt, lon })
    });
  };

  const handleMarkerClick = (id, lat, lng, address) => {
    mapRef.current?.panTo({ lat, lng });
    setInfoWindowData({ id, address });
    setIsOpen(true);
  };

  const handleCenter = () => {
    if (!mapRef.current) return
    const newPos = mapRef?.current.getCenter().toJSON();
    setPosition(newPos)
  };

  const handleFormSubmit = async (e) => {
    if (!searchInput) {
      return false;
    } 
      try {
        e.preventDefault();
        let urlArray = '';
        var address = searchInput.split(' ');

        for (let x=0; x < address.length; x++) {
          urlArray +=(address[x]+"%20");
          urlArray.toString();
        }
        const response = await searchCoords(urlArray);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const { results } = await response.json();
        
        let lat = results[0].position.lat;
        let lng = results[0].position.lon;

        setPosition({lat, lng});
        setSearchInput('');
      } catch (err) {
        console.error(err);
    }
  }

  const [open] = useState(true);

  const cards = data?.fountains || [];

  const popHeight = 670;

  return (
    <div className="Map">
      {!isLoaded && markers.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          onLoad={onMapLoad}
          onDragEnd={handleCenter}
          center={position}
          zoom={13.5}
          onClick={() => setIsOpen(false)}
        >
          {markers.map((item, i) => (
            <MarkerF
              key={i}
              position={{ lat: parseFloat(item.lat), lng: parseFloat(item.lng) }}
              icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
              onClick={() => {
                handleMarkerClick(i, parseFloat(item.lat), parseFloat(item.lng), item.address);
              }}
            >
              {isOpen && infoWindowData?.id === i && (
                <InfoWindowF
                  onCloseClick={() => {
                    setIsOpen(false);
                  }}>
                  <h4>{infoWindowData.address}</h4>
                </InfoWindowF>
              )}
            </MarkerF>
          ))}
        </GoogleMap>
      )}
      <>
      <BottomSheet className='slideup'
      blocking = {false}
        open={open}
        header={
           <Container className="mt-5">
           <Row>
             <Col>
             <Form className="d-flex" onSubmit={handleFormSubmit}>
              <Form.Control
                type="text"
                placeholder="Search"
                className="me-2"
                name="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                />
                 <Button>
                   Search
                 </Button>
               </Form>
             </Col>
           </Row>
         </Container>
        }
        snapPoints={({ maxHeight }) => {
          return [maxHeight - popHeight, maxHeight - 200];
        }}
      >
        {cards.map(({_id, place, address}) => {
          return (
          <Col mb="4">
            <Card key={_id} border='dark'>
              <Card.Body>
                <Card.Title>{address}</Card.Title>
                <Card.Text>{place}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          )
        })}
      </BottomSheet>
    </>
    <SlideUp isOpen = {isOpen} data = {infoWindowData} onClose = {() => setIsOpen(false)} />
    </div>
  );
};