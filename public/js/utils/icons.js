export function criarIcone(name, size = "small") {
  const icon = document.createElement("ion-icon");
  icon.name = name;
  icon.size = size;
  return icon;
}
