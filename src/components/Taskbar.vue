<script lang="ts">
	import { mapGetters, mapActions } from "vuex";
	import TaskbarItem from "@/types/TaskbarItem"
	import { formatAMPM, formatWindowsDate } from "@/utils/datetime";

	export default {
		name: "Taskbar",
		data() {
			return {
				currentTime: formatAMPM(),
				currentDate: formatWindowsDate(),
				weatherCelsius: '',
				weatherDesc: '',
				weatherPic: ''
			}
		},
		computed: {
			...mapGetters("taskbar", [
				"getTaskbarItems", "getCurrentFocusItem"
			]),
			taskbarItems() {
				return this.getTaskbarItems;
			},
			currentFocusItem() {
				return this.getCurrentFocusItem;
			},
		},
		async created() {
			this.fetchTaskbarItems();
			setInterval(() => {
				this.currentTime = formatAMPM();
				this.currentDate = formatWindowsDate();
			}, 1000);

			const location = await this.getUserLocation();
			this.getCurrentWeather(location);
		},		
		methods: {
			...mapActions("taskbar", [
				"fetchTaskbarItems", "changeCurrentFocusItem"
			]),
			...mapActions("startMenu", [
				"toggleOpening"
			]),
			clickTaskbarItem(item: TaskbarItem) {
				if (typeof item.isActive === 'boolean') {
					item.isActive = true;
					this.changeCurrentFocusItem(item.name);
				} else if (item.isActive === null && item.name === 'Start') {
					this.toggleOpening();
				}
			},
			async getUserLocation() {
				return await fetch('https://ipinfo.io/json?token=' + import.meta.env.VITE_IP_INFO_KEY)
					.then(response => response.json())
					.then(data => {
						return data.city || data.region;
					})
					.catch(() => {
						return 'Hanoi';
					});  
			},
			async getCurrentWeather(city: string) {
				const lang = navigator.language;
				await fetch(`https://api.weatherapi.com/v1/current.json?q=${city}&lang=${lang}&key=${import.meta.env.VITE_WEATHER_API_KEY}`)
					.then(response => response.json())
					.then(data => {
						if (data?.current) {
							this.weatherCelsius = data?.current.windchill_c ? Math.round(data.current.windchill_c) + '°C' : '';
							this.weatherDesc = data?.current.condition.text;
							this.weatherPic = data?.current.condition.icon ? 'https:' + data.current.condition.icon : '';
						}
					})
					.catch(error => {
						console.error(error);
					});  				
			}
		}
	}
</script>

<template>
  <div class="taskbar-container">
	<div class="weather-forecast">
		<div class="weather-picture">
			<img :src="weatherPic">
		</div>
		<div class="weather-infor">
			<span class="celsius">{{ weatherCelsius }}</span>
			<span class="description" style="color: #cfcfcf;">{{ weatherDesc }}</span>
		</div>
	</div>
	<div class="taskbar-items">
		<div 
			v-for="item in taskbarItems" 
			:key="item.name"
			class="item"
			:class="{ active: item.isActive, focus: currentFocusItem === item.name }"
			@mouseup="clickTaskbarItem(item)"
		>
			<img :src="'/images/taskbar-apps/' + item.image" :style="item.style" alt="" />
		</div>
	</div>
	<div class="system-tray-and-calendar">
		<div class="calendar">
			<span class="time">{{ currentTime }}</span>
			<span class="date">{{ currentDate }}</span>
		</div>
	</div>
  </div>
</template>

<style lang="scss" scoped>
	.taskbar-container {
		position: fixed;
		bottom: 0;
		width: 100vw;
		height: 48px;
		padding: 3px 12px;
		display: flex;
		justify-content: space-between;
		background-color: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(20px);
		z-index: 1;

		.weather-forecast {
			height: 100%;
			width: 145px;
			display: flex;
			align-items: center;
			gap: 2px;
			padding-right: 8px;
			border-radius: 4px;	
			transition: background-color ease 0.15s;

			&:hover {
				background-color: rgba(255, 255, 255, 0.1);
				box-shadow: 0px 0px 0px 0.5px rgba(255, 255, 255, 0.03) inset;
			}

			&:active {
				background-color: rgba(255, 255, 255, 0.075);
				box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.1) inset;
			}			
			
			.weather-picture {
				display: flex;
				align-items: center;
				gap: 2px;

				img {
					width: 36px;
				}
			}

			.weather-infor {
				display: flex;
				flex-direction: column;

				span {
					color: white;
					font-size: 12px;
				}
			}
		}

		.taskbar-items {
			display: flex;
			gap: 7px;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);			

			.item {
				height: 42px;
				width: 42px;
				border-radius: 4px;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;

				&::before {
					content: '';
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					width: 0;
					height: 3px;
					background-color: transparent;
					border-radius: 3px;
					transition: all ease 0.4s;
				}

				&:hover {
					background-color: rgba(255, 255, 255, 0.1);
				}

				&.active {
					&::before {
						width: 7px;
						background-color: #9ba5a9;
					}
				}

				&.focus {
					background-color: rgba(255, 255, 255, 0.1);
					box-shadow: 0px 0px 0px 0.25px rgba(255, 255, 255, 0.15) inset;

					&:hover {
						background-color: rgba(255, 255, 255, 0.15);
						box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.15) inset;
					}

					&::before {
						width: 40%;
						background-color: #b7c6d3;
					}					
				}

				img {
					max-height: 28px;
					width: 26px;
					display: block;
					padding-bottom: 2px;
					transition: transform ease 0.15s;
				}

				&:active {
					img {
						transform: scale(0.75);
					}
				}
			}
		}

		.system-tray-and-calendar {
			.calendar {
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				justify-content: center;
				gap: 2px;
				padding: 0 8px;
				border-radius: 4px;
				transition: background-color ease 0.15s;

				&:hover {
					background-color: rgba(255, 255, 255, 0.1);
					box-shadow: 0px 0px 0px 0.5px rgba(255, 255, 255, 0.03) inset;
				}

				&:active {
					background-color: rgba(255, 255, 255, 0.04);
					box-shadow: 0px 0px 0px 0.5px rgba(255, 255, 255, 0.1) inset;

					span {
						color: rgba(255, 255, 255, 0.8);					
					}
				}

				span {
					color: white;
					font-size: 12px;
				}
			}
		}
	}
</style>
