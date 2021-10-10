//Elementos
const input = document.querySelector('.input')
const button = document.querySelector('.button')
const lista = document.querySelector('.lista')
const apaga = document.querySelector('.apagar')

//Adionar Tarefa
  //Click
button.addEventListener('click', (e) => {
    e.preventDefault()
    //Verificando se foi escrito algo
    if(input.value !== ''){
        criarItem(input.value)
        salvarTarefas()
    } else {input.focus()}
} )
    //Enter
input.addEventListener('keypress', (e) => {
    if(e.keyCode === 13){ //13 é o código do 'Enter'
        e.preventDefault()
        //Verificando se foi escrito algo
        if(input.value !== ''){
            criarItem(input.value)
            salvarTarefas()
        } else {input.focus()}
    }
} )

//Criar Tarefa
const criarItem = (texto) => {
    //Elementos necessários: 1.Item da lista; 2. Elemento parágrafo 3.Botão de apagar
    const item = document.createElement('li')
    const paragrafo = document.createElement('p')
    const botaoApagar = document.createElement('button')
    //Preparar o paragrafo
    paragrafo.innerText = texto
    paragrafo.setAttribute('class','texto')
    //Preparar o botão de apagar
    botaoApagar.innerText = 'X'
    botaoApagar.setAttribute('class','apagar')
    //Anexar o item a lista
    item.appendChild(paragrafo)
    item.appendChild(botaoApagar)
    lista.appendChild(item)
    //Limpar a entrada de dados
    input.value = ''
    //Focar na entradas de dados
    input.focus()
}
//Função Apagar tarefa
document.addEventListener( 'click', (e) => {
    if (e.target.classList.contains('apagar')) {
        //Remover o item da lista
        e.target.parentElement.remove()
        //Atualizar o LocalStorage
        salvarTarefas()
    }
} )
//Salvar no LocalStorage
const salvarTarefas = () => {
    //Selecionar os textos
    const liTarefas = lista.querySelectorAll('.texto')
    //Criar um array para salvar 
    let listaTarefas = []
    for (let tarefa of liTarefas){
        listaTarefas.push(tarefa.innerText)
    }
    //Salvar o array no LocalStorage
    const JSONTarefas = JSON.stringify(listaTarefas)
    localStorage.setItem('tarefas', JSONTarefas)
}
//Função de carregar as tarefas salvas
const carregarTarefas = () => {
    //Pegar o item
    const carregaLista = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(carregaLista)
    //Transforma-los em uma lista novamente
    for(let i of listaDeTarefas){
        criarItem(i)
    }
}
//Executar ao carregar a página
carregarTarefas()