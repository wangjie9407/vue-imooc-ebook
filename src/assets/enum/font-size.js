export const FONT_SIZE_LIST = [
    {fontsize:12},
    {fontsize:14},
    {fontsize:16},
    {fontsize:18},
    {fontsize:20},
    {fontsize:22},
    {fontsize:24},
]
export const FONT_FAMILY_LIST = [
    {font:'Default'},
    {font:'Cabin'},
    {font:'DaysOne'},
    {font:'Montserrat'},
    {font:'Tangerine'},
]

export function themeList(vue){
	return [
		{
		  alias: vue.$t('book.themeDefault'),
		  name: 'Default',
		  href:'theme_default.css',
		  style: {
			body: {
			  'color': '#4c5059',
			  'background': '#cecece',
		  }
		}
		},
		{
		  alias: vue.$t('book.themeGold'),
		  name: 'Gold',
		  href:'theme_gold.css',
		  style: {
			body: {
			  'color': '#5c5b56',
			  'background': '#c6c2b6',
			},
			
		  }
		},
		{
		  alias: vue.$t('book.themeEye'),
		  name: 'Eye',
		  href:'theme_eye.css',
		  style: {
			body: {
			  'color': '#404c42',
			  'background': '#a9c1a9',
			},
		  }
		},
		{
		  alias: vue.$t('book.themeNight'),
		  name: 'Night',
		  href:'theme_night.css',
		  href:'theme_default.css',
		  style: {
			body: {
			  'color': '#cecece',
			  'background': '#000000',
			},
		  }
		}
	  ]
}
/**
 * 动态添加css文件设置主题
 */
export function addCssFile(href){
	const linkDom = document.createElement('link')
	const headDom = document.querySelector('head')
	linkDom.setAttribute('rel','styleSheet')
	linkDom.setAttribute('type','text/css')
	linkDom.setAttribute('href',href)
	headDom.appendChild(linkDom)
}