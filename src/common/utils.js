export function debounce(func,delay){
  let time = null
  return function (...args) {
    if (time) clearTimeout(time)

    time = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}
