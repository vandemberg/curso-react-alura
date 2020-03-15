import M from 'materialize-css';

export default {
  exibeMensagem: (status, msg) => {
    
    if(status === 'success') {
      M.toast({ html: msg, classes: 'green', displayLength: 2000 });
    }

    if(status === 'error') {
      M.toast({ html: msg, classes: 'red', displayLength: 2000 });
    }

  }
}