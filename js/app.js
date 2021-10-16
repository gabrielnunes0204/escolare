const vm = new Vue({
  el: "#app",
  data: {
    valorTotal: 0,
    carrinho: 0,
    cursos: [],
  },
  methods: {
    fetchCursos() {
      const url = './api/dados.json';
      fetch(url).then((response) => {
        response.json().then((body) => {
          this.cursos = body;
        })
      })
    },
    scrollSuave(event) {
      const href = event.currentTarget.getAttribute('href');
      const section = document.querySelector(href);

      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    },
    mandarMensagem() {
      const input = document.querySelector('#inputNoticias');

      if (input.value === '' || input.value === 0 || !input.value.includes("@")) {
        alert('Preencha o campo corretamente');
      } else {
        alert('Fique de olho no seu e-mail, entraremos em contato.');
        input.value = '';
      }
    },
    adicionarCurso(event) {
      const valorCurso = +event.currentTarget.parentNode.children[3].children[0].innerHTML;
      this.valorTotal += Math.floor(valorCurso);
      this.carrinho++;
    },
    finalizarCompra() {
      if (this.carrinho === 0) {
        alert('Sem produtos no carrinho, não é possível finalizar a compra.');
      } else {
        alert('Compra efetuada com sucesso.');
        this.valorTotal = 0;
        this.carrinho = 0;
      }
    }
  },
  filters: {
    numeroPreco(valor) {
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
  created() {
    this.fetchCursos();
  }
});