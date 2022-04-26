const API = "https://mock-api.driven.com.br/api/v6/buzzquizz";
const valor=0;
const valorniveis=0;
const valor1=[];
const verificartitulo=[];
const verificarcolor=[];
const info={};

function abrirMenu() {
    document.querySelector(".criarquiz").classList.add("hidden");
    document.querySelector(".container-lista-quizzes").classList.add("hidden");
    document.querySelector(".conteiner").classList.remove("hidden");
    console.log("ola mundo")
}

// ------ tela 03 ------------

let quizzInfo = {}
function basicQuizzInformation() {
    quizzInfo = {
        title: '',
        image: '',
        numberQuestions: 0,
        numberLevels: 0,
        questions: [],
        levels: []
    }
}
function saveValuesBasicQuizzInformation() {
    const title = document.querySelector(".input-quizz-titulo");
    const image = document.querySelector(".input-quizz-url");
    const numberQuestions = document.querySelector(".input-quizz-qtd-perguntas");
    const numberLevels = document.querySelector(".input-quizz-qtd-niveis");

    info.title = title.value;
    info.image = image.value;
    quizzInfo.numberQuestions = numberQuestions.value;
    quizzInfo.numberLevels = numberLevels.value;
    console.log(info)
}
function validateSimpleQuestions () {
    const titulodoquiz=document.querySelector(".input-quizz-titulo");
    const numperguntas=document.querySelector(".input-quizz-qtd-perguntas");
    const urlimg=document.querySelector(".input-quizz-url");
    const url=urlimg.value;
    let valor=numperguntas.value;
    const valor1=titulodoquiz.value;
    let vaurl=isImage(url);
    if(valor>=3 && (valor1.length>=20 && valor1.length<=65) && (vaurl===true)){  
    window.scrollTo(0, 0);

    }else{
        alert("Algum dado está inválido, tente novamente 🙂!")
        return false;
    }
}
function abrirMenu1() {
    const validate =  validateSimpleQuestions ();
    if (validate==false) return;
    saveValuesBasicQuizzInformation()
    document.querySelector(".conteiner").classList.add("hidden");
    document.querySelector(".conteiner1").classList.remove("hidden");
    console.log("ola mundo")
    const titulodoquiz=document.querySelector(".input-quizz-titulo");
    const numperguntas=document.querySelector(".input-quizz-qtd-perguntas");
    const urlimg=document.querySelector(".input-quizz-url");
    const url=urlimg.value;
    let valor=numperguntas.value;
    const valor1=titulodoquiz.value;
    let vaurl=isImage(url);
    const ulpeople = document.querySelector(".conteiner1");
    for (let i=1;i<=valor;i++){
    if(valor>=3 && (valor1.length>=20 && valor1.length<=65) && (vaurl===true)){   
        ulpeople.innerHTML += `
        <div class= "inside" data-identifier="expand">
        <h3>Pergunta ${i}</h3>
        <button onclick ="openQuestions(${i})" >
        <img src="assets/images/Vector.svg"  alt="" >
       </button>
        </div>
        <div class="orden${i}  hidden">
        <div class="criarsuasperguntas"  >
        
        <input id="${i}-question" placeholder="Texto da pergunta"  type="texto" class="answer-text-"></input>

        <input id="${i}-color" placeholder="Cor de fundo da pergunta"  type="texto" class="answer-color-"></input>


        <h3>Resposta correta</h3>

        <input id="${i}-correct-answer" placeholder="Resposta correta" class="answer-correct-"></input>
        <input  id="${i}-correct-url" placeholder="URL da imagem" class="answer-correct-url-"></input>


        <h3>Respostas incorretas</h3>


        <input id="${i}-wrong-answer1" placeholder="Resposta incorreta1" class="answer-incorrect-0"></input>
        <input id="${i}-wrong-url1" placeholder="URL da imagem1" class="answer-icnorrect-url-0"></input>

        <div class="separador"></div>

        <input id="${i}-wrong-answer2" placeholder="Resposta incorreta2"  type="texto" class="answer-incorrect-1"></input>
        <input id="${i}-wrong-url2" placeholder="URL da imagem2" type="texto" class="answer-icnorrect-url-1"></input>

        <div class="separador"></div>

        <input id="${i}-wrong-answer3" placeholder="Resposta incorreta3" type="texto"  class="answer-incorrect-2"></input>
        <input id="${i}-wrong-url3" placeholder="URL da imagem3" type="texto" class="answer-icnorrect-url-2"></input>
         </div>
        </div>
      `;
    
    
  }
}
    ulpeople.innerHTML += `
    <button class="boton3" onclick="abrirMenu2()">
    <h3>Prosseguir pra criar níveis</h3>
    </button>
    `;
    
   
}

function openQuestions (i) {  
    const question = document.querySelector(`.orden${i}`);
    question.classList.toggle("hidden")
}

