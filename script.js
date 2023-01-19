let question= '';
let lista = '';
let obj;

let messagebefore = [
   {from:`Marcelo`, 
   to: `all`,
   text:'exp',
   type:'message'},

   {from:`Marcelo`,
   to: `all`,
   text:'exp',
   type:'message'},

];

//salvar o nome quando a pessoa entrar
function login(){
    question = prompt('Qual seu nome?');


     obj = {
        name:`${question}`
    };

    const request = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",obj);

   request.then(promissein);
   request.catch(promisseout);
}
login();
//se a promessa for cumprida o usuario entrou na sala
function promissein(response0) {    
    console.log(response0);  
    console.log(response0.data);

    let list = document.querySelector('.mid ');
    for(let i = 0;i< response0.data.length-1; i++){
        
        
        let obj = response0.data[i];
        list.innerHTML = list.innerHTML +   `
        <ul class="dm">
          <li class="time"><h1>(10:21:53)</h1></li>
          <li class="txt"><h1>${question} entrou na sala... </h1></li>
        </ul>
        `
    }
}

function promisseout(error){
    console.log('user invalido');
}
promissein();

 // verificar o status do participante

function statuscheck(){

   obj = {
    name:`${question}`,
   };

   const request =axios.post("https://mock-api.driven.com.br/api/v6/uol/status",obj);

   //a cada 5s enviar requisição 
   request.then(statusin);
   request.catch(statusout);

} 
setTimeout(statuscheck, 5000);

function statusin(response1){
    console.log(' status OK');
    console.log(response1);
    console.log(response1.data);
}
function statusout(error1){

    console.log('o usuario saiu');
    console.log(error1.response.status);

    const user = erro.response.status;
    if(user === 400){
        alert('usario ja conectado')
        location.reload(true);
    }
}

   //se for recebido pela api mostrar na tela
 

 // pegar os dados digitados nos imputs
 // criar nova array ao digitar o texto
   


 function savetext(){

   const normalmessage = document.querySelector('.text-dm').value;
   const mmessage =`
   <ul class="dm">
   <li class="time"><h1>(10:21:53)</h1></li>
   <li class="txt"><h1>${obj.nome} para: ${normalmessage}</h1></li>
 </ul>
   `
    const newmessage = {
        from:`${question}`,
        to:   `Todos`,
        text: `${normalmessage}`,
        type: `mensagem`,
    };

     console.log(newmessage);
     messagebefore += messagebefore.push(newmessage);

     const request = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",newmessage);
      
      request.then(messagecheck);
      request.catch(messageNocheck);

}

function messagecheck(response2){

        console.log(response2);
}

function messageNocheck(error2){
    
    console.log('Não chegou a mensagem');   
    console.log(error2);
}