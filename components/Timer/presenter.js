import React,{Component} from "react";
import {View, Text,StyleSheet,StatusBar} from "react-native";
import Button from "../Button"

class Timer extends Component{
	componentDidUpdate(prevProps) {
		const currentProps = this.props;
		
		if(!prevProps.isPlaying && currentProps.isPlaying){			
			const timerInterval = setInterval(() => {
				currentProps.addSecond()
			}, 1000);
			this.setState({
				timerInterval
			})
		}else if(prevProps.isPlaying && !currentProps.isPlaying){
			clearInterval(this.state.timerInterval);
		}
	}
	
	addZero = (time) =>((time < 10) ? ("0" + time) : time);

	
	render(){				
		const {isPlaying,elapsedTime,timerDuration,startTimer,restartTimer,addSecond} = this.props;
		
		const currentTime = timerDuration - elapsedTime;
		
		return(
			<View style = {styles.container}>
				<StatusBar barStyle={"light-contents"}/>
				<View style = {styles.upper}>
					<Text style = {styles.time}>
						{`${this.addZero(parseInt(currentTime/60))}:${this.addZero((currentTime%60))}`}
					</Text>
				</View>
				<View style = {styles.lower}>
					{ !isPlaying ?
						(<Button iconName = "play-circle" onPress = {startTimer}/>) : 
						(<Button iconName = "stop-circle" onPress = {restartTimer}/>)}
				</View>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container :{
		flex:1,
		backgroundColor:"#dc143c"
	},
	upper:{
		flex:2,
		justifyContent:"center",
		alignItems:"center"
	},
	lower:{
		flex:1,
		justifyContent:"center",
		alignItems:"center"
	},
	time:{
		color:"white",
		fontSize:120,
		fontWeight:'100',
		fontFamily : Platform.OS === "android" ?  "sans-serif-thin" : undefined
	}	
})

export default Timer;