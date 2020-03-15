import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import FormValidator from '../../utils/FormValidator';
import Toast from '../Toast';

const validador = new FormValidator([
  {
    campo: 'nome',
    metodo: 'isEmpty',
    validoQuando: false,
    mensagem: 'Entre com um nome'
  },
  {
    campo: 'livro',
    metodo: 'isEmpty',
    validoQuando: false,
    mensagem: 'Entre com um livro'
  },
  {
    campo: 'preco',
    metodo: 'isInt',
    args: [{ min: 0, max: 99999 }],
    validoQuando: true,
    mensagem: 'Entre com um valor numérico'
  }
]);

export default (props) => {

  const [nome, setNome] = useState('');
  const [livro, setLivro] = useState('');
  const [preco, setPreco] = useState('');
  const [mensagem, setMensagem] = useState({
    open: false,
    texto: '',
    tipo: '',
  });

  const isValid = () => {
    setNome('');
    setLivro('');
    setPreco('');
    setMensagem({
      open: false,
      texto: '',
      tipo: '',
    })
  }

  const submitFormulario = () => {
    const valida = validador.valida({
      nome, 
      livro, 
      preco, 
      mensagem,
    });

    if (valida.isValid) {
      props.escutadorDeSubmit({ nome, livro, preco, mensagem });
      isValid();
    } else {
      const campos = [valida.nome, valida.livro, valida.preco];
      const camposInvalidos = campos.filter(element => {
        return element.isValid
      });

      const erros = camposInvalidos.reduce(
        (erros, campo) => erros + campo.mensagem + '. ',
        ''
      );

      setMensagem({
        mensagem: erros,
        tipo: 'error',
        open: true,
      });
    }
  }

  return (
    <>
      <Toast 
        open={mensagem.open}
        handleClose={() => {
          setMensagem({ ...mensagem, open: false})
        }}
        severity={mensagem.tipo}
        >
          {mensagem.mensagem}
      </Toast>
      <form>
        <Grid container spacing={2} alignItems='center'>
          <Grid item>
            <TextField
              id='nome'
              label='nome'
              variant='outlined'
              value={nome}
              onChange={(event) => setNome(event.target.value) }
            />
          </Grid>
          <Grid item>
            <TextField
              id='livro'
              label='Livro'
              name='livro'
              variant='outlined'
              value={livro}
              onChange={(event) => setLivro(event.target.value) }
            />
          </Grid>
          <Grid item>
            <TextField 
              id='preco'
              label='Preco'
              name='preco'
              variant='outlined'
              value={preco}
              onChange={(event) => setPreco(event.target.value) }
            />
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              onClick={submitFormulario}
              type='button'
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}