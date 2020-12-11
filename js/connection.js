function getConnection() {
    const basePath = 'http://localhost';


    return {
        get: function (path) {
            return fetch(basePath + path)
                .then(response => response.json());
        },

        post: function (path, data) {

            const options = {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            return fetch(basePath + path, options)
                .then(response => response.json());
        },
        put: function (path, data) {
            const options = {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            }

            return fetch(basePath + path, options)
                .then(response => response.json());
        }
    }
}