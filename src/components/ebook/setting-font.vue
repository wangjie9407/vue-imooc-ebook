<template>
	<transition name="slide-up">
		<div class="setting-wrapper" v-show="menuVisible && settingVisible === 0">
			<div class="setting-font-size">
				<div class="preview" :style="{fontSize: fontSizeList[0].fontsize + 'px'}">A</div>
				<div class="select">
					<div class="select-wrapper" v-for="(item, index) in fontSizeList" :key="index" @click="setFontSize(item.fontsize)">
						<div class="line"></div>
						<div class="point-wrapper">	
							<div class="point" v-show="defaultFontSize === item.fontsize">
								<div class="small-point"></div>
							</div>
						</div>
						<div class="line"></div>
					</div>
				</div>
				<div class="preview" :style="{fontSize: fontSizeList[fontSizeList.length - 1].fontsize + 'px'}">A</div>
			</div>
			<div class="setting-font-family" @click="showFontFamilyOpt">
				{{defaultFontFamily}}
				<span class="icon-forward"></span>
			</div>
		</div>
	</transition>
</template>

<script>
	import {EbookMixins} from '../../utils/map-getter-utils'
	import {FONT_SIZE_LIST} from '../../assets/enum/font-size.js'
  	import {setBookStorage, getBookStorage} from '../../utils/localstorage'

	export default {
		name: 'SettingFont',
		mixins: [EbookMixins],
		data() {
			return {
				fontSizeList: FONT_SIZE_LIST,
			}
		},
		methods:{
			/**
			 * 设置字号
			 */
			setFontSize(fontSize){
				this.setDefaultFontSize(fontSize)
				this.currentBook.rendition.themes.fontSize(fontSize)
				setBookStorage(this.fileName,'fontSize',fontSize)
				let size = getBookStorage(this.fileName,'fontSize')
				console.log(this.fileName, size);
			},
			/**
			 * 显示字体设置选项
			 */
			showFontFamilyOpt(){
				this.setFontFamilyVisible(true)
			}

		},
		mounted() {
		},
		watch:{
		},
		computed:{
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../assets/styles/global.scss';

	.setting-wrapper {
		position: absolute;
		bottom: px2rem(48);
		left: 0;
		z-index: 101;
		width: 100%;
		height: px2rem(60);
		background: white;
		display: flex;
		flex-direction: column;
		box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);

		.setting-font-size {
			display: flex;
			flex: 1;
			height: 100%;

			.preview {
				flex: 0 0 px2rem(40);
				@include center;
			}

			.select {
				display: flex;
				flex: 1;
				width: 100%;
				padding: px2rem(15) 0;
				.select-wrapper {
					flex: 1;
					display: flex;
					align-items: center;

					&:first-child {
						.line {
							&:first-child {
								border-top: none;
							}
						}
					}

					&:last-child {
						.line {
							&:last-child {
								border-top: none;
							}
						}
					}

					.line {
						flex: 1;
						height: 0;
						border-top: px2rem(1) solid #ccc;
					}

					.point-wrapper {
						position: relative;
						flex: 0 0 0;
						width: 0;
						height: px2rem(7);
						// border-left: px2rem(1) solid red;

						.point {
							position: absolute;
							top: px2rem(-8);
							left: px2rem(-10);
							width: px2rem(20);
							height: px2rem(20);
							border-radius: 50%;
							background: white;
							border: px2rem(1) solid #ccc;
							box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, .15);
							@include center;

							.small-point {
								width: px2rem(5);
								height: px2rem(5);
								background: black;
								border-radius: 50%;
							}
						}
					}
				}
			}
		}
		.setting-font-family{
			flex: 1;
			text-align: center;
			line-height: px2rem(30);
			font-size: px2rem(16)
		}
	}
</style>
