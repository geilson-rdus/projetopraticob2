# Trabalho Prático B2

#Esse arquivo README.md e o código em JavaSript foram desenvolvidos por Geilson Lucas

O trabalho prático do segundo bimestre tem como temática a otimização de um código que gera números aleatórios.

O código em questão, desenvolvido em sala de aula era o seguinte:

```
function gerarAleatorios(){
  var vetor = [];
  var geracoes = [];

  while(vetor.length < 6){
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

function main(){
  console.time("timer");
  gerarAleatorios();
  console.timeEnd("timer");
}

```
