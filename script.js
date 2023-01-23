let username= '';
let lista = '';
let newmessage;


username = prompt('Qual seu nome?');

//salvar o nome quando a pessoa entrar
function login(){

    const request = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",{name:username});

    request.then(response0 => promissein(response0));
    request.catch(error0 => promisseout(error0));
}
login();
//se a promessa for cumprida o usuario entrou na sala
function promissein(response0) {    
    console.log('Ok login');  
    setInterval(statuscheck, 5000);
    setInterval(getmessage,3000);

}
function promisseout(error0){

  window.location.reload();
  
 // verificar o status do participante
}
function statuscheck(){

 
   const request =axios.post("https://mock-api.driven.com.br/api/v6/uol/status",{name:username});

   //a cada 5s enviar requisição 
   request.then(response1 => statusin(response1));
   request.catch(error1 => statusout(error1));

} 
// verificacao do status api

function statusin(response1){

    console.log('status OK');
}
function statusout(error1){
    console.log(error1.data);  
    const user = error1.data.status;
    if( user === '409'){
        alert('usuário já logado')
    }
  
}

// postar as mensagens da api
function postmessage (){    

    let chat = document.querySelector('.text-dm').value;

   let message = {
        from:username, // o nome q eu peguei no login
        to:"Todos", // o padrao requisitado
        text:chat, // o que foi digitado
        type:"message" // padrao requisitado
    }

    const request = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',message);
    

    request.then(promisse1 => postin(promisse1));
    request.catch(promisse2 => postout(promisse2));
}
function postin(promisse1){
   
    console.log(promisse1.data);
    console.log('postou as mensagens');

}

function postout(promisse2){

    console.log(promisse2);
    console.log('não postou as mensagens');
    const user = promisse2.response.status;
    if(user === '400'){
        alert('Erro ao executar esse processo, recarregue a pagin');
    }
}

// requisição das mensagens da api
 function getmessage(){
//teste async
   const request= axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")

 request.then(promisse => messagein(promisse))
 request.catch(promisse0 => messageout(promisse0))

}
//setInterval(messagein,3000)       
function messagein(promisse){
    console.log('pegou as mensagens');
    newmessage = promisse.data;
   createchat();
}

function messageout(promisse0){
    console.log(promisse0.data);
    window.location.reload();
}

//criar template 
function createchat(){
    
    let main = document.querySelector('.mid');
    let template;

    main.innerHTML ='';
    
   for(let i=0; i < newmessage.length; i++){

      if(newmessage[i].type === 'status'){
        template =`
        <li class="dm dm-login"data-test="message">
        <span class="time"><h1>(${newmessage[i].time})</h1></span>
        <span class="txt"> <h1><b>${newmessage[i].from}<b/> ${newmessage[i].text}.</h1></span>
      </li>
        `
        main.innerHTML+= template;
        main.lastElementChild.scrollIntoView();
        }
      else if (newmessage[i].type === 'message'){
        let template =`
        <li class="dm dm-public" data-test="message">
        <span class="time"><h1>(${newmessage[i].time})</h1></span>
        <span class="txt"><h1><b>${newmessage[i].from}</b> para <b>${newmessage[i].to}</b>: ${newmessage[i].text}</h1></span>
      </li>
        `
        main.lastElementChild.scrollIntoView();
        main.innerHTML+= template;
       } 
       else if (newmessage[i].type === 'private_message'){
        let template =`
        <li class="dm dm-private" data-test="message">
        <span class="time"><h1>(${newmessage[i].time})</h1></span>
        <span class="txt"><h1><b>${newmessage[i].from}</b> para <b>${newmessage[i].to}</b>: ${newmessage[i].text}</h1></span>
      </li>
        `
        main.lastElementChild.scrollIntoView();
        main.innerHTML+= template;
       } 
    }

}

