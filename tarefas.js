let listaTarefas = document.querySelectorAll('#lista-tarefas')[0]
let campoNovaTarefaNome = document.querySelectorAll('#nova-tarefa-nome')[0]
let campoNovaTarefaCategoria = document.querySelectorAll('#nova-tarefa-categoria')[0]
let botaoAdicionar = document.querySelectorAll('#incluir-nova-tarefa')[0]
let campoFiltroCategoria = document.querySelectorAll('#filtro-de-categoria')[0]

class Tarefa {
  constructor(nome, categoria, realizada) {
    this.nome = nome;
    this.categoria = categoria;
    this.realizada = realizada;
  }

  adicionaNaPagina(containerEl) {
  	let novoItemLista = document.createElement('li')
  	novoItemLista.classList.toggle('item-tarefa')
  	novoItemLista.classList.toggle(`categoria-${this.categoria}`)
  	novoItemLista.innerHTML = this.nome
  	if(this.realizada)
  		novoItemLista.classList.toggle('marcado')
  	if((this.categoria != campoFiltroCategoria.value) && (campoFiltroCategoria.value.length > 0))
  		novoItemLista.classList.toggle('retido-no-filtro')
  	containerEl.appendChild(novoItemLista)
  	return novoItemLista
  }
}

let nomesTarefas = ['Dever de casa', 'Brincar com minha tartaruguinha', 'Comprar tijolo', 'Estudar AWS']
let categoriasTarefas = ['estudos', 'lazer', 'compras', 'estudos']

let tarefas = []

tarefas.push(new Tarefa('Comprar leite', 'compras', false))
tarefas.push(new Tarefa('Escutar chimbinha', 'lazer', true))

for(let i = 0; i < nomesTarefas.length; i++) {
	tarefas.push(new Tarefa(nomesTarefas[i], categoriasTarefas[i], Math.floor(Math.random()*10)%2 == 0))
}

listaTarefas.innerHTML = ""

tarefas.forEach(tarefa => {
	tarefa.adicionaNaPagina(listaTarefas)
})

function adicionarNovaTarefa() {
	let novaTarefa = new Tarefa(campoNovaTarefaNome.value, campoNovaTarefaCategoria.value, false)
	tarefas.push(novaTarefa)
	let novoItemLista = novaTarefa.adicionaNaPagina(listaTarefas)
	campoNovaTarefaNome.focus()
}

botaoAdicionar.addEventListener('click', e => {
	adicionarNovaTarefa()
});

campoFiltroCategoria.addEventListener('change', e => {
	let itensLista = document.querySelectorAll('.item-tarefa')
	itensLista.forEach(item => {
		if(item.classList.toString().includes(campoFiltroCategoria.value))
			item.classList.remove('retido-no-filtro')
		else
			item.classList.add('retido-no-filtro')
	})
});

campoNovaTarefaNome.addEventListener('keyup', e => {
	if(e.key === 'Enter')
		adicionarNovaTarefa()
});

document.querySelectorAll('.item-tarefa').forEach(item => {
	item.addEventListener('click', e => {
		item.classList.toggle('marcado')
		tarefas[Array.prototype.indexOf.call(listaTarefas.children,item)].realizada = item.classList.contains('marcado')
		console.log(tarefas[0])
	});
})
