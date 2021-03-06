
function test(){
    console.log(sum(1)==0?'Passed':'Failed');
    console.log(sum(2)==3?'Passed':'Failed');
    console.log(sum(3)==6?'Passed':'Failed');
    console.log(sum(0)=='n is undefined'?'Passed':'Failed');
    console.log(sum("string")=="not a number"?'it is a string':'it is a number');
    console.log(sum(25)==="not a number"?'it is a string':'it is a number');
    console.log(sum(true)==="not a number"?'it is a boolean':'it is a number');
}
test();