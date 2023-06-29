// Captura o formulário pelo seu ID
var form = document.getElementById("formulario");

// Adiciona um evento de "submit" ao formulário
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Previne o comportamento padrão do formulário

  // Obtém os valores dos campos do formulário
  var nome = document.getElementById("nome").value;
  var email = document.getElementById("email").value;
  var numero = document.getElementById("numero").value;

  // Armazena os valores no Local Storage
  localStorage.setItem("nome", nome);
  localStorage.setItem("email", email);
  localStorage.setItem("numero", numero);

  // Limpa os campos do formulário
  form.reset();

  window.alert("Mensagem enviada com sucesso!")
});