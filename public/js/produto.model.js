// Model - Responsável por lidar com os Dados da aplicação
const STORAGE_KEY = "produtos:storage";

export function buscarProdutos() {
  if (localStorage.getItem(STORAGE_KEY) == null) {
    return [];
  }

  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

export function salvarProduto(produto) {
  const produtos = buscarProdutos();
  produtos.push(produto);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
}
