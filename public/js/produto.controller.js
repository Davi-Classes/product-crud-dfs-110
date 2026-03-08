// Controller - Responsável por Integrar a Interface e os Dados
import {
  produtoForm,
  mostrarMensagem,
  adicionarProdutoTabela,
} from "./produto.view.js";
import { buscarProdutos, salvarProduto } from "./produto.model.js";

produtoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const produto = {
    nome: produtoForm.nome.value.trim(),
    preco: produtoForm.preco.value.trim(),
    categoria: produtoForm.categoria.value,
  };

  if (produto.nome === "") {
    mostrarMensagem("O campo nome é obrigatório.", "error");
    return;
  }

  if (produto.preco === "") {
    mostrarMensagem("O campo preço é obrigatório.", "error");
    return;
  }

  produto.preco = Number(produto.preco);

  if (produto.preco <= 0) {
    mostrarMensagem("O preço deve ser maior que zero.", "error");
    return;
  }

  produto.categoria = produto.categoria === "" ? null : produto.categoria;

  salvarProduto(produto);
  adicionarProdutoTabela(produto);

  mostrarMensagem("Produto cadastrado com sucesso.", "success");
  produtoForm.reset();
});

document.addEventListener("DOMContentLoaded", () => {
  const produtos = buscarProdutos();
  produtos.forEach(adicionarProdutoTabela);

  // produtos.forEach((produto) => adicionarProdutoTabela(produto));
});
