import React, { Fragment, useState, useEffect } from 'react';
import Header from '../../Components/Header';
import Tabela from '../../Components/Tabela';
import ApiService from '../../utils/ApiService';
import PopUp from './../../Components/PopUp';

export default () => {

  const campos = [{ titulo: 'Autores', dado: 'nome' }];
  const [nomes, setNomes] = useState([]);

  useEffect(() => {
    ApiService.ListaNomes()
      .then(res => {
        if(res.message === 'success') {
          PopUp.exibeMensagem(
            'success',
            'Autores Listados com sucesso'
          );
          setNomes([...nomes, ...res.data]);
        }
      })
      .catch(err =>
        PopUp.exibeMensagem(
          'error',
          'Falha na comunicação com a API ao listar os autores'
        )
      )
  }, []);

  return (
    <Fragment>
      <Header />
      <div className='container'>
        <h1> Página de Autores</h1>
        <Tabela dados={nomes} campos={campos} />
      </div>
    </Fragment>
  )
}