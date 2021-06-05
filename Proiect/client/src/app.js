function run() {
  let indexComponent = new Vue({
    el: '#app',
    data: {
      components: [],
      usersService: null,
      message: ''
    },
    created: function () {
      this.usersService = users();
      this.usersService.get().then(response => (this.components = response.data));
    },
    methods: {
      deletecomponent: function(id) {
        console.log('HTTP DELETE spre backend, component: '+id);
        this.usersService.remove(id).then(response => {
          this.usersService.get().then(response => (this.components = response.data));
        });
      },
    }
  });

  indexComponent.use(VueMaterial);

}

document.addEventListener('DOMContentLoaded', () => {
  run();
});
