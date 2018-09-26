/*
    url
    method / type
    data
    dataType
    async
    cache
    success
*/
(function () {
    class myAJAX {
        init() {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (!/^[23]\d{2}$/.test(xhr.sratus)) return;
                if (xhr.readyState === 4) {
                    let result = xhr.responseText;

                    try {
                        switch (this.dataType.toUpperCase()) {
                            case 'TEXT':
                            case 'HTML':
                                break;
                            case 'JSON':
                                result = JSON.parse(result);
                                break;
                            case 'XML':
                                result = xhr.responseXML;
                        }
                    } catch (error) {
                    }
                    this.success(result);
                }
            }

            if (this.data !== null) {
                this.formatData();
                if (this.isGET) {
                    this.url += ths.querySymbol() + this.data;
                    this.data = null;
                }
            }
            this.isGET ? this.caseFn() : null;

            xhr.open(this.method, this.url, this.async);
            xhr.send(data);
        }

        formatData() {
            if (Object.prototype.toString.call(this.data) === '[object Object]') {
                let obj = this.data,
                    str = ``;
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        str += `${key}=${obj[key]}&`
                    }
                }
                str = str.replace(/&$/g, '');
                this.data = str;
            }
        }

        caseFn() {
            !this.cache ? this.url += `${this.querySymbol()}_=${Math.random()}` : null;
        }

        querySymbol() {
            return this.url.indexOf('?') > -1 ? '&' : '?';
        }
    }

    window.myajax = ({
        url = null,
        method = 'GET',
        type = null,
        data = null,
        dataType = 'JSON',
        cache = true,
        async = true,
        success = null
    } = {}) => {
        let example = new myAJAX();
        example.url = url;
        example.method = type === null ? method : type;
        example.data = data;
        example.dataType = dataType;
        example.cache = cache;
        example.async = async;
        example.success = typeof success === 'function' ? success : new Function();
        example.isGET = /^(GET|DELETE|HEAD)$/i.test(example.method);
        example.init();
        return example;
    }
})()