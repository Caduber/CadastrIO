const corpo = document.getElementById("bodyTabela")


async function renderUsuarios()
{
    try
    {
        let resposta = await fetch("http://localhost:3000/usuarios",
        {
            method: "GET",
            //mode: "no-cors"
            //obs: NUNCA USE NO-CORS PQ ELE VAI BUGAR SUA REQUEST E NEM VAI FALAR O ERRO
        })
        if (!resposta.ok) 
        {
            throw new Error("ERRO: ", resposta)
        }

        let json = await resposta.json() //transforma json em obj
        json.forEach(row => {
            var geraLinha = `
            <tr>
                <td>${row.id}</td>
                <td>${row.nome}</td>
                <td>${row.email}</td>
                <td>${row.senha} </td>
                <td><a href="#" onclick="apagaUsuarios(${row.id})"><span class="material-symbols-outlined">close</span></a></td>
                <td><a href="#" onclick="editaUsuarios(${row.id})"><span class="material-symbols-outlined">settings</span></a></td>
            </tr>
            `
            corpo.innerHTML += geraLinha // se fosse corpo.innerHtml = o gerador, ia gerar por cima
            console.log("linha gerada")
        });
    }
    catch(err)
    {
        console.error(err)
    }
}
    

//sobrescrevo o redirect padrão com o fetch
document.getElementById("formulario").addEventListener("submit", async function (event) {
       
    event.preventDefault() //faz com q o form não redirecione a página

    const conteudoForm = new FormData(this)
    const conteudo = Object.fromEntries(conteudoForm.entries())

    console.log(conteudo)

    try
    {
        resposta = fetch("http://localhost:3000/usuarios",{
            method: "POST",
            headers: {
                "Content-Type": "application/json" //
            },
            body: JSON.stringify(conteudo
            //body no fetch serve pra mandar o conteudo pra api, ja q vc nem sempre vai usar o get
            )
        })
        alert("Usuario Inserido!")
        location.reload()
    }
    catch(err)
    {
        console.error(err)
    }

})

async function apagaUsuarios(id)
{
    try
    {
        resposta = await fetch(`http://localhost:3000/usuarios/${id}`, {
            method: "DELETE"
        })
        alert("Usuario Removido")
    }
    catch(err)
    {
        console.error("ERRO: ", err)
    }
    location.reload()
}

async function editaUsuarios(id)
{
    const nome = document.getElementById("nome").value
    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value
    
    if(nome != "" && email != "" && senha != "")
    {
        try
        {
            reposta = await fetch(`http://localhost:3000/usuarios/${id}/${nome}/${email}/${senha}`, {
                method: "PUT"
            })
            window.alert("Usuario Trocado")
            location.reload()
        }
        catch(err)
        {
            console.error("ERRO: ", err)
        }
    }
    else
    {
        alert("Insira os campos a serem alterados!")
    }
}

renderUsuarios() //Renderiza no load da pag