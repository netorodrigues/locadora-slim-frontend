function getConnection() {
    const basePath = 'http://localhost';


    return {
        get: function (path) {
            return fetch(basePath + path)
                .then(response => response.json());
        }
    }
}