module.exports = function (Homework) {
    function getter(...args) {
        let fn = args.shift();
        return new Promise(resolve => (fn(...args, resolve)));
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
