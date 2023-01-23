let username= '';
let lista = '';
let newmessage;


username = prompt('Qual seu nome?');

//salvar o nome quando a pessoa entrar
function login(){

    const request = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",{name:username});

   request.then(promissein);
   request.catch(promisseout);
}
login();
//se a promessa for cumprida o usuario entrou na sala
function promissein(response0) {    
    console.log('Ok login');  
}
console.log(newmessage)

function promisseout(error0){

    const user = error0.response.status;

    if(user === 409){
        alert('usario ja conectado')
        window.location.reload(true);
    }
}
 // verificar o status do participante

function statuscheck(){

 
   const request =axios.post("https://mock-api.driven.com.br/api/v6/uol/status",{name:username});

   //a cada 5s enviar requisição 
   request.then(statusin);
   request.catch(statusout);

} 
statuscheck();
// verificacao do status api
setInterval(statuscheck, 5000);

function statusin(response1){

    console.log('status OK');
}
function statusout(error1){

    console.log(error1.data);  
}

// postar as mensagens da api
function postmessage (){    

    let chat = document.querySelector('.text-dm').value;

    newmessage = {
        from:username, // o nome q eu peguei no login
        to:"Todos", // o padrao requisitado
        text:chat, // o que foi digitado
        type:"message" // padrao requisitado
    }

    const request = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',newmessage);
    

    request.then(promisse1 => postin(promisse1));
    request.catch(promisse2 => postout(promisse2));
}
function postin(promisse1){
   
    console.log(promisse1.data);
    console.log('postou as mensagens')

}

function postout(promisse2){

    console.log(promisse2);
    console.log('não postou as mensagens');
}

// requisição das mensagens da api
async function getmessage(){
//testando
 await axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")

 .then(promisse => messagein(promisse))
 .catch(promisse0 => messageout(promisse0))

}
getmessage();
//setInterval(getmessage,3000)       
function messagein(promisse){
    console.log('pegou as mensagens');
    console.log(promisse.data)
    newmessage = promisse.data;
    console.log(newmessage);
   //createchat();
}
console.log(newmessage);
function messageout(promisse0){

    console.log(promisse0.promisse );
    console.log('nao pegou as mensagens');
    window.location.reload();
}

//criar template 

function createchat(){
    
    let template = document.querySelector('.mid');

   for(let i=0; i < newmessage.length; i++){

      if(newmessage.type === 'status'){
        template= `
        <ul class="dm dm-login">
        <li class="time"><h1>(${newmessage[i].time})</h1></li>
        <li class="txt"> <h1><b>${newmessage[i].from}<b/>${newmessage[i].text}.</h1></li>
      </ul>
        `
        template.innerHTML += template;
        template.scrollIntoView();

      }
       if (newmessage.type === 'message'){
        template= `
        <ul class="dm">
        <li class="time"><h1>(${newmessage[i].time})</h1></li>
        <li class="txt"><h1><b>${newmessage[i].from}<b/>para<b>${newmessage[i].to}</b>: ${newmessage[i].text}</h1></li>
      </ul>
        `
        template.innerHTML += template;
        template.scrollIntoView();
      } 
    }

} 
