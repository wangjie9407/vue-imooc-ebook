import Storage from 'web-storage-cache'

const localStorage = new Storage()

export function setLocalStorage(key, value){
    if (typeof value === 'object'){
        JSON.stringify(value)
    }
    return localStorage.set(key,value)
}

export function getLocalStorage(key){
   return localStorage.get(key)
}

export function removeLocalStorage(key){
    return localStorage.delete(key)
 }

 export function clearLocalStorage(key){
    return localStorage.clear()
 }

 /**
  * 以filename为key，book为对象，为book存放属性
  * @ param filename
  * @ param key
  * @ param value
  */
 export function setBookStorage(filename,key, value){
    let book = getLocalStorage(filename)
    if(!book){
        book = {}
    }
    book[key] = value
    return setLocalStorage(filename,book)
 }

 /**
  * 获取book属性
  * @ param filename
  * @ param key
  */
 export function getBookStorage(filename,key){
    const book = getLocalStorage(filename)
    if (!book) {
        return null
    } else {
        return book[key]
    }
 } 