(function () {
    let box = document.getElementById('box'),
        serverTime = null;

    let fn = () => {
        serverTime = serverTime + 1000;
        let tatgetTime = new Date('2018/8/29 16:50:00').getTime();
        let leftSeconds = tatgetTime - serverTime;

        if (leftSeconds < 0) {
            clearInterval(timer);
            box.innerHTML = '开抢!!!';
            return;
        }

        let hours = Math.floor(leftSeconds / (1000 * 60 * 60));
        leftSeconds -= hours * 3600000;
        let minutes = Math.floor(leftSeconds / (1000 * 60));
        leftSeconds -= minutes * 60000;
        let seconds = Math.floor(leftSeconds / 1000);

        hours < 10 ? hours = '0' + hours : null;
        minutes < 10 ? minutes = '0' + minutes : null;
        seconds < 10 ? seconds = '0' + seconds : null;

        box.innerHTML = `距离开抢还有${hours}:${minutes}:${seconds}`;
    }

    let getServerTime = () => {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (!/^(2|3)\d{2}$/.test(xhr.status)) return;
            if (xhr.readyState === 2) {
                serverTime = new Date(xhr.getResponseHeader('date')).getTime();
                fn();
            }
        };
        xhr.open('head', 'temp.json');
        xhr.send(null);
    }
    getServerTime();
    let timer = setInterval(fn, 1000);
})()