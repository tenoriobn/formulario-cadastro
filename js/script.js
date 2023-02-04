async function buscaEndereco(cep) {
    mensagemErro = document.getElementById("erro");
    mensagemErro.innerHTML = "";

    try {
        let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        let consultaCEPConvertida = await consultaCEP.json();

        if (consultaCEPConvertida.erro) {
            throw Error("CEP não existente!");
        }

        let bairro = document.getElementById("bairro");
        let cidade = document.getElementById("cidade");
        let complemento = document.getElementById("complemento")
        let estado = document.getElementById("estado");
        let logradouro = document.getElementById("endereco");

        bairro.value = consultaCEPConvertida.bairro;
        cidade.value = consultaCEPConvertida.localidade;
        complemento.value = consultaCEPConvertida.complemento;
        estado.value = consultaCEPConvertida.uf;
        logradouro.value = consultaCEPConvertida.logradouro;


        console.log(consultaCEPConvertida)

        return consultaCEPConvertida;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente</p>`
        console.log(erro);
    }
}

let cep = document.getElementById("cep");
cep.addEventListener("focusout", () => buscaEndereco(cep.value));