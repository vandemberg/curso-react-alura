import React, { useState, useEffect, Fragment } from 'react';
import Header from '../../Components/Header';
import Tabela from '../../Components/Tabela';
import ApiService from '../../utils/ApiService';
import PopUp from '../../Components/PopUp';

export default () => {

  const [livros, setLivros] = useState([]);
  const campos = [
    {
      titulo: 'livros',
      dado: 'livro'
    }
  ]

  useEffect(() => {
    ApiService.ListaLivros()
      .then(res => {
        if(res.message === 'success') {
          PopUp.exibeMensagem(
            'success',
            'Livros listados com sucesso'
          );
          setLivros([...livros, ...res.data]);
        }
      })
      .catch(err =>
        PopUp.exibeMensagem(
          'error',
          'Falha na comunicação com a API ao listar os livros'
        ))
  }, []);

  return (
    <Fragment>
      <Header />
      <div className='container'>
        <h1> Página de Livros</h1>
        <Tabela dados={livros} campos={campos} />
      </div>
    </Fragment>
  );
}