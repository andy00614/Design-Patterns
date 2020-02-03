interface MiddleFn {
  next:Function
  error:Function
  complete:Function
}
function create(fn) {
  let ret:boolean = false
  return ({next,error,complete}:MiddleFn) => {
    function nextFn(...args) {
      if(ret) return;
      next(...args)
    }

    function errorFn(...args) {
      return error(...args)
    }

    function completeFn(...args) {
      complete(...args)
      ret = true
    }

    fn({
      next: nextFn,
      complete: completeFn,
      error: errorFn
    })

    return () => (ret = true)
  }
}
const observer = create((observer:MiddleFn) => {
  setTimeout(() => {
    // todo: console会报undefined，现在理解的应该是不执行啊
    // console.log(observer.next(1))
    observer.next(1)
  }, 1000);
  observer.next(2)
  observer.complete(3)
})

const subject:MiddleFn = {
  next: value => {
    console.log(value)
  },
  complete: console.log,
  error: console.log
}

observer(subject)