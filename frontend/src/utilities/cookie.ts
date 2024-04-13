export function getCookie(key: string){
let b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
if(!b){
 return null;   
} 
return b.pop();
}