// ------ informacaoApi ------------
function saveValuesCreateQuizzQuestions() {
    saveValuesBasicQuizzInformation()
    const verificartitulo=document.querySelectorAll('input[class=answer-text-]');
    const verificarcolor=document.querySelectorAll('input[class=answer-color-]');
    const verificarrescorrect= document.querySelectorAll('input[class=answer-correct-]');
    const verificarincorrect0=document.querySelectorAll('input[class=answer-incorrect-0]');
    const verificarincorrecturl0=document.querySelectorAll('input[class=answer-icnorrect-url-0]');
    const verificarincorrect1=document.querySelectorAll('input[class=answer-incorrect-1]');
    const verificarincorrecturl1=document.querySelectorAll('input[class=answer-icnorrect-url-1]');
    const verificarincorrect2=document.querySelectorAll('input[class=answer-incorrect-2]');
    const verificarincorrecturl2=document.querySelectorAll('input[class=answer-icnorrect-url-2]');
    const verificarurl=document.querySelectorAll('input[class=answer-correct-url-]');
    quizzInfo.questions = [];
    for (let i = 0; i < quizzInfo.numberQuestions; i++) {
        quizzInfo.questions.push({
            title:verificartitulo[i].value,
            color:verificarcolor[i].value,
            answers: [
                {
                    text:verificarrescorrect[i].value ,
                    image:verificarurl[i].value ,
                    isCorrectAnswer: true
                },
                {
                    text:verificarincorrect0[i].value,
                    image:verificarincorrecturl0[i].value ,
                    isCorrectAnswer: false
                },
                {
                    text:verificarincorrect1[i].value ,
                    image: verificarincorrecturl1[i].value,
                    isCorrectAnswer:false
                },
                {
                    text:verificarincorrect2[i].value ,
                    image: verificarincorrecturl2[i].value,
                    isCorrectAnswer:false
                },
            ]
        }

            
        )
    }
    info["questions"]=quizzInfo.questions
    console.log(info)

}                    
  // ------ verificarURL ------------                
function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}
// ------ verificarformatocolor------------
function checkColor (color) {
    const regexColor = /^\#([0-9]|[A-F]|[a-f]){6}$/;
    return regexColor.test(color);
}
function testar(){
    saveValuesBasicQuizzInformation()
    saveValuesCreateQuizzQuestions()
    const verificartitulo=document.querySelectorAll('input[class=answer-text-]');
    const verificarcolor=document.querySelectorAll('input[class=answer-color-]');
    const verificarrescorrect= document.querySelectorAll('input[class=answer-correct-]');
    const verificarincorrect=document.querySelectorAll('input[class=answer-incorrect-0]');
    const verificarurl=document.querySelectorAll('input[class=answer-correct-url-]');
    var tabLength = verificartitulo.length;
    console.log(tabLength)
    var input;
    var input2;
    var input3;
    var input4;
    var input5;
    for (var i = 0; i < tabLength ; ++i) {
      input = verificartitulo[i];
      input2=verificarcolor[i];
      input3=verificarrescorrect[i];
      input4=verificarincorrect[i];
      input5=verificarurl[i];
    if (input.value < 20 || input.value=== 0) {
    alert('O título deve ter no mínimo 20 caracteres 🙂');
    return false;
   }else if(!checkColor(input2.value) || input2.value === 0 ) {
    alert('A cor deve ser no formato hexadecimal 🙂 (ex: #000000 para black, #FF0000 para red, #0000FF para blue');
    return false;
   }else{
    if((input3.value<1)){
        alert('O quizz deve conter 1 resposta correta e pelo menos 1 resposta incorreta 🙂');
        return false;
    }else{
        if(!isImage(input5.value)){
            alert('Insira uma url válida 🙂');
          return false;
        }
    }
    }
    }
} 

function abrirMenu2() {
    const validate = testar();
    if (validate==false) return;
    document.querySelector(".conteiner1").classList.add("hidden");
    document.querySelector(".conteiner2").classList.remove("hidden");
    console.log("ola mundo")
    const numniveis=document.querySelector(".input-quizz-qtd-niveis");
    const valorniveis=numniveis.value;
    const ulpeople = document.querySelector(".conteiner2");
    for (let i=1;i<=valorniveis;i++){
        
        ulpeople.innerHTML += `
       
        <div class= "inside" data-identifier="expand">
        <h3>Nivel ${i}</h3>
        <button onclick ="openlevels(${i})" >
        <img src="assets/images/Vector.svg"  alt="">
        </button>
        </div>
        <div class="orden2${i} hidden">
        <div class="criarnivel">
         
            <input id="${i + 1}-Tittle_level" placeholder="Título do nível" class="level-titulo"></input>

            <input id="${i + 1}-minimum_Hits" placeholder="% de acerto mínima" type="number" min="0" max="100" class="level-sucess"></input>

            <input id="${i + 1}-levelUrl" placeholder="URL da imagem do nível" class="level-url"></input>

            <input id="${i + 1}-LevelDescription" placeholder="Descrição do nível" class="level-description"></input>

        </div>
        </div>
        `; 
    }
    ulpeople.innerHTML += `
    <button class="boton4" onclick="abrirMenu3()">
    <h3>Finalizar Quizz</h3>
    </button>
    `;
  
}
function openlevels (i) {  
    const level = document.querySelector(`.orden2${i}`);
    level.classList.toggle("hidden")
}

