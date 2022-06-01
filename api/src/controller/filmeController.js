import { Router } from "express"



import { alterarImagem, inserirFilme } from '../repository/filmeRepository.js'
import multer from 'multer'
const server = Router();
const upload = multer({ dest: 'storage/capasFilmes' })

server.post('/filme', async (req, resp) => {
    try {
     const novoFilme = req.body;

    if(!novoFilme.nome)
        throw new Error('NOME DO FILME É OBRIGATORIO');
    if(!novoFilme.sinopse)
        throw new Error('SINOPSE DO FILME É OBRIGATORIO');
    if(novoFilme.avaliacao < 0  || undefined)
        throw new Error('AVALIAÇÃO DO FILME É OBRIGATORIO');
    if(!novoFilme.lancamento)
        throw new Error('LANÇAMENTO DO FILME É OBRIGATORIO');
    if(!novoFilme.disponivel)
        throw new Error('DISPONIBILIDADE DO FILME É OBRIGATORIO');
    if(!novoFilme.usuario)
        throw new Error('USUARIO NÃO LOGADO');
        const filmeinserido = await inserirFilme(novoFilme);

        resp.send(filmeinserido);
    } catch (err) {
        resp.status(404).send({
            err: err.message
        })
    }
})


server.put('/filme/:id/imagem', upload.single('capa') , async(req , resp) => {

    try {
        const { id } = req.params; 
        const imagem = req.file.path;
        
        const resposta = await alterarImagem(imagem, id);
        if (resposta !=  1)
            throw new Error('A Imagem não Pode ser Salva.')
        resp.status(204).send();

    } catch(err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


export default server;