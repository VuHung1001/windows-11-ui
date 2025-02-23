<script lang="ts">
	import { mapGetters, mapActions } from "vuex";
	import TaskbarItem from "@/types/TaskbarItem"
	import { formatAMPM, formatWindowsDate } from "@/utils/datetime";

	export default {
		name: "Taskbar",
		data() {
			return {
				currentTime: formatAMPM(),
				currentDate: formatWindowsDate()
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
		created() {
			this.fetchTaskbarItems();
			setInterval(() => {
				this.currentTime = formatAMPM();
				this.currentDate = formatWindowsDate();
			}, 1000);
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
			}
		}
	}
</script>

<template>
  <div class="taskbar-container">
	<div class="weather-forecast"></div>
	<div class="taskbar-items">
		<div 
			v-for="item in taskbarItems" 
			:key="item.name"
			class="item"
			:class="{ active: item.isActive, focus: currentFocusItem === item.name }"
			@mouseup="clickTaskbarItem(item)"
		>
			<img :src="'/images/' + item.image" :style="item.style" alt="" />
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
					width: 26px;
					display: block;
					padding-bottom: 2px;
					transition: all ease 0.1s;
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
				gap: 4px;
				padding: 0 8px;
				border-radius: 4px;

				&:hover {
					background-color: rgba(255, 255, 255, 0.1);
					box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 0.1) inset;
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
