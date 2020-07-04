let passed=0;
// If there is an input tag to start otherwise no other testing possible
if(document.querySelector('input[type="text"]')&&document.querySelector('#container')){
    passed++;
    // Buuton to add todo
    if(document.querySelector('#btn')){
        passed++;
        // No item in start
        if(document.querySelectorAll('.item').length==0){
            passed++;
        //     Insertion
            document.querySelector('#container').value="Milk";
            document.querySelector('#btn').click();
            if(document.querySelectorAll('.item').length==1&&
            document.querySelectorAll('.item')[0].innerText=="Milk"){
                passed++;
            }
            document.querySelector('#container').value="Tomatos";
            document.querySelector('#btn').click();
        //     Deletion
            if(document.querySelectorAll('.del').length==2){
                passed++;
                document.querySelectorAll('.del')[1].click();
                if(document.querySelectorAll('.item').length==1&&
            document.querySelectorAll('.item')[0].innerText=="Milk"){
                    passed++;
                }
            }
        }
//         Make atleast 2 items to check line through
        if(document.querySelectorAll('.item').length==0){

           document.querySelector('#container').value="Item1";
           document.querySelector('#btn').click();

            document.querySelector('#container').value="Item2";
            document.querySelector('#btn').click();
        }else if(document.querySelectorAll('.items').length==1){
            document.querySelector('#container').value="Item2";
            document.querySelector('#btn').click();
        }

        //     Canceling event (line-through)
        if(document.querySelectorAll('.item').length>=2){
            document.querySelectorAll('.item')[0].click();
            only1lineThrough = true;
            for(let i=0;i<document.querySelectorAll('.item').length;i++){

                if(i!=0 && (document.querySelectorAll('.item')[i].style.textDecoration=="line-through"||
                  document.querySelectorAll('.item')[i].contains(document.querySelector('strike')))
                ){
                    only1lineThrough = false;
                }
                if(i==0 && !(document.querySelectorAll('.item')[i].style.textDecoration=="line-through"||
                  document.querySelectorAll('.item')[i].contains(document.querySelector('strike')))){
                    only1lineThrough = false;
                  }
            }
            if(only1lineThrough){
                passed++;
            }
        }

    }
}

console.log(passed);
