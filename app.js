const express = require("express")
var cors = require("cors") //ia usar no-cors pq tava mais facil mas quero testar pq o fetch n ta funcionondo
//pós teste**  meu deus, tava dando um erro genérico pq eu tava com "no-cors" já que eu não tinha instalado a principio


const { createUsuario, listUsuarios, findUsuarioById, updateUsuario, deleteUsuario } = require ("./api")

app = express()
app.use(cors())

app.use(express.json()) // dexa agente trabalhar com/receber json
app.use(express.urlencoded({extended: true})) //acredito q dê parse no json

//===========================================================
app.get("/usuarios", (req, res) =>
    {  
       listUsuarios().then((data)=>
        {
            res.send(data)
        })
    })

app.post("/usuarios", (req, res) =>
{
    createUsuario(req.body["nome"], req.body["email"], req.body["senha"])
    console.log("usuario gerado")
    res.sendStatus(200)
})

app.put("/usuarios/:id/:nome/:email/:senha", (req, res) =>
{
    parametro = req.params
    console.log("Usuario editado, ", parametro.id, parametro.nome, parametro.email, parametro.senha)
    updateUsuario(parametro.id, parametro.nome, parametro.email, parametro.senha)
    res.send("Usuario Alterado com sucesso")
})

app.delete("/usuarios/:id", (req,res) =>
{
    parametro = req.params // parametro eh o que se passa junto na url depois dos ' : '
    id = parametro.id

    deleteUsuario(id)
    console.log("Usuario removido, id:",id)
    res.send("Usuario Removido com sucesso")
})
//===========================================================

app.listen(3000, ()=>
{
    console.log("Server Running")
})