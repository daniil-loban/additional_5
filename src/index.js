module.exports = function check(str, bracketsConfig) {

   var openStack=[]
   var stackTop = openStack.length-1
   var conf = bracketsConfig.join("").replace(/,/g,'');

   for (var i = 0; i < str.length; i++) {
        
        stackTop = openStack.length-1
        char = str[i];
        var idx = conf.indexOf(char);          // '(' - even ;  ')' - odd

        if (idx == -1){                        // CHECK INDEX IN CONFIG:  
            continue;                          // Skip other symbols 
        } else if (openStack.length > 0        // If any bracket is open   
               && (idx % 2 == 0)               // Мay be it's not 'open bracket', but 'close...' like | & |
               && (conf[idx + 1] == char)      // A 'close bracket' in config is same as an opened bracket 
               && openStack[stackTop] == idx){ // This bracket is realy opened
            openStack.pop();                   // Close & Next
            continue;
        }

        if (idx % 2 == 0){               // Open brackets
            openStack.push(idx);
        } else {                         
            if (openStack.length == 0){
                return false             // There is nothing to close ( mistake )
            }
            idxOpened = openStack[openStack.length-1]
            if ( idxOpened + 1 == idx) {                
                openStack.pop();         // Normal brackets closing               
            }
        }
   }
   return openStack.length == 0;
};







