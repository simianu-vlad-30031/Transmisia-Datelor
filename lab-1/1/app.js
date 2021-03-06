console.log('Welcome to data transmission ');

document.getElementById('message').innerHTML = 'Google';
console.log('Hello');
var user = { id : 1 , name :" Andrei ", age : 21 , };
console.log(user.name,"id = ",user.id,"age = ",user.age);
function print(message) {
    console.log(message);
}
print('good evening');

var password='1234';
console.log(password=='123'? 'ALLOW':'DENY');

if(password == '1234'){
    console.log('permission accepted');
}else {
    console.log('permission denied');
}

$('#message2').html('this is the second message');