function run() {
    new Vue({
        el: '#app',
        data: {
            users: [],
            usersService: null
        },
        created: function () {
            this.usersService = users();
            this.usersService.get().then(response => (this.users = response.data));
        },
        methods: {

            deleteUser: function (index) {
                console.log(index);
                this.userService.delete(index).then(response => console.log(response.data));
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    run();
});
