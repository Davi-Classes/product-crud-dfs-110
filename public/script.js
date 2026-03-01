let produtos = [];
const STORAGE_KEY = "produtos:storage";

const pMensagem = document.getElementById("mensagem");
const produtoForm = document.getElementById("produto-form");
const produtosTable = document.getElementById("produtos-table");

function buscarProdutos() {
  if (localStorage.getItem(STORAGE_KEY) == null) {
    return [];
  }

  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

function mostrarMensagem(text, type) {
  pMensagem.innerText = text;

  pMensagem.style.fontWeight = "bold";
  pMensagem.style.color = type == "success" ? "green" : "red";
}

function adicionarProdutoTabela(produto) {
  const tableData = produtosTable.querySelector("tbody");

  const tableRow = document.createElement("tr");
  tableData.appendChild(tableRow);

  const nameCell = document.createElement("td");
  nameCell.innerText = produto.nome;
  tableRow.appendChild(nameCell);

  const priceCell = document.createElement("td");
  priceCell.innerText = produto.preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  tableRow.appendChild(priceCell);

  const categoryCell = document.createElement("td");
  categoryCell.innerText = produto.categoria;
  tableRow.appendChild(categoryCell);
}

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

  produtos.push(produto);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));

  adicionarProdutoTabela(produto);
  mostrarMensagem("Produto cadastrado com sucesso.", "success");

  produtoForm.reset();
});

document.addEventListener("DOMContentLoaded", () => {
  produtos = buscarProdutos();
  produtos.forEach(adicionarProdutoTabela);

  // produtos.forEach((produto) => adicionarProdutoTabela(produto));
});
