// function countdown(){
//     let i;
//     console.log("Countdown:");
//     for(i=5; i>=0; i--){
//         setTimeout(function(){
//             console.log(i===0 ? "GO!" : i);
//         }, (5-i)*1000);
//     }
// }

// function countdown(){
//     console.log("Countdown:");
//     for(let i=5; i>=0; i--){
//         setTimeout(function(){
//             console.log(i===0 ? "GO!" : i);
//         }, (5-i)*1000);
//     }
// }

// function countdown(){
//     let i;
//     console.log("Countdown:");
//     for(i=5; i>=0; i--){
//         (function(countingNumber){
//             setTimeout(function(){
//                 console.log(i===0 ? "GO!" : i);
//             }, (5-i)*1000);
//         })(i);
//     }
// }

function countdown(){
    console.log("Countdown:");
    for(let i=5; i>=0;i--){
        (function(countingNumber){
            setTimeout(function(){
                console.log(i===0 ? "GO!" : i);
            }, (5-i)*1000);
        })(i);
    }
}

countdown();