let username= '';
let newmessage;


username = prompt('Qual seu nome?');

function login(){

    const request = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",{name:username});

    request.then(response0 => promissein(response0));
    request.catch(error0 => promisseout(error0));
}
login();

function promissein(response0) {    
    console.log('Ok login');  
    setInterval(statuscheck, 5000);
    setInterval(getmessage,3000);

}
function promisseout(error0){

  window.location.reload();
  
}
  function statuscheck(){

 
   const request = axios.post("https://mock-api.driven.com.br/api/v6/uol/status",{name:username})

   request.then(response1 => statusin(response1))
   request.catch(error1 => statusout(error1))

} 

function statusin(response1){

    console.log('status OK');
}
function statusout(error1){
    console.log(error1.data);  
    const user = error1.status;
    if( user === '409'){
        alert('usuário já logado')
    }
  
}


 function postmessage (){    

    let chat = document.querySelector('.text-dm').value;

   let message = {
        from:username, 
        to:"Todos", 
        text:chat, 
        type:"message"
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
    window.location.reload();
}

 function getmessage(){

   const request= axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")

 request.then(promisse => messagein(promisse))
 request.catch(promisse0 => messageout(promisse0))

}     
function messagein(promisse){
    console.log('pegou as mensagens');
    newmessage = promisse.data;
   createchat();
}

function messageout(promisse0){
    console.log(promisse0.data);
    window.location.reload();
}

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
        <li class="dm dm-public"        data-test="message">
        <span class="time"><h1>(${newmessage[i].time})</h1></span>
        <span class="txt"><h1><b>${newmessage[i].from}</b> para <b>${newmessage[i].to}</b>: ${newmessage[i].text}</h1></span>
      </li>
        `

          main.lastElementChild.scrollIntoView();
          main.innerHTML+= template;
        }
        
        if (newmessage[i].type === 'private_message'){
        let template =`
        <li class="dm dm-private"data-test="message">
        <span class="time"><h1>(${newmessage[i].time})</h1></span>
        <span class="txt"><h1><b>${newmessage[i].from}</b> para <b>${newmessage[i].to}</b>: ${newmessage[i].text}</h1></span>
      </li>
        `
 
          main.lastElementChild.scrollIntoView();
          main.innerHTML+= template;
       } 
    }
  }

