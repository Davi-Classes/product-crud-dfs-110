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

  produto.id = crypto.randomUUID();
  produtos.push(produto);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
}

export function excluirProduto(id) {
  const produtos = buscarProdutos();
  const novosProdutos = produtos.filter((produto) => produto.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(novosProdutos));
}
