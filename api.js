const pg = require("pg")

const { Client } = pg
// const client = new Client({
//     user: "postgres",
//     password: "postgres",
//     host: "localhost",
//     port: "5432",
//     database: "desafiosamuka"
// })

// Um mesmo cliente não pode ser reusado, então tem que redeclarar ele toda vez

async function createUsuario(nome, email, senha)
{
    const client = new Client({
        user: "postgres",
        password: "postgres",
        host: "localhost",
        port: "5432",
        database: "desafiosamuka"
    })

    try
    {
        await client.connect()
        const query = 'INSERT INTO usuarios (nome, email, senha) VALUES($1, $2, $3) RETURNING *'
        const values = [nome, email, senha]

        const resposta = await client.query(query, values)
        console.log(resposta.rows[0])
    }catch(err)
    {
        console.error(err)
    }
    finally
    {
        await client.end()
    }
    
}

async function listUsuarios()
{
    let r

    let novoCliente = new Client({
        user: "postgres",
        password: "postgres",
        host: "localhost",
        port: "5432",
        database: "desafiosamuka"
    })

    try
    {
        await novoCliente.connect()
        const resposta = await novoCliente.query("SELECT * FROM usuarios")
        r = resposta.rows
        console.log(resposta.rows)
    }catch(err)
    {
        console.error(err)
    }
    finally
    {
        await novoCliente.end()
        return r
    }
}

async function findUsuarioById(id)
{
    const client = new Client({
        user: "postgres",
        password: "postgres",
        host: "localhost",
        port: "5432",
        database: "desafiosamuka"
    })

    let r
    try
    {
    }catch(err)
    {
        console.error(err)
    }
    finally
    {
        await client.end()
        return r
    }
}

async function updateUsuario(id, nome, email, senha)
{
    const client = new Client({
        user: "postgres",
        password: "postgres",
        host: "localhost",
        port: "5432",
        database: "desafiosamuka"
    })
    try
    {
        await client.connect()
        const query = "UPDATE usuarios SET nome=$1, email=$2, senha=$3 WHERE id = $4"
        const values = [nome, email, senha, id]
        const resposta = await client.query(query, values)
        console.log(resposta.rows[0], " alterado com sucesso!")
    }catch(err)
    {
        console.error(err)
    }
    finally
    {
        await client.end()
    }
}

async function deleteUsuario(id)
{
    const client = new Client({
        user: "postgres",
        password: "postgres",
        host: "localhost",
        port: "5432",
        database: "desafiosamuka"
    })
    try
    {
        await client.connect()
        const request = "Delete FROM usuarios WHERE id = $1"
        const values = [id] // a sintaxe pede q seja um array, o plural eh pra manter um padrão
        const resposta = await client.query(request, values)
        console.log("removido com sucesso!")
    }catch(err)
    {
        console.error(err)
    }
    finally
    {
        await client.end()
    }
}

//createUsuario("Grandao", "Fa@mail", "senhor")
//const teste = listUsuario()
//findUsuarioById(4)
//updateUsuario("Dudu", "carlos@mail", "senaha", "5")
//deleteUsuario(7)


module.exports = { createUsuario, listUsuarios, findUsuarioById, updateUsuario, deleteUsuario }