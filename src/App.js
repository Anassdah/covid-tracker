
import './App.css';
import { FormControl, MenuItem, Select,Card, CardContent } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Map from "./Map";
import Infobox from './infobox';
import Table from './Table';
import { sortData } from './util';
import LineGraph from "./LineGraph"
import "leaflet/dist/leaflet.css";
function App() {
  //State=How to writ a variable in react
  //UserEfffect=Runs a piece of code on a given condition
  const[countries,setCountries]= useState([]);
  const[country,setCountry]=useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const[tableData,setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);
  useEffect(()=>{
    //asynch =send a request to a server and wait for it
    const getCountriesData = async () =>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data)=>{
        const countries = data.map((country)=>({
          name: country.country,
          value: country.countryInfo.iso2
        }));
        const sortedData=sortData(data);
        setTableData(sortedData);
        setCountries(countries);

      });
    };
    getCountriesData();

  }, []);
  const onCountryChange =async (event) =>{
    const countryCode= event.target.value;
    const url =
      countryCode === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);

      });

    


  };
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">

          <h1>Covid-Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant='outlined' onChange={onCountryChange} value={country}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {/*Loop Through all countries */}
              {
                countries.map(country=>(
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          {/*infobox corona cases*/}
          <Infobox
            title="Coronavirus cases" 
            cases={countryInfo.todayCases}
            total={countryInfo.cases}/>
          {/*infobox recovered*/}
          <Infobox
            title="Recovered"
            cases={countryInfo.todayRecovered} 
            total={countryInfo.recovered}/>
          {/*infobox*/}
          <Infobox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}/>


        </div>
        
        
        {/*Map*/}
        <Map
          center={MapCenter}
          zoom={MapZoom}
        />
     </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries ={tableData}/>
            <h3>Worldwide new cases </h3>
            <LineGraph />

          </div>
        </CardContent>
      </Card>
      
    </div>
  );
}

export default App;
