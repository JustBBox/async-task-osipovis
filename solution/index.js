// solution/index.js
module.exports = function (Homework) {

    // вспомогательные фукнции и т.д.

    return (asyncArray, fn, initialValue, cb) => {
        asyncArray.length((length_) => {

            let callbackStep = (acc, cur, index, arr, cb) => {
                Homework.less(index, length_, (compareResult) => {
                    if (compareResult) {
                        arr.get(index, (cur) => {
                            fn(acc, cur, index, arr, (elem) => {
                                Homework.add(index, 1, (incrementedIndex) => {
                                    callbackStep(elem, cur, incrementedIndex, arr, cb);
                                })
                            });
                        })
                    } else {
                        cb(acc);
                    }
                })
            };

            Homework.equal(0, length_, (compareResult) => {
                if (compareResult) {
                    Homework.equal(typeof length_, 'number', (compareResult) => {
                        if(compareResult) {
                            cb(initialValue);
                        } else {
                            throw new Error('Reduce of empty array with no initial value');
                        }
                    })
                } else {
                    let acc = initialValue || 0;
                    asyncArray.get(0, (cur) => {
                        callbackStep(acc, cur, 0, asyncArray, cb);
                    })
                }
            });
        })
    }
}
