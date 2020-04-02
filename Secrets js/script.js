const output = document.querySelector('#encoded_rectangle');
const encodedChunks = document.querySelector('#encoded_chunks');
const text = document.querySelector('#normalized_text');
const string = document.querySelector('#message');
const error = document.querySelector('#alert');
var message = document.querySelector('[name="message"]');

//Prevents White Space
message.addEventListener('keypress', function ( e) {  
    var key = e.keyCode;
     if (key === 32) {
       e.preventDefault();
     }
 });


const encodeMessage = () => {
    
    //value of text input
    let message = string.value;

    var normalisedText = message.replace(/[^a-zA-Z0-9]/g, ",");
    



    var textCount = normalisedText.length;

   
   
    
    if(textCount==""){
        alert("Error field can't be empty")
        return false;
    }
    else if (textCount > 81) {
       alert("Error field has to be 81 characters long");
        return false;

    }
  
    
    
    var highest = Math.ceil(Math.sqrt(textCount));
    
    var lowest = Math.ceil(textCount/highest);
    var rect = [];
    var coded = [];
    
    var resulting = "";
    
    rect = rectangleSize(highest,lowest,normalisedText);
    //read text from top-down  
    coded = readFromTopDown(rect, highest);
    coded.forEach(co => {
        resulting += co.trim() + "  ";
    });
   
    //display input field count
    document.getElementById("count").innerHTML = textCount;

       //display Encoded Result

    document.getElementById("result").innerHTML = resulting;
    
    


    function rectangleSize(highest, lowest, normalise) {
        var rect = [];
        var startIndex = 0;
        for(var i = 0; i < lowest; i++){        
            if(i !== 0)
                startIndex += highest;
            if(normalise.substring(startIndex, startIndex + highest).length == highest){
                rect.push(normalise.substring(startIndex, startIndex + highest))
            }else{
                //get the remainder as spaces
                var spaces = highest - normalise.substring(startIndex, startIndex + highest).length;
                var textI = normalise.substring(startIndex, startIndex + highest);
                var str = textI + new Array(spaces + 1).join(' ');
                rect.push(str);
            }
           
            document.getElementById("encoded_rectangle").innerHTML += rect[i] + "</br>" 
          

        }
        return rect;

       

    }



    function readFromTopDown(rect, highest) { 
        var coded = [];
        for(var i = 0; i < highest; i++){   
            var textMain = "";     
            rect.forEach(re => {
                textMain += re.substring(i, i+1);
            });
            coded.push(textMain);
            document.getElementById("encoded_chunks").innerHTML += coded[i] + "</br>" 
        
        }
        return coded;
       
    }
    
    
}
