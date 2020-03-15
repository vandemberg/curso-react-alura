import React, { Fragment, useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import './index.css';

import PopUp from '../../Components/PopUp';
import Header from '../../Components/Header';
import Tabela from '../../Components/Tabela';

import Form from '../../Components/Formulario/Form';
import ApiService from '../../utils/ApiService';

export default () => {
  const [autores, setAutores] = useState([]);

  const removeAutor = id => {
    const autoresAtualizado = autores.filter(autor => {
      return autor.id !== id
    });

    ApiService.RemoveAutor(id)
      .then(res => {
        if(res.message === 'deleted') {
          setAutores([...autoresAtualizado]);
          PopUp.exibeMensagem('error', 'Autor removido com sucesso');
        }
      })
      .catch(err => {
        console.log(err);
        PopUp.exibeMensagem(
          'error',
          'Erro na comunicação com a API ao tentar remover o autor'
        )
      })
  }

  const escutadorDeSubmit = ({ nome, livro, preco }) => {
    const autor = { nome, livro, preco };

    ApiService.CriaAutor(JSON.stringify(autor))
      .then(res => {
        if (res.message === 'success') {
          setAutores([...autores, res.data]);
          PopUp.exibeMensagem(
            'success',
            'Autor adicionado com sucesso'
          )
        }
      }).catch(err => {
        PopUp.exibeMensagem(
          'error',
          'Erro na comunicação com a API ao tentar criar o autor'
        )
      })
  }

  useEffect(() => {
    ApiService.ListaAutores()
      .then(res => {
        setAutores(res.data)
      })
  }, [])

  const campos = [
    { titulo: 'Autores', dado: 'nome' },
    { titulo: 'Livros', dado: 'livro' },
    { titulo: 'Preços', dado: 'preco'},
  ];

  return (
    <Fragment>
      <Header />
      <div className='container mb-10'>
        <h1> Casa do Código </h1>
        <Form escutadorDeSubmit={escutadorDeSubmit} />
        <Tabela
          campos={campos}
          dados={autores}
          removeDados={removeAutor}
          />
      </div>
    </Fragment>
  );
}
