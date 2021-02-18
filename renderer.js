// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const ipcRenderer = require('electron').ipcRenderer;

document.querySelector('#form-cadastro-pessoa').onsubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const nome = formData.get('nome')
    const idade = +formData.get('idade')

    console.debug({nome, idade})
    const mainRes = ipcRenderer.sendSync('submit-form-cadastro-pessoa', { nome, idade })
    console.debug(mainRes)
    loadPessoas()
}

function loadPessoas() {
    const mainRes = ipcRenderer.sendSync('get-pessoas-cadastradas', null)
    console.debug(mainRes)
    const ulDOM = document.querySelector('#ul-pessoas-cadastradas')
    ulDOM.textContent = '';
    
    for (const pessoa of mainRes.data.pessoas) {
        const li = document.createElement('li')
        li.innerText = JSON.stringify(pessoa)
        ulDOM.appendChild(li)
    }
}

loadPessoas();