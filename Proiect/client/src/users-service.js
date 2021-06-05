function users() {
  get = function () {
    return axios.get('http://localhost:3000/components');
  };

  remove = function (index) {
    return axios.delete('http://localhost:3000/components/'+index);
  };

  return {
    get: get,
    remove: remove
  };
}
