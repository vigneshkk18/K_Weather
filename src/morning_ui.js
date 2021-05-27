
/*content-part*/
import sun from './assets/sun.svg';
import cloud from './assets/cloud.svg';
import Blueballoon from './assets/balloonblue.svg';
import MiddlePart from './assets/middlepart.svg';
import leftmiddle from './assets/leftmiddle.svg';
import rightmiddle from './assets/rightmiddle.svg';
import GreenBalloon from './assets/balloongreen.svg';
import RedBalloon from './assets/balloonred.svg';
import BigBlueBalloon from './assets/bigblueballoon.svg';
import music_1 from './assets/music_1.svg';
import No_Internet from './assets/No-Internet.svg';

/*value-part*/
import thermometer from './assets/thermometer.svg';
import atmospressure from './assets/atmos-pressure.svg';
import humiditymeter from './assets/humidity-meter.svg';
import Wind from './assets/Wind.svg';

/*bottom-part*/
import Play from './assets/Play.svg';
import searchicon from './assets/searchicon.png';
import Close from './assets/Close.svg';

import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

import './morning_ui.css';

import { useState, useEffect } from 'react';

export default function Morning(){

	const [ searched, setsearched ] = useState(false);
	const [ audio, setaudio ] = useState(false);
	const [ content, setcontent ] = useState(false);

	var synthesizer = window.speechSynthesis;
	const [ selectedCountry, setselectedCountry ] = useState(null);
	const [ selectedState, setselectedState ] = useState(null);
	const [ selectedCity, setselectedCity ] = useState(null);

	const [ countries, setcountries ] = useState([]);
	const [ states, setstates ]= useState([]);
	const [ cities, setcities ] = useState([]);

	const [ Weather, setWeather ] = useState({
						"main":{
							"temp":0,
							"pressure":0,
							"humidity":0,
							"sea_level":0}
						,"wind":{
							"speed":0}
						,
						"name":""
					});

	/* Check for Internet Connection after certain interval */
	useEffect(() => {
		const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
			if(window.navigator.onLine===false){
				document.getElementsByClassName('Connection-div')[0].style.display = 'flex';
			}else{
				document.getElementsByClassName('Connection-div')[0].style.display = 'none';
			}
		}, 5000)

   	 	return () => clearInterval(intervalId); //This is important
	 
	});


	useEffect(()=>{
			/* I have used api.countrystatecity.in api for all the country, state, city details */
			var headers = new Headers();
			headers.append("X-CSCAPI-KEY", 'Your API Token');

			var requestOptions = {
	  			method: 'GET',
	  			headers: headers,
	  			redirect: 'follow'
			};

			var temp = [];
			/* country details */
			fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
				.then(response => response.json())
				.then(function(obj){
					obj.forEach(function(item,index){
					  	temp.push({
					  		'label' : item['name'],
					  		'value' : item['iso2']
					  	});
					})
					setcountries(temp);
				})
				.catch(function(error){
				  console.log(error);
				});

			var stat = [];

			/* state details */
			if(selectedCountry!==null){
				fetch("https://api.countrystatecity.in/v1/countries/"+selectedCountry["value"]+"/states", requestOptions)
				  		.then(response => response.json())
				  		.then(function(result){
				  			result.forEach(function(item,index){
				  				stat.push({
									'label':item['name'],	
									'value':item['iso2']
								});
				  			});
				  			setstates(stat);
						})
						.catch(function(error){
							console.log(error);
						});
			}

			var cit = [];

			/* city details */
			if(selectedCountry!==null && selectedState!==null){
				fetch("https://api.countrystatecity.in/v1/countries/"+selectedCountry['value']+"/states/"+selectedState['value']+"/cities", requestOptions)
			  		.then(response => response.json())
			  		.then(function(result){
			  			result.forEach(function(item,index){
			  				cit.push({
								'label':item['name'],	
								'value':item['iso2']
							});
			  			});
			  			setcities(cit);
					})
					.catch(function(error){
						console.log(error);
					});
			}
	},[selectedCountry,selectedState]);

	/* I have used openweathermap api for weather details */
	const change_weather = () => {
		if(searched===true){
			fetch('http://api.openweathermap.org/data/2.5/weather?q='+selectedCity['label']+','+selectedCountry['value']+'&APPID=Your_API_Token')
				.then(function(response){
					return response.json();
				})
				.then(function(res){
					setWeather(res);
					setcontent(true);
				})
				.catch(function(error){
					console.log(error);
				});
		}
	};

	/* Playing the weather prediction as a audio */
	const PlayWeather = () => {
		if(content===true){
			synthesizer.cancel();
			const result = new SpeechSynthesisUtterance('Reading Weather Result for city, '+Weather['name']+' . Temperature : '+Weather['main'].temp+' kelvin . Atmospheric Pressure : '+Weather['main'].pressure+' . Humidity : '+Weather['main'].humidity+' . sea level : '+Weather['main'].sea_level+' . wind speed :'+Weather['wind'].speed+'.');
			synthesizer.speak(result);
		}
	};

	/* To show the location setting part */
	const Search = () => {
		setaudio(true);
		setsearched(!searched);
	};


	return(
		<div className="grid-container">
			<div className="grid-item-1">
				<img src={sun} className="Sun-img " alt="Sun" />
	            <img src={cloud} className="Cloud-top " alt="cloudTop" />
	            <img src={cloud} className="Cloud-bottom " alt="cloudBottom" />
	        	<img src={Blueballoon} className="Blue-balloon " alt="BlueBalloon" />
	        	<img src={GreenBalloon} className="Green-balloon " alt="GreenBalloon" />
	        	<img src={RedBalloon} className="Red-balloon " alt="RedBalloon" />
	        	<img src={MiddlePart} className="Middle-Part " alt="MiddlePart" />
	        	<img src={leftmiddle} className="left-middle " alt="leftmiddle" />
	        	<img src={rightmiddle} className="right-middle " alt="rightmiddle" />
	        	<img src={BigBlueBalloon} className="Big-Blue-Balloon " alt="BigBlueBalloon" />
	        	<img src={music_1} className="Music-1 " alt="music_1" />
	        	<img src={music_1} className="Music-2 " alt="music_2" />
				{
					content
					?
					<>	
						<div className="city-holder">	
							<div className="city">
								<p className="city-name">{Weather['name']}</p>
							</div>
						</div>
					</>
					:
					<>
					</>
				}
				<div className="Connection-div">
        			<img src={No_Internet} alt="Internet_failure" className="Internet-Connection" />
        			<p className="prompt"> No Internet Connection. Please make sure to turn on the Internet Connection. </p>
        		</div>
				{
        			searched
        			?
        			<>
        			<div className="LocationGetter">
        				<Select className="Country-box" onChange={setselectedCountry} options={countries} defaultValue={selectedCountry} />
        				<Select className="State-box" onChange={setselectedState} options={states} defaultValue={selectedState} />
        				<Select className="City-box" onChange={setselectedCity} options={cities} defaultValue={selectedCity} />
        				<button className="Set-button" onClick={()=>change_weather()}>Set</button>
        			</div>
        			</>
        			:
        			<>
        			</>
        		}
			</div>
			<div className="grid-item-2">
				<img src={thermometer} className="thermometer" alt="thermometer" />
	        	<p className="thermometer-value">{Weather['main'].temp} K</p>
	        	<img src={atmospressure} className="atmospressure" alt="atmospressure" />
	        	<p className="atmospressure-value">{Weather['main'].pressure}</p>
	        	<img src={humiditymeter} className="humiditymeter" alt="humiditymeter" />
        		<p className="humiditymeter-value">{Weather['main'].humidity}</p>
        		<img src={Wind} className="wind" alt="Wind" />
        		<p className="wind-value">{Weather['wind'].speed}</p>
			</div>
			<div className="grid-item-3">
				{
	        		audio
	        		?
	        		<>
		        	<button onClick={()=>PlayWeather()} className="Play-Button">
			       		<img src={Play} className="Play-icon" alt="playicon" />
			       	</button>
			       	<div className="margin-div"></div>
	        		</>
	        		:
	        		<>
	        		</>
	        	}
	        	<button onClick={()=>Search()} className="Search-Button">
		        	{	
		        		!searched
		        		?
		        		<>
		        		<img src={searchicon} alt="searchicon" />
		        		</>
		        		:
		        		<>
		        		<img src={Close} className="Closeicon" alt="Closeicon" />
	        			</>
	        		}
	        	</button>
			</div>
		</div>
	);
}