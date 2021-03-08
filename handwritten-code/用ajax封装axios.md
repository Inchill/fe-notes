```js
    function myaxios(options = {}) {
        let method = options.method;
        let url = options.url;
        let data = options.data;
        if(method === 'GET') {
            this.get(url);
        }
        if(method === 'POST') {
            this.post(url, data);
        }
    }

    myaxios.prototype.get = function(url) {
        return new Promise((resolve, reject) => {
            let xhr;
            if(window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            }else {
                xhr = ActiveXObjext('Microsoft.XMLHTTP');
            }
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4 && xhr.status === 200) {
                    return resolve(xhr.responseText);
                }else {
                    return reject(xhr.responseText);
                }
            }
            xhr.send();
        })
    }

    myaxios.prototype.post = function(url, data) {
        return new Promise((resolve, reject) => {
            let xhr;
            if(window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            }else {
                xhr = ActiveXObjext('Microsoft.XMLHTTP');
            }
            xhr.open('POST', url, true);
            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4 && xhr.status === 200) {
                    return resolve(xhr.responseText);
                }else {
                    return reject(xhr.responseText);
                }
            }
            xhr.send(data);
        })
    }
```