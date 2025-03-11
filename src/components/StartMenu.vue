<script lang="ts">
	import { mapGetters, mapActions } from "vuex";

	export default {
		name: "StartMenu",
		computed: {
			...mapGetters("startMenu", [
				"getPinnedApps",
				"getRecommendedFiles",
				"getOpeningState",
				"getPowerPopupOpeningState"
			]),
			pinnedApps() {
				return this.getPinnedApps;
			},	
			recommendedFiles() {
				return this.getRecommendedFiles;
			},
			isOpen() {
				return this.getOpeningState;
			},
			isPowerPopupOpen() {
				return this.getPowerPopupOpeningState;
			}
		},
		created() {
			this.fetchPinnedApps();
			this.fetchRecommendedFiles();
		},		
		methods: {
			...mapActions("startMenu", [
				"fetchPinnedApps",
				"fetchRecommendedFiles",
				"togglePowerPopupOpening"
			]),
			getStartMenuContainerClass(): string {
				if (typeof this.isOpen === 'boolean') {
					return this.isOpen ? 'opening' : 'closed';
				} else {
					return '';
				}
			},
			getPowerPopupClass(): string {
				if (typeof this.isPowerPopupOpen === 'boolean') {
					return this.isPowerPopupOpen ? 'opening' : 'closed';
				} else {
					return '';
				}
			},
			closeThisTab() {
				const acceptClose = window.confirm("Close this tab !?");
				acceptClose && window.close();
			}
		}
	}
</script>

