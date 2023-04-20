const inputTarefa = document.querySelector('.nova-tarefa-input')
const adicionarBotao = document.querySelector('.nova-tarefa-botao')
const listaDeTarefas = document.querySelector('.lista-de-tarefas')

const validarInput = () => {
    if(inputTarefa.value.trim().length > 0) {
        return true
    } else
    return false
}

const adicionarTarefa = () => {
    const inputValido = validarInput()

    if(!inputValido) {
        return inputTarefa.classList.add('error')
    }

    const tarefaContainer = document.createElement('div')
    tarefaContainer.classList.add('task-item')

    const paragrafoTarefa = document.createElement('p')
    paragrafoTarefa.innerText = inputTarefa.value

    paragrafoTarefa.addEventListener('click', () => clicarBotao(paragrafoTarefa))

    const deleteItem = document.createElement('i')
    deleteItem.classList.add('fa-solid')
    deleteItem.classList.add('fa-trash')

    deleteItem.addEventListener('click', () => deletaBotao(tarefaContainer, paragrafoTarefa))

    tarefaContainer.appendChild(paragrafoTarefa)
    tarefaContainer.appendChild(deleteItem)

    listaDeTarefas.appendChild(tarefaContainer)

    inputTarefa.value = ''

    atualizaLocalStorage()
}

const clicarBotao = (paragrafoTarefa) => {
    const tarefas = listaDeTarefas.childNodes

    for(const tarefa of tarefas) {
        const tarefaEstaSendoClicada = tarefa.firstChild.isSameNode(paragrafoTarefa)
        if(tarefaEstaSendoClicada) {
            tarefa.firstChild.classList.toggle('completed')
        }
    }

    atualizaLocalStorage()
} 

const deletaBotao = (tarefaContainer ,paragrafoTarefa) => {
    const tarefas = listaDeTarefas.childNodes
    for (const tarefa of tarefas) {
        const tarefaEstaSendoClicada = tarefa.firstChild.isSameNode(paragrafoTarefa)
        if(tarefaEstaSendoClicada) {
            tarefaContainer.remove()
        }
    }
    atualizaLocalStorage()
}

const inputMuda = () => {
    const inputValido = validarInput()

    if(inputValido) {
        return inputTarefa.classList.remove('error')
    }
}

const atualizaLocalStorage = () => {
    const tarefas = listaDeTarefas.childNodes;

    const localStorageTarefas = [...tarefas].map(tarefa => {
        const conteudo = tarefa.firstChild
        const ifCompleta = conteudo.classList.contains('completed')

        return {description: conteudo.innerText, isCompleted}
    })

    localStorage.setItem('tarefas', JSON.stringify(localStorageTarefas))
}

const atualizarTarefasLocalStorage = () => {
    const tarefasDoLocalStorage = JSON.parse(localStorage.getItem('tarefas'))

    if(!tarefasDoLocalStorage) return

    for(const tarefa of tarefasDoLocalStorage) {
        const tarefaContainer = document.createElement('div')
        tarefaContainer.classList.add('task-item')
    
        const paragrafoTarefa = document.createElement('p')
        paragrafoTarefa.innerText = tarefa.description

        if(tarefa.isCompleted) {
            paragrafoTarefa.classList.add('completed')
        }
    
        paragrafoTarefa.addEventListener('click', () => clicarBotao(paragrafoTarefa))
    
        const deleteItem = document.createElement('i')
        deleteItem.classList.add('fa-solid')
        deleteItem.classList.add('fa-trash')
    
        deleteItem.addEventListener('click', () => deletaBotao(tarefaContainer, paragrafoTarefa))
    
        tarefaContainer.appendChild(paragrafoTarefa)
        tarefaContainer.appendChild(deleteItem)
    
        listaDeTarefas.appendChild(tarefaContainer)
    }
}

atualizarTarefasLocalStorage()

adicionarBotao.addEventListener('click', () => adicionarTarefa())

inputTarefa.addEventListener('change', () => {
    inputMuda()
})
