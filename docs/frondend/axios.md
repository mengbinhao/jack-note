axios

- attibute
    ```javasript
    axios.defaults.baseURL = 'https://api.xxx.com';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    ```
- API
    ```javasript
    axios.request(config)
    axios.get(url[, config])
    axios.delete(url[, config])
    axios.head(url[, config])
    axios.options(url[, config])
    axios.post(url[, data[, config]])
    axios.put(url[, data[, config]])
    axios.patch(url[, data[, config]])
    ```
- Interceptors
- Cancellation