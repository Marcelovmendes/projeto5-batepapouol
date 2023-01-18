let question= '';


let messagebefore = [
   {from:`Marcelo`,
   to: `all`,
   text:'exp',
   type:'message'},

   {from:`Marcelo`,
   to: `all`,
   text:'exp',
   type:'message'},

   {from:`Marcelo`,
   to: `all`,
   text:'exp',
   type:'message'}

];

console.log(messagebefore);

//salvar o nome quando a pessoa entrar
function login(){
    question = prompt('Qual seu nome?');


    let obj = {name:`${question}`};

    const request = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",obj);
    debugger;
    request.then(processarin);
    request.catch(processarout);

}
login();
 // se for recebido pela api mostrar na tela
    function processarin(response) {

        console.log(response);
        console.log(response.data);

       lista = `
    <ul class="dm">
          <li class="time"></li>
          <li class="text">${question} entrou na sala </li>
        </ul> `

        console.log(response);
        console.log(response.data);
    }
    function processarout(error){
        alert('deu ruim');
        console.log(error.code);
    }

 // pegar os dados digitados nos imputs
 // criar nova array ao digitar o texto

function savetext(){

   const normalmessage = document.querySelector('.text-dm').value;
    const newmessage = {
        from:`${question}`,
        to:   `all`,
        text: `${normalmessage}`,
        type: `message`,
     };

     console.log(newmessage);
     messagebefore.push(newmessage);

    }

