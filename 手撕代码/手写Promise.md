```javascript
    class Promise {
        constructor(executor) {
            // 初始化状态
            this.state = 'pending';
            this.value = undefined;
            this.reason = undefined;

            // 立即执行函数
            let resolve = (value) => {
                if(this.state === 'pending') {
                    this.state = 'fulfilled';
                    this.value = value;
                }
            }

            let reject = (reason) => {
                if(this.state === 'pending') {
                    this.state = 'rejected';
                    this.reason = reason;
                }
            }

            // 立即执行
            try {
                executor(resolve, reject);
            }catch(err) {
                reject(err);
            }
        }

        // 添加执行后的回调函数then
        then(onFulfilled, onRejected) {
            if(this.state === 'fulfilled') {
                onFulfilled(this.value);
            }

            if(this.state === 'rejected') {
                onRejected(this.reason);
            }
        }
    }
```