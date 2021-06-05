function run() {
    new Vue({
      el: '#update',
      data: {
        id: '',
        message: '',
        component: {}
      },
      created: function () {

        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        this.id = params.get("id");

        axios.get('http://localhost:3000/components/'+this.id).then(
            (response) => {
                this.component = response.data;
            }
        );
      },
      methods: {
        update: function(){
            console.dir(this.component);

            return axios.post('http://localhost:3000/components', this.component).then(
                (response) => {
                    this.message = response.data; // saved
                }
            );


        }
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });
  