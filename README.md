# Projeto Prático B2

Esse arquivo README.md foi escrito por Geilson Lucas

O trabalho prático do segundo bimestre tem como temática a otimização de um código que gera números aleatórios.

O código em questão, desenvolvido em sala de aula, era o seguinte:

```
function gerarAleatorios(quantidade){
  var vetor = [];
  var geracoes = [];

  while(vetor.length < quantidade){
    var aleatorio = Math.floor(Math.random()*60 + 1);
    geracoes.push(aleatorio);
    if(vetor.includes(aleatorio)){
      continue;
    }else{
      vetor.push(aleatorio);
    }
  }

  console.log("Gerações: ", geracoes);
  console.log("Finais: ", vetor);
}

function main(quantidade){
  console.time("timer");
  gerarAleatorios(quantidade);
  console.timeEnd("timer");
}

```

No código anterior, para gerar os números aleatórios foi desenvolvido um loop que fazia checagem se o número era repetido ou não. O que no caso de se gerar 6 números em 60 possíveis, quase nunca passa da quantidade mínima de repetições que é 6, muito raramente ele acaba sorteando um número igual e exigindo que o loop rode uma vez a mais, mas nada que comprometa a quantidade de recursos computacionais necessários.

O problema ocorre se o usuário quiser mais de 6 números, se no caso ele quisesse 50 números sem repetição? Bom, como demonstrado no próprio enunciado do trabalho disponível no portal do aluno, para gerar 50 números não repetidos, foi necessário passar pelo loop 85 vezes, consumindo recursos computacionais de forma desnecessária. Então, para otimizar o código, foram realizadas algumas pesquisas para encontrar uma solução que fosse menos custosa em termos computacionais.

Antes de tudo, o código acima foi testado dez vezes no console do Google Chrome, apresentando os seguintes valores de tempo de execução:
* 0.945068359375 ms
* 0.85009765625 ms
* 0.885009765625 ms
* 0.830078125 ms
* 0.701904296875 ms
* 0.8251953125 ms
* 0.788818359375 ms
* 0.85498046875 ms
* 0.80908203125 ms

A partir dos testes foi possível calcular o tempo médio e o desvio padrão:
*Tempo médio: aproximadamente 0.832 ms
*Desvio padrão: aproximadamente 0.063 ms

A resposta encontrada para a otimização do código foi a seguinte:

```
function geraAleatorios(quantidade){

var vetorNumeros = [];
var vetorNumSel = [];

for(var j = 1; j <= 60; j++){
    vetorNumeros.push(j)
}

for(var i = 0; i < quantidade; i++){
    var aleatorio = Math.floor(Math.random()*vetorNumeros.length)
    var numSel = vetorNumeros.splice(aleatorio,1)
    vetorNumSel = [...vetorNumSel, ...numSel]
}

console.log(vetorNumSel)
}

function main(quantidade){
  console.time("timer");
  geraAleatorios(quantidade);
  console.timeEnd("timer");
}

```

No código acima, é criado um vetor que conterá todos os números e outro que receberá os escolhidos advindos do vetor anterior. Aqui o número sorteado no vetor original é retirado do primeiro, para então ser adicionado no vetor dos selecionados, naturalmente impedindo que os números se repitam, e por sua vez consuma menos recursos computacionais. Em consequência disso, a natureza de sua execução torna desnecessário a existência de um vetor de números gerados, como feito no código original, logo não existindo uma saída extra no código, e tendo em vista eu entrada e saída são das atividades mais custosas, o código final apresenta essa outra vantagem.

O código também foi testado pelo console do Google Chrome e apresentou os seguintes resultados:
* 0.52807617875 ms
* 0.376953125 ms
* 0.408935546875 ms
* 0.435791015625 ms
* 0.43994140625 ms
* 0.43896484375 ms
* 0.4169921875 ms
* 0.676025390625 ms
* 0.426025390625 ms
* 0.4541015625 ms

*Tempo médio: aproximadamente 0.460 ms
*Desvio padrão: aproximadamente 0.081 ms

Calculando a diferença percentual como:

![cálculo da diferenca percentual](https://dhg1h5j42swfq.cloudfront.net/2019/06/09133238/Captura-de-Tela-2019-06-09-%C3%A0s-12.32.28.png)

Resultando que a solução é 44,71% mais rápida que o código original.

Apesar disso, existe um possível ponto problemático na execução da solução, que é a função splice. A função em questão é responsável por retirar um valor alocado de um vetor, e também realiza o reposicionamento dos valores restantes, sendo assim, ela apresenta algumas perdas de desempenho por estar sempre tendo que rearranjar o vetor que tem um valor retirado dele.

A outra solução encontrada foi embaralhar o vetor, utilizando o método Fisher-Yates Shuffle:

```
function geraAleatorios(quantidade) {
    const vetorNumeros = Array.from({ length: 60 }, (_, i) => i + 1); // Cria o array [1, 2, ..., 60]

    // Embaralha o vetor usando Fisher-Yates Shuffle
    for (let i = vetorNumeros.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [vetorNumeros[i], vetorNumeros[j]] = [vetorNumeros[j], vetorNumeros[i]]; // Troca os elementos
    }

    // Seleciona os primeiros 'quantidade' números
    const vetorNumSel = vetorNumeros.slice(0, quantidade);

    console.log(vetorNumSel);
}

function main(quantidade) {
    console.time("timer");
    geraAleatorios(quantidade);
    console.timeEnd("timer");
}
```
E realmente, o método apresenta um leve ganho de desempenho, passando pelos mesmos testes esses foram os valores encontrados:
* 0.591064453125 ms
* 0.3818359375 ms
* 0.364990234375 ms
* 0.370849609375 ms
* 0.419921875 ms
* 0.405029296875 ms
* 0.455078125 ms
* 0.39013671875 ms
* 0.39404296875 ms
* 0.400146484375 ms

*Tempo médio: aproximadamente 0.417 ms
*Desvio padrão: aproximadamente 0.063 ms

Sendo 9,35% mais rápido do que a solução anteriormente apresentada.

Contudo, uma questão semântica me incomoda, seria o processo de embaralhar realmente uma geração de números de forma aleatória? Pode ser apontado que ambas as soluções estão no fundo realizando o mesmo processo, inclusive utilizando as mesmas funções da bibliteca Math, mas dito isso, o fato que o índice é determinado pela variável i, que é predeterminada pelo loop, me faz não conseguir ver essa solução como a ideal para o que foi exigido na questão inicial do projeto. Por isso, mantenho como minha resposta a solução que utilza a função splice como parte dela.
