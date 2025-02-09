<script lang="ts">
	import { mapGetters, mapActions } from "vuex";
	import TaskbarItem from "@/types/TaskbarItem"

	export default {
		name: "Taskbar",
		computed: {
			...mapGetters(["getTaskbarItems", "getCurrentFocusItem"]), // Map getter to get products
			taskbarItems() {
				return this.getTaskbarItems.taskbarItems as TaskbarItem[]; // Use getter to get products
			},
			currentFocusItem() {
				return this.getCurrentFocusItem;
			}
		},
		created() {
			this.fetchTaskbarItems(); // Fetch taskbar items khi component được tạo
		},		
		methods: {
			...mapActions(["fetchTaskbarItems", "changeCurrentFocusItem"]),
			clickTaskbarItem(item: TaskbarItem) {
				if (typeof item.isActive === 'boolean') {
					item.isActive = true;
					this.changeCurrentFocusItem(item.name);
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
			@click="clickTaskbarItem(item)"
		>
			<img :src="'/' + item.image" :style="item.style" alt="" />
		</div>
	</div>
	<div class="system-tray-and-time"></div>
  </div>
</template>

<style lang="scss" scoped>
	.taskbar-container {
		position: fixed;
		bottom: 0;
		width: 100vw;
		height: 48px;
		padding: 3px 16px;
		display: flex;
		justify-content: space-between;
		background-color: rgba(0, 0, 0, 0.22);
		backdrop-filter: blur(20px);

		.taskbar-items {
			display: flex;
			gap: 7px;

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
						box-shadow: none;
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
					transition: all ease 0.15s;
				}

				&:active {
					img {
						transform: scale(0.75);
					}
				}
			}
		}
	}
</style>
