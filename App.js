import React from 'react';
import Loading from "./Loading";
import {Alert} from "react-native";
import axios from "axios";
import Weather from "./Weather";
import * as Location from 'expo-location';
import { StyleSheet, Text, View } from 'react-native';

const API_KEY = "fa9f60be477f83a37c44f284227b24f5";

export default class App extends React.Component {
  state = {
		isLoading : true
	}
	
	getWeather = async(latitude,longitude) => {
		const {
			data : {
				main : {temp},
				weather
			}
		}= await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`);
		
		this.setState({
			isLoading:false,
			condition:weather[0].main,
			temp
		})
	}

	getLocation = async () => {
		try{
			await Location.requestPermissionsAsync();
			const {
				coords : {latitude, longitude}
			} =  await Location.getCurrentPositionAsync();
			
			this.getWeather(latitude,longitude)
		} catch(error){
			 Alert.alert("Can't find you","So sad");
		}
	}
	
	componentDidMount(){
		this.getLocation();
	}
	
	render(){
		const {isLoading, temp,condition} = this.state;
		return (isLoading ? <Loading /> : <Weather temp={Math.round(temp) } condition = "Clouds"/>);
	}
}
