module.exports = function (Homework) {
    function getter(fn, a, b, c, d) {
        switch (arguments.length) {
            case 1:
                return new Promise(resolve => (fn(resolve)));
            case 2:
                return new Promise(resolve => (fn(a, resolve)));
            case 3:
                return new Promise(resolve => (fn(a, b, resolve)));
            default:
                return new Promise(resolve => (fn(a, b, c, d, resolve)));
        }
    }
    return async (asyncArray, fn, initialValue, cb) => {
        let length_ = await getter(asyncArray.length);
        let compare = await getter(Homework.equal, 0, length_);
        if(compare) {
            compare = await getter(Homework.equal, typeof length_, 'number');
            if(compare) {
                cb(initialValue);
            } else {
                throw new Error('Reduce of empty array with no initial value');
            }
        } else {
            let acc = initialValue || 0;
            let index = 0;
            let conditionStop = await getter(Homework.less, index, length_);
            while (conditionStop) {
                let cur = await getter(asyncArray.get, index);
                acc = await getter(fn, acc, cur, index, asyncArray);
                index = await getter(Homework.add, index, 1);
                conditionStop = await getter(Homework.less, index, length_);
            }
            cb(acc);
        }
    }
}
