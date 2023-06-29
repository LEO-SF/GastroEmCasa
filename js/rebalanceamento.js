function rebalancearReceita() {
    var receita = {};
  
    // Seleção dos ingredientes do HTML
    var ingredientes = document.querySelectorAll('#lista-receita li');
    //percorre a lista selecionando cada elemento do html
    for (var i = 0; i < ingredientes.length; i++) {
      var ingrediente = ingredientes[i].querySelector('.ingrediente').textContent.trim();
      var quantidade = ingredientes[i].querySelector('.quantidade').textContent.trim();
      var unidades = ingredientes[i].querySelector('.unidades').textContent.trim();
    //obtém os valores selecionando para as operações posteriores
      receita[ingrediente] = {
        quantidade: quantidade,
        unidades: unidades
      };
    }
    
    //Aqui seleciona o ingrediente a partir do qual será feito o rebalanceamento
    var ingredienteBase = document.getElementById('ingrediente-base').value;
    //Aqui seleciona a quantidade a partir do qual será feito o rebalaceamento a partir de um não inteiro
    var quantidadeBase = parseFloat(document.getElementById('quantidade-base').value);
  
    //Verifica se é existente o ingrediente na receita, do contrário dará erro ou inconsistência
    if (ingredienteBase in receita) {
      //Fator de rebalanceamento por razão e proporção
      var fatorRebalanceamento = quantidadeBase / parseFloat(receita[ingredienteBase].quantidade);
      //Nova geração da lista de receitas
      var novaReceita = {};
      //Loop para montagem da nova lista
      for (var ingrediente in receita) {
        var quantidadeOriginal = parseFloat(receita[ingrediente].quantidade);
        var unidades = receita[ingrediente].unidades;
        //gerado os valores pelo fator de razão e proporção com duas casas decimais (toFixed)
        var quantidadeRebalanceada = (quantidadeOriginal * fatorRebalanceamento).toFixed(2);
        //Montagem da receita balanceada
        novaReceita[ingrediente] = ': ' + quantidadeRebalanceada + ' ' + unidades;
      }
  
      //Exibe a nova lista a partir da substituição
      var resultado = document.getElementById('resultado');
      resultado.innerHTML = '<h2>Resultado</h2>';
      //Loop para exibição da lista e validação se o ingrediente base está realmente na receita
      //do contrário teremos um ingrediente inválido
      //Se não existisse o IF, poderíamos ter undefined ou o código se executaria mesmo sem o ingrediente base
      for (var ingrediente in novaReceita) {
        //gera a lista para o conteúdo html
        var listItem = document.createElement('li');
        listItem.innerHTML = '<span class="ingrediente">' + ingrediente + '</span>' +
          '<span class="quantidade">' + novaReceita[ingrediente] + '</span>';
        resultado.appendChild(listItem);
      }
    } else {
      var resultado = document.getElementById('resultado');
      resultado.innerHTML = 'Ingrediente inválido.';
    }
  }
  
  //Analisa os ingredientes no HTML e os guarda para exibí-los dinamicamente através do JS
  //para ser selecionado como opção para fator de rebalanceamento
  window.addEventListener('DOMContentLoaded', function() {
    //captura os elementos através do getElementById
    var listaReceita = document.getElementById('lista-receita');
    var ingredientesBase = document.getElementById('ingrediente-base');
    //faz o loop para obter os trechos de texto contidos neles
    var ingredientes = listaReceita.querySelectorAll('li');
    for (var i = 0; i < ingredientes.length; i++) {
      var ingrediente = ingredientes[i].querySelector('.ingrediente').textContent.trim();
      var quantidade = ingredientes[i].querySelector('.quantidade').textContent.trim();
      var unidades = ingredientes[i].querySelector('.unidades').textContent.trim();
  
      // Preenche as opções de ingredientes base
      var ingredienteOption = document.createElement('option');
      ingredienteOption.value = ingrediente;
      ingredienteOption.text = ingrediente;
      ingredientesBase.appendChild(ingredienteOption);
    }
  });