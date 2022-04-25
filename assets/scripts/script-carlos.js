const API_QUIZZ = 'https://mock-api.driven.com.br/api/v6/buzzquizz'; 

//variáveis globais 
let porcentagemCorretaResposta = 0; 
let respostaPorcentagem = 0; 
let contadorResposta = 0; 
let quizz = null; 
let quizzID = null; 

function obterTodosQuizzes () {
    const promise = axios.get(`${API_QUIZZ}/quizzes`); 
    promise.then(renderizarTodosQuizzes); 
}

//Função para criar o html e fazer inserção na página 
function renderizarTodosQuizzes (resposta) {
    console.log(resposta.data); 

    const listaTodosQuizzes = document.querySelector('.listagem-todos-quizzes'); 


    for (let i = 0; i < resposta.data.length; i++) {

        const listaQuizzes = resposta.data[i]; 
        
        listaTodosQuizzes.innerHTML += `
        <div class="box-quizzes" id=${listaQuizzes.id} onclick="irPaginaQuizz(this)">
            <img class="box-quizzes-img" src="${listaQuizzes.image}" alt="">
            <h3 class="box-quizzes-titulo">${listaQuizzes.title}</h3>
        </div>
        `
    }

}

obterTodosQuizzes(); 

function irPaginaQuizz (quizz) {
    let quizzID = quizz.id; 

    document.querySelector(".criarquiz").classList.add("hidden");
    document.querySelector(".container-lista-quizzes").classList.add("hidden");
    document.querySelector(".container-quizz-perguntas").classList.remove("hidden");

    let promise = axios.get(`${API_QUIZZ}/quizzes/${quizzID}`); 

    setTimeout(() => {
        promise.then((resposta) => {
            exibirQuizz(resposta); 
        })

        }, 500); 
}

function exibirQuizz (resposta) {
    const paginaQuizzPerguntas = document.querySelector('.container-quizz-perguntas'); 

    quizz = resposta.data; 


    let titulo = quizz.title; 
    let imagem = quizz.image; 
    let questoes = quizz.questions; 



    let boxPerguntas = ""; 
    let boxRespostas = ""; 

    questoes.forEach(questao => {
        let respostas = questao.answers.sort(() => Math.random() - 0.5);
        
    //for (let i = 0; i < questoes.length; i++) {


        //for (let j = 0; j <  respostas.length; j++) {
        respostas.forEach(resposta => {
            
            boxRespostas += `
            <div class="opcao" identificacao="resposta" onclick="clickResposta(this)" data-isCorrectAnswer="${resposta.isCorrectAnswer}">
                    <img class="opcao-img" src=${resposta.image} alt="">
                    <h4>${resposta.text}</h4>
            </div>
            `;
        }); 

        boxPerguntas += `
        <div class="box-quizz-perguntas" identificacao="questao" id="${" questao-" + questoes.indexOf(questao)}">
            <div class="perguntas-top" style="background-color:${questao.color}">
                <h3>${questao.title}</h3>
            </div>
            <div class="box-opcoes">
             ${boxRespostas}
            </div>
        </div>
        `;

        boxRespostas = "";   
    });

    boxTop = `
    <div class="cabecalho-quizz-perguntas">
        <img class="perguntas-img" src="${imagem}" alt="">
        <h3 class="perguntas-titulo">${titulo}</h3>
    </div>

    ${boxPerguntas}

    <div class="box-quizz-resultado">



    </div>

    <button class="boton2">
        <h3>Reiniciar Quizz</h3>
    </button> 

    <button class="boton6" onclick="voltarHome()">
            <h3>Voltar home </h3>
    </button>

    `;

    paginaQuizzPerguntas.innerHTML += boxTop; 
}


function voltarHome () {
    window.location.reload(); 
}

function clickResposta(resposta) {
    let totalQuestoes = document.querySelectorAll(".box-quizz-perguntas").length;
    contadorResposta += 1; 
    respostaPorcentagem = 100/totalQuestoes; 

    let conjuntoResposta = resposta.parentNode.firstChild; 

    console.log(conjuntoResposta); 

    while (conjuntoResposta !== null) {
        if (conjuntoResposta === resposta) {
            if (resposta.getAttribute("data-isCorrectAnswer") === "true") {
                porcentagemCorretaResposta += respostaPorcentagem; 
                resposta.classList.add("correto"); 
            } else {
                resposta.classList.add("errado"); 
            }
        } else {
            conjuntoResposta.classList.add("nao-selecionado"); 

            if (conjuntoResposta.getAttribute("data-isCorrectAnswer") === "true") {
                conjuntoResposta.classList.add("correto"); 

            } else {
                conjuntoResposta.classList.add("errado"); 
            }
        }

        conjuntoResposta = conjuntoResposta.nextElementSibling; 

    }

    let questaoProxima = resposta.parentNode.nextElementSibling;

    if (questaoProxima !== null) {
        setTimeout(() => questaoProxima.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" }), 50);
    }

    if (contadorResposta === totalQuestoes) {
        let fixarPorcentagem = Math.ceil(porcentagemCorretaResposta); 
        setTimeout(mostraResultado, 500, fixarPorcentagem); 
    }

}

function mostraResultado(porcentagemCorretaResposta) {
    let niveis = quizz.levels; 

    let boxResultado = ""; 

    levels.forEach(nivel => {
        if (porcentagemCorretaResposta >=nivel.minValue) {
            boxResultado = `
            <h4>${porcentagemCorretaResposta}% de acerto: ${nivel.title} </h4> 
            <img class="opcao-img" src=${nivel.image} alt="">
            <p> ${nivel.text}</p> 
            `;
        }
    })

    const quizzResultado = document.querySelector(".box-quizz-resultado"); 
    
    quizzResultado.innerHTML += boxResultado; 
    quizzResultado.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });




}