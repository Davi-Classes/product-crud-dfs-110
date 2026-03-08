// View - Responsável por Renderizar os elementos na Interface
import { criarIcone } from "./utils/icons.js";

export const produtoForm = document.getElementById("produto-form");

export function mostrarMensagem(text, type) {
  Toastify({
    text: text,
    duration: 3000,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hoverck
    style: {
      background: type === "success" ? "green" : "red",
    },
  }).showToast();
}

export function adicionarProdutoTabela(produto, onExcluirProduto) {
  const produtosTable = document.getElementById("produtos-table");
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

  const actionsCell = document.createElement("td");

  const deleteButton = document.createElement("button");

  deleteButton.addEventListener("click", () => {
    const excluir = confirm(
      `Tem certeza que deseja excluir o produto ${produto.nome}?`,
    );

    if (excluir) {
      onExcluirProduto(produto.id);
      tableRow.remove();
      mostrarMensagem("Produto excluído com sucesso.", "success");
    }
  });

  deleteButton.classList.add("delete-button");
  actionsCell.appendChild(deleteButton);

  const trashIcon = criarIcone("trash-outline");
  deleteButton.appendChild(trashIcon);

  tableRow.appendChild(actionsCell);
}