<template>
	<div class="start-menu-container" :class="getStartMenuContainerClass()">
		<div class="search">
			<div class="search-container">
				<label for="search">
					<img src="/images/start-menu-icons/search.png" width="20" alt="">
				</label>
				<input type="text" name="search" value="" placeholder="Search for apps, settings, and documents">
			</div>
		</div>
		<div class="pins">
			<div class="label-container">
				<span>Pinned</span>
				<button class="more-btn">
					<span>All </span>
					<span>></span>
				</button>
			</div>
			<div class="apps">
				<div v-for="app in pinnedApps"
					class="app"
					:key="app.name"
				>
					<img :src="'/images/start-menu-apps-and-files/' + app.image" width="auto" height="auto" alt="" />
					<span>{{ app.name }}</span>
				</div>
			</div>
		</div>
		<div class="recommendations">
			<div class="label-container">
				<span>Recommended</span>
				<button class="more-btn">
					<span>More </span>
					<span>></span>
				</button>			
			</div>
			<div class="files-and-links">
				<div v-for="item in recommendedFiles"
					class="item"
					:key="item.name"
				>
					<img :src="'/images/start-menu-apps-and-files/' + item.image" width="auto" height="auto" alt="" />
					<div class="name-and-description">
						<span>{{ item.name }}</span>
						<p>{{ item.description }}</p>
					</div>
				</div>				
			</div>
		</div>
		<div class="account">
			<div class="user">
				<img src="/images/dev.png" alt="">
				<span>Hùng Vũ</span>
			</div>
			<div class="power" @mouseup="togglePowerPopupOpening()">
				<img src="/images/start-menu-icons/power.svg" width="18" alt="">
				<div class="power-popup" :class="getPowerPopupClass()">
					<div class="lock" @mouseup="closeThisTab()">
						<img src="/images/start-menu-icons/lock.svg" width="16" alt="">
						<span>Lock</span>
					</div>
					<div class="sleep" @mouseup="closeThisTab()">
						<img src="/images/start-menu-icons/sleep.svg" width="16" alt="">
						<span>Sleep</span>						
					</div>
					<div class="shutdown" @mouseup="closeThisTab()">
						<img src="/images/start-menu-icons/power.svg" width="18" alt="">
						<span>Shut down</span>						
					</div>
					<div class="restart" @mouseup="closeThisTab()">
						<img src="/images/start-menu-icons/restart.svg" width="18" alt="">
						<span>Restart</span>					
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.start-menu-container {
	position: fixed;
	bottom: 60px;
	left: 50%;
	width: 640px;
	display: flex;
	flex-direction: column;
    border-radius: 8px;
    background-color: rgba(74, 84, 89, 0.7);
    backdrop-filter: blur(40px);
	// box-shadow: 0px 0px 1px 1.25px rgba(255, 255, 255, 0.15) inset;
	box-shadow: 0px 6px 10px 2px rgba(0,0,0,0.3);
	border: 1px solid rgba(255, 255, 255, 0.15);

	opacity: 0;
	transform: translateX(-50%) translateY(calc(100% + 60px));

	&.opening {
		animation: show_up ease 0.3s;
		opacity: 1;
		transform: translateX(-50%) translateY(0);		

		* {
			animation: show ease 0.3s;
		}
	}

	&.closed {
		animation: hide_down ease 0.3s;
		opacity: 0;
		transform: translateX(-50%) translateY(calc(100% + 60px));		
		
		* {
			animation: hide ease 0.3s;
		}
	}

	@keyframes show_up {
		0% {
			opacity: 0;
			transform: translateX(-50%) translateY(calc(100% + 60px));	
		}
		100% {
			opacity: 1;
			transform: translateX(-50%) translateY(0);				
		}
	}

	@keyframes hide_down {
		0% {
			opacity: 1;
			transform: translateX(-50%) translateY(0);				
		}
		100% {
			opacity: 0;
			transform: translateX(-50%) translateY(calc(100% + 60px));				
		}
	}

	@keyframes show {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@keyframes hide {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	* {
		color: white;
		font-size: 12px;
		cursor: default;
	}

	.search {
		padding: 32px;
		padding-bottom: 25px;

		.search-container {
			display: flex;
			align-items: center;
			width: 100%;
			height: 30px;
			border-radius: 15px;
			box-shadow: 0px 0px 0px 0.5px rgba(255, 255, 255, 0.35);
			background-color: rgb(40, 40, 40);

			* {
				cursor: text;
			}

			label {
				width: 42px;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			input {
				font-size: 14px;
				border: none;
				height: 100%;
				flex: 1;
			}
		}
	}

	.pins {
		display: flex;
		flex-direction: column;
		row-gap: 12px;
		padding: 25px 32px 18px;

		.apps {
			display: flex;
			flex-wrap: wrap;

			.app {
				width: calc(100% / 6);
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 8px;
				padding: 12px 0 18px;
				border-radius: 5px;
				transition: all ease 0.15s;
				cursor: help;
				* {
					cursor: help;
				}				

				img {
					min-width: 32px;
					max-width: 32px;
					max-height: 32px;
					min-height: 32px;
					transition: all ease 0.15s;
				}

				&:hover {
					background-color: rgba(255, 255, 255, 0.075);
				}

				&:active {
					img {
						transform: scale(0.75);
					}
				}
			}
		}
	}

	.recommendations {
		display: flex;
		flex-direction: column;
		row-gap: 12px;
		padding: 18px 32px 32px;

		.files-and-links {
			display: flex;
			flex-wrap: wrap;
			column-gap: 24px;
			padding-left: 20px;

			.item {
				width: calc(50% - 12px);
				display: flex;
				align-items: center;
				gap: 12px;
				padding: 12px;
				border-radius: 5px;
				transition: all ease 0.15s;

				&:hover {
					background-color: rgba(255, 255, 255, 0.075);
				}

				&:active {
					background-color: rgba(255, 255, 255, 0.04);
				}

				img {
					min-width: 32px;
					max-width: 32px;
					min-height: 32px;
					max-height: 32px;
				}

				.name-and-description {
					width: calc(100% - 32px - 12px);
					display: flex;
					flex-direction: column;
					gap: 2px;

					span {
						overflow:hidden; 
						white-space:nowrap; 
						text-overflow: ellipsis;
					}

					p {
						font-weight: 300;
					}
				}
			}
		}
	}

	.label-container {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 32px;

		& > span {
			font-weight: 500;
			font-size: 14px;
		}

		.more-btn {
			display: flex;
			align-items: center;
			gap: 10px;
			height: 24px;
			padding: 8px;
			border-radius: 5px;
			background-color: rgba(255, 255, 255, 0.075);
			box-shadow: 0px 0px 0px 0.5px rgba(255, 255, 255, 0.1) inset;
			transition: all ease 0.15s;
			cursor: help;
			* {
				cursor: help;
			}

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
		}	
	}	

	.account {
		display: flex;
		justify-content: space-between;
		padding: 12px 52px;
		background-color: rgb(45, 51, 54, 0.3);
		border-radius: 0 0 8px 8px;

		& > div {
			height: 40px;
			display: flex;
			align-items: center;		
			justify-content: center;	
			border-radius: 5px;
			transition: all ease 0.15s;

			&:not(.power:has(.opening)):hover {
				background-color: rgba(255, 255, 255, 0.075);
			}

			&:active {
				background-color: rgba(255, 255, 255, 0.04);

				span {
					color: rgba(255, 255, 255, 0.8);
				}
			}			
		}

		.user {
			gap: 12px;
			padding: 5px 12px;
			cursor: help;
			* {
				cursor: help;
			}			

			img {
				height: 30px;
				width: 30px;
				border-radius: 50%;
			}

			span {
				transition: all ease 0.15s;
			}
		}

		.power {
			width: 40px;
			position: relative;

			img {
				filter: invert(1);
				transition: all ease 0.15s;
			}

			&:active {
				img {
					filter: invert(0.8);
				}				
			}

			.power-popup {
				position: absolute;
				bottom: -100%;
				visibility: hidden;
				opacity: 0;
				width: 128px;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				gap: 4px;
				padding: 5px;
				border-radius: 8px;
				background-color: rgb(44, 48, 49);

				&.opening {
					animation: show_power_popup ease 0.5s;
					bottom: calc(100% + 4px);		
					visibility: visible;
					opacity: 1;
					box-shadow: 0px 6px 10px 2px rgba(0,0,0,0.3);
				}

				&.closed {
					animation: hide_power_popup ease 0.1s;
					bottom: -100%;	
					visibility: hidden;
					opacity: 0;
					box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.3);	
				}				

				@keyframes show_power_popup {
					0% {
						bottom: -100%;	
						visibility: hidden;
						opacity: 0;
						box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.3);	
					}
					60% {
						bottom: calc(100% + 4px);	
						visibility: visible;
						opacity: 1;
						box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.3);							
					}
					100% {
						bottom: calc(100% + 4px);
						visibility: visible;	
						opacity: 1;
						box-shadow: 0px 6px 10px 2px rgba(0,0,0,0.3);				
					}
				}

				@keyframes hide_power_popup {
					0% {
						bottom: calc(100% + 4px);	
						visibility: visible;	
						opacity: 1;
						box-shadow: 0px 6px 10px 2px rgba(0,0,0,0.3);		
					}
					100% {
						bottom: -100%;	
						visibility: hidden;
						opacity: 0;
						box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.3);			
					}
				}				

				& > div {
					width: 100%;
					display: flex;
					align-items: center;
					gap: 12px;
					padding: 5px 10px;
					border-radius: 3px;

					&:hover {
						background-color: rgb(55, 59, 61);
					}

					img {
						min-width: 16px;
						min-height: 16px;
						filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(337deg) brightness(105%) contrast(102%);
					}

					span {
						font-size: 14px;
					}
				}
			}
		}
	}
}
</style>
