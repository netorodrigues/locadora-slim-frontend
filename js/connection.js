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
                body: JSON.stringify(data)
            }
            return fetch(basePath + path, options)
                .then(response => response.json());
        }
    }
}