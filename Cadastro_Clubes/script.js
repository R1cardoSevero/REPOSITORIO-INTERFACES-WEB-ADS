lista_estados = document.getElementById("estado");
lista_cidades = document.getElementById("cidade");

body = document.getElementsByTagName("body")[0];

$(document).ready(function() {
  const $listaEstados = $("#estado");

  // Carregar estados ao iniciar
  $.ajax({
      url: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      method: 'GET',
      success: function(estados) {
          estados.forEach(estado => {
              $listaEstados.append(`<option value="${estado.sigla}">${estado.nome}</option>`);
          });
      },
      error: function() {
          alert("Erro ao carregar estados");
      }
  });

});


function carregarCidades(){
    console.log("teste")
}

async function carregarCidades(sigla) {
    try {
        lista_cidades.innerHTML = "";
        lista_cidades.disabled = false
        const resposta = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${sigla}/municipios`);
        const cidades = await resposta.json();
        console.log(cidades); 
        for (let cidade of cidades) {
            const option = document.createElement("option");
            option.value = cidade.id;
            option.text = cidade.nome;
            lista_cidades.appendChild(option);
        }
    } catch(erro){
      console.error('Erro ao buscar estados:', erro);
    }
}

document.getElementById("form-clube").addEventListener("submit", function(e){
    e.preventDefault();

    try{

      //Capturando o valor da sigla
      const sigla = document.getElementById("sigla").value;
      // Verificando se a silga tem entre 3 a 5 letras
      if(!(sigla.length >= 3 || sigla.length <= 5)){
          throw new Error("A sigla do clube deve ter entre 3 a 5 letras.");
      }

      //Verificando se a sigla tem apenas letras de A à Z
      if(!/^[A-Za-z]+$/.test(sigla)){
          throw new Error("A sigla do clube deve conter apenas letras de A à Z.");
      }

      //Testando se a data do input é maior que a data limite
      if (new Date(document.getElementById('data-fundacao').value) < new Date('1890-01-01')) {
        throw new Error('A data deve ser maior que 1 de Janeiro de 1890.');
      }

      

    }catch(erro){
      alert(erro.message);
    }
    
});

