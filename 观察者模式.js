function create(fn) {
    var ret = false;
    return function (_a) {
        var next = _a.next, error = _a.error, complete = _a.complete;
        function nextFn() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (ret)
                return;
            next.apply(void 0, args);
        }
        function errorFn() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return error.apply(void 0, args);
        }
        function completeFn() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            complete.apply(void 0, args);
            ret = true;
        }
        fn({
            next: nextFn,
            complete: completeFn,
            error: errorFn
        });
        return function () { return (ret = true); };
    };
}
var observer = create(function (observer) {
    setTimeout(function () {
        observer.next(1);
    }, 1000);
    observer.next(2);
    observer.complete(3);
});
var subject = {
    next: function (value) {
        console.log(value);
    },
    complete: console.log,
    error: console.log
};
observer(subject);
