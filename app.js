import React,{useState,useEffect} from'react';
import {CssBaseline} from '@material-ui/core';
import {Grid} from '@material-ui/core';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import PlaceDetail from './components/PlaceDetail/PlaceDetail';
import { getPlaceData } from './api/models';

const App=()=>{

    const [type, setType] = useState('restaurants') ;
    const [rating, setRating] = useState('0') ;

    const [places,setPlaces]=useState([]);
    const [childClicked,setChildClicked]=useState(null);

    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [autocomplete, setAutocomplete] = useState(null);
    const[coordinates,setCoordinates]=useState({});
    const[bounds,setBounds]=useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
            setCoordinates({lat:latitude,lng:longitude});

        })

    },[])

    // useEffect(() => {
    //     const filtered = places.filter((place) => Number(place.rating) > rating);
    
    //     setFilteredPlaces(filtered);
    //   }, [rating]);
    

    useEffect(()=>{

        setIsLoading(true);
        
        getPlaceData(bounds.sw, bounds.ne).then((data)=>{
            //console.log(data);
            setPlaces(data);//.filter((place) => place.name && place.num_reviews > 0));
            setIsLoading(false);
        })
    }
    ,[bounds,coordinates]);

    // const onLoad = (autoC) => setAutocomplete(autoC);

    // const onPlaceChanged = () => {
    //     const lat = autocomplete.getPlace().geometry.location.lat();
    //     const lng = autocomplete.getPlace().geometry.location.lng();
    
    //     setCoordinates({ lat, lng });
    //   };
    
    return(
        <>
        <CssBaseline />
        <Header />
        <Grid container spacing ={3} style={{width:'100%'}}>
            <Grid item xs={12} md={4}>
                <List 
                    places={places}
                    childClicked={childClicked}
                    isLoading={isLoading}
                />
            </Grid> 
            <Grid item xs={12} md={4}>
                <Map 
                setCoordinates={setCoordinates}
                setBounds={setBounds}
                coordinates={coordinates}
                places={places}
                setChildClicked={setChildClicked}
                
            /></Grid>
        </Grid>
        </>
    );
}

export default App;
