/**
 * 将层级数组合并成一级数组
 * @ param arr
 */
export function flatten(arr){
   return [].concat(...arr.map(item => [item].concat(...flatten(item.subitems))))
}