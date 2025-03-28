<script lang="ts">
	export default {
		name: "Notepad",
	}
</script>

<template>
	<div class="notepad-container">
		<div class="title_tabs-bar">
			<div class="notepad-icon">
				<img src="/images/start-menu-apps-and-files/notepad.svg" alt="">
			</div>
			<div class="tabs-container">
				<div class="tabs">
					<div class="tab">
						<span>
							about-me.md
						</span>
						<button class="close-tab"></button>
					</div>
				</div>
				<button class="add-new-tab"></button>
			</div>
			<div class="buttons">
				<button class="minimize"></button>
				<button class="maximize">
					<div class="maximize-icon"></div>
				</button>
				<button class="close"></button>
			</div>
		</div>
		<div class="menu-bar">
			<div class="left-menu">
				<button class="file">File</button>
				<button class="edit">Edit</button>
				<button class="view">View</button>
			</div>
			<div class="right-menu">
				<button class="rewrite"></button>
				<!-- <img src="/images/dev.png" alt=""> -->
				<button class="setting"></button>
			</div>
		</div>
		<textarea class="content-area"></textarea>
		<div class="status-bar">
			<span class="line-column-number"></span>
			<span class="total-characters"></span>
			<span class="zoom"></span>
			<span class="line-break-type"></span>
			<span class="charset"></span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.notepad-container {
	width: 880px;
	height: 615px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	border-radius: 8px;
	box-shadow: 0px 20px 20px 10px rgba(0, 0, 0, 0.3);
	border: 1px solid rgba(255, 255, 255, 0.25);
	background-color: #272727;

	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	& > * {
		width: 100%;
	}

	.title_tabs-bar {
		height: 42px;
		display: flex;
		justify-content: flex-start;
		padding-top: 10px;
		background-color: #202020;
		// background-color: #060e00;
		position: relative;

		.notepad-icon {
			height: 100%;
			width: 48px;
			display: flex;
			justify-content: center;
			align-items: center;

			img {
				width: 12px;
				object-fit: contain;
			}
		}

		.tabs-container {
			height: 100%;
			max-width: calc(100% - 48px - 20%);
			min-width: fit-content;
			display: flex;
			justify-content: flex-start;
			align-items: flex-end;
			gap: 10px;

			.tabs {
				height: 100%;
				max-width: calc(100% - 40px);
				min-width: fit-content;
				display: flex;
				gap: 1px;
				// background-color: #2c2c2c;
				// position: relative;

				// &::after {
				// 	content: '';
				// 	width: 0.5px;
				// 	height: 12px;
				// 	background-color: #323232;

				// 	position: absolute;
				// 	right: 0;
				// 	top: 50%;
				// 	transform: translateY(-50%);
				// }

				.tab {
					flex: 1;
					height: 100%;
					min-width: 238px;
					max-width: 238px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 2px 5px 4px 8px;
					// background-color: #202020;
					background-color: #2c2c2c;
					// background-color: #1e221a;
					border-radius: 8px 8px 0 0;
					position: relative;

					// Inverted border-radius - Curve Outside --- start
					&::before {
						content: "";
						position: absolute;
						left: -12px;
						bottom: 0;
						background-color: transparent;
						width: 12px;
						height: 12px;
						border-radius: 50%;
						box-shadow: 6px 6px 0 #2c2c2c; /* box-shadow x, y coordinates equal to .tab border-radius */
					}
					
					&::after {
						content: "";
						position: absolute;
						right: -12px;
						bottom: 0;
						background-color: transparent;
						width: 12px;
						height: 12px;
						border-radius: 50%;
						box-shadow: -6px 6px 0 #2c2c2c; /* box-shadow x, y coordinates equal to border-radius */
					}
					// Inverted border-radius - Curve Outside --- end

					span {
						font-size: 12px;
						// color: #b3b3b3;
						color: #fff;
						font-weight: 400;
						// font-weight: 300;
					}

					.close-tab {
						position: relative;
						width: 32px;
						height: 22px;
						border-radius: 4px;
						// will-change: box-shadow, opacity;
						transition: box-shadow ease 0.1s, background-color ease 0.1s, opacity ease 0.1s;

						&:hover {
							background-color: rgba(255, 255, 255, 0.07);
							box-shadow: 0px 0px 0px 0.5px rgba(255, 255, 255, 0.03) inset;
							// opacity: 1;
						}	
						
						&:active {
							background-color: rgba(255, 255, 255, 0.05);
							box-shadow: 0px 0px 0px 0.5px rgba(255, 255, 255, 0) inset;
							// opacity: 0.7;

							&::after,
							&::before {
								background-color: rgba(255, 255, 255, 0.7);
							}							
						}						

						&::after,
						&::before {
							content: "";
							background-color: rgba(255, 255, 255, 1);

							position: absolute;
							top: 50%;
							left: 50%;
							// will-change: transform;
							transform: translate(-50%, -50%) rotate(45deg);
						}

						&::before {
							width: 1px;
							height: calc(sqrt(8 * 8 * 2) * 1px);
						}

						&::after {
							width: calc(sqrt(8 * 8 * 2) * 1px);
							height: 1px;
						}						
					}
				}
			}

			.add-new-tab {
				position: relative;
				width: 32px;
				height: 24px;
				color: white;
				border-radius: 4px;
				margin-bottom: 3px;
				// will-change: box-shadow, opacity;
				// backface-visibility: hidden;
				transition: box-shadow ease 0.1s, background-color ease 0.1s;

				&:hover {
					background-color: rgba(255, 255, 255, 0.07);
					box-shadow: 0px 0px 0px 0.5px rgba(255, 255, 255, 0.03) inset;
					// opacity: 1;
				}	
				
				&:active {
					background-color: rgba(255, 255, 255, 0.04);
					box-shadow: 0px 0px 0px 0.5px rgba(255, 255, 255, 0) inset;
					// opacity: 0.7;

					&::after,
					&::before {
						background-color: rgba(255, 255, 255, 0.7);
					}
				}						

				&::after,
				&::before {
					content: "";
					background-color: rgba(255, 255, 255, 1);

					position: absolute;
					top: 50%;
					left: 50%;
					will-change: transform;
					// backface-visibility: hidden;
					transform: translate(-50%, -50%);
					transition: background-color ease 0.1s;
				}

				&::before {
					width: 1px;
					height: 10px;
				}

				&::after {
					width: 10px;
					height: 1px;
				}								
			}
		}

		.buttons {
			position: absolute;
			top: 0;
			right: 0;

			display: flex;

			& > * {
				width: 46px;
				height: 32px;
				position: relative;
				transition: background-color ease 0.1s;

				&::before, &::after, & > * {
					background-color: rgba(255, 255, 255, 1);	
					position: absolute;
					top: 50%;
					left: 50%;			
					transform: translate(-50%, -50%);		
				}

				&:hover {
					background-color: rgba(255, 255, 255, 0.07);
				}

				&:active {
					background-color: rgba(255, 255, 255, 0.05);
				}				
			}

			.minimize {
				&::before {
					content: '';
					height: 1px;
					width: 10px;
				}
			}

			.maximize {
				.maximize-icon {
					width: 10px;
					height: 10px;
					border: 1px solid rgba(255, 255, 255, 1);
					background-color: transparent;
					border-radius: 1px;
				}
			}

			.close {
				&::after,
				&::before {
					content: "";
					transform: translate(-50%, -50%) rotate(45deg);
				}

				&::before {
					width: 1px;
					height: calc(sqrt(10 * 10 * 2) * 1px);
				}

				&::after {
					width: calc(sqrt(10 * 10 * 2) * 1px);
					height: 1px;
				}		
				
				&:hover {
					background-color: rgba(196, 43, 28, 1);
				}

				&:active {
					background-color: rgba(196, 43, 28, 0.8);
				}					
			}
		}
	}
}
</style>