// ------ informacaoApi ------------
function saveValuesCreateQuizzLevels(){
    saveValuesBasicQuizzInformation()
    saveValuesCreateQuizzQuestions()
    quizzInfo.levels = [];
    const title= document.querySelectorAll('input[class=level-titulo]');
    const image= document.querySelectorAll('input[class=level-url]');
    const text=document.querySelectorAll('input[class=level-description]');
    let minValue= (document.querySelectorAll('input[class=level-sucess]'));
    for (let i = 0; i < quizzInfo.numberLevels; i++) {
        quizzInfo.levels.push( {
            title: title[i].value,
            image: image[i].value,
            text: text[i].value,
            minValue: minValue[i].value
          });
    }
    info["levels"]=quizzInfo.levels
}
function testar2(){
    saveValuesCreateQuizzLevels();
   const title= document.querySelectorAll('input[class=level-titulo]');
   const image= document.querySelectorAll('input[class=level-url]');
   const text=document.querySelectorAll('input[class=level-description]');
   let minValue= (document.querySelectorAll('input[class=level-sucess]'));
   const numniveis=document.querySelector(".input-quizz-qtd-niveis");
   const valorniveis=numniveis.value;
   for (let i = 0; i < valorniveis; i++) {
      var ti = title[i];
      var im=image[i];
      var tex=text[i];
      var porcent=minValue[i];
      if (ti.value.length < 10) {
        alert('O título deve ter pelo menos 10 caracteres 🙂');
       return false;
      } else if (!isImage(im.value)) {
        alert('Insira uma url válida 🙂');
        return false;
      }  else{

     if (tex.value.length < 30) {
        alert('A descrição do nível deve ter no mínimo 30 caracteres 🙂');
        return false;
      }
    }
     if (porcent.value < 0 || porcent.value> 100 || porcent.value=='') {
        alert('A % de acerto mínima deve ser entre 0 e 100 🙂');
        return false;
      }else{
          if(porcent.value == null ){
            alert('A % de acerto mínima deve ser entre 0 e 100 🙂');
            return false;  
          }
      }

}
   
}

function abrirMenu3() {
    const validate1 = testar2();
    if (validate1==true) return;
    document.querySelector(".conteiner2").classList.add("hidden");
    document.querySelector(".conteiner3").classList.remove("hidden");
    console.log("ola mundo")
    PostQuizz ()
    createQuizzSuccess ()
}


function PostQuizz () {
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes", info)
    promise.then(postValido)
    promise.catch(postInvalido)
    console.log(info)
}

function postValido (response){
    saveLocalStorage(response)
}
// ------ informacaoApi ------------
function saveLocalStorage (response) {
    var meusQuizzes = JSON.parse(localStorage.getItem('meusQuizzes') || '[]');
    meusQuizzes.push({
        id: response.data.id,
        title: response.data.title,
        background_image: response.data.image
    });

      // Salva a lista alterada
    localStorage.setItem("meusQuizzes", JSON.stringify(meusQuizzes));
}

function postInvalido (erro) {
    const statusCode = erro.response.data
    console.log(statusCode)
    alert("Deu ruim")
}

function createQuizzSuccess (id) {
    const ulpeople = document.querySelector(".conteiner3");
    ulpeople.innerHTML = `
    <div class="create-quiz">
        <div class="subtitulo1">Seu quizz está pronto!</div>
        <div class="quizfeito" onclick="mostrar(${id})">
            <img class="hola"src="${info.image}">
      
            <div class="subtitulo2">${info.title}</div>
        </div>
        <button class="boton5" onclick="mostrar(${id})">Finalizar Quizz</button>
        <div class="boton6" onclick="voltarhome()">Voltar pra home</div>
    </div>
    `;
}
function voltarhome(){
    window.location.reload()
}
function mostrar(idQuizz){
    const promise = axios.get(`${API}/quizzes/${idQuizz}`);
    promise.catch(()=> alert("Erro de acesso ao Quizz"))
}
function obterQuizzes() {
    const promise = axios.get(`${API}/quizzes`);
    promise.then(renderizarQuizzes)
    promise.catch(() => alert("Erro coleta de dados API"))
    console.log(promise)
}
