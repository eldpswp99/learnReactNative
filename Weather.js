import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View , StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const weatherOptions = {
	Haze:{
		iconName : "weather-fog",
		gradient:["#4DA0B0","#D39D38"],
		title:"Haze",
		subTitle:"Just don't go outside"
	},
	Rain:{
		iconName : "weather-pouring",
		gradient:["#667db6","#0082c8","#0082c8","#667db6"],
		title:"Rain",
		subTitle:"Gloomy Again"
	},
	Snow:{
		iconName : "weather-snowy",
		gradient:["#7F7FD5","#86A8E7","#91EAE4"],
		title:"Snow",
		subTitle:"open the Hellgate"
	},
	Clouds:{
		iconName : "weather-cloudy",
		gradient:["#bdc3c7","#2c3e50"],
		title:"Clouds",
		subTitle:"Such a Boring Day"
	},
	Mist:{
		iconName : "weather-rainy",
		gradient:["#4b79a1","#283e51"],
		title:"Mist",
		subTitle:"Umbrella? or Not?"
	}
}

export default function Weather({temp,condition}){
	return <View style = {styles.container}>
		<LinearGradient
          colors={weatherOptions[condition].gradient}
          style={styles.container}
		>
			<StatusBar barStyle = "light-content" />
			<View style = {styles.halfContainer}>
				<MaterialCommunityIcons name = {weatherOptions[condition].iconName} size = {96} color= "white"/>
				<Text style = {styles.temp}>{temp}℃</Text>
			</View>
			<View style = {{...styles.halfContainer, ...styles.textContainer}}>	
					<Text style = {styles.title}>{weatherOptions[condition].title}</Text>
					<Text style = {styles.subtitle}>{weatherOptions[condition].subTitle}</Text>
			</View>
		</LinearGradient>
	</View>
}

Weather.propTypes = {
	temp:PropTypes.number.isRequired,
	condition:PropTypes.oneOf([		
		"Rain",
		"Snow",
		"Clouds",
		"Mist",
		"Haze",
	]).isRequired
}

const styles = StyleSheet.create({
	container:{
		flex :1,
	},
	temp:{
		fontSize:42,
		color:"white"
	},
	halfContainer:{
		flex :1,
		justifyContent:"center",
		alignItems:"center"
	},
	title:{
		color:"white",
		fontSize: 44,
		fontWeight:"300",
		marginBottom:10
	},
	subtitle:{
		fontWeight:"600",
		color:"white",
		fontSize:24
	},
	textContainer:{
		paddingHorizontal:20,
		alignItems:"flex-start"
	}
})