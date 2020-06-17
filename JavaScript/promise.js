class Promise {
    constructor(executor) {
        // initialize
        this.state = 'pending';
        // 成功的值
        this.value = undefined;
        // 失败的原因
        this.reason = undefined;
        // success
        let resolve = (value) => {
            if(this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
            }
        };
        // failure
        let reject = (reason) => {
            if(this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
            }
        };
        // immediate execute
        try{
            executor(resolve, reject);
        }catch(err){
            reject(err);
        }
    }

    then(onFulfilled, onRejected) {
        if(this.state === 'fulfilled') {
            onFulfilled(this.value);
        }

        if(this.state === 'rejected') {
            onRejected(this.reason);
        }
    }
}


let p = new Promise(function(resolve, reject) {
    setTimeout(function() {
        console.log('执行promise');
        resolve('这是拿到的数据');
        reject('获取数据失败');
    }, 1000)
}).then(response => {
    console.log(response);
}, err => {
    console.log(err);
});   

// export default Promise