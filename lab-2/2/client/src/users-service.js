function users() {
    get = function () {
        return axios.get('http://localhost:3000/users');
    };

    deleteUser = function (index) {
        console.log(index);
        return axios.delete('http://localhost:3000/users/' + index);
    };

    return {
        get,
        deleteUser
    };
}
