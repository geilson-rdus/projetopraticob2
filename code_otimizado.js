function geraAleatorios(quantidade){

var vetorNumeros = []; /* Vetor que receberá todos os 60 números */
var vetorNumSel = []; /* Vetor que receberá os números selecionados */

/* Loop para prencher o vetorNumeros*/
for(var j = 1; j <= 60; j++){
    vetorNumeros.push(j)
}

/* Loop para prencher o vetorNumSel */
for(var i = 0; i < quantidade; i++){
    var aleatorio = Math.floor(Math.random()*vetorNumeros.length) /* A variavel aleatorio recebe o número gerado pela função Math.floor(Math.random()*vetorNumeros.length) */
    var numSel = vetorNumeros.splice(aleatorio,1) /* Aqui a funçao splice retira o número aletório de vetorNumeros, e insere na váriavel numSel */
    vetorNumSel = [...vetorNumSel, ...numSel] /* Aqui ocorre uma concatenação para que haja a inserção dos valores no vetor do números selecionados */
}

console.log(vetorNumSel) 
}

function main(quantidade){
  console.time("timer");
  geraAleatorios(quantidade);
  console.timeEnd("timer");
}
