const cursos = [
    {
        curso: "HTML e CSS",
        descricao: "Aprenda HTML e CSS!",
        duracao: "1 mês",
        valor: 500
    },
    {
        curso: "JavaScript",
        descricao: "Aprenda JS",
        duracao: "2 meses",
        valor: 900
    },
    {
        curso: "APIsRest",
        descricao: "Aprenda APIsRest",
        duracao: "6 meses",
        valor: 2000
    }
]

const turmas = [
    {
        turma: "Hipatia",
        curso: "JavaScript",
        inicio: "30/11/2022",
        termino: "30/01/2023",
        numAlunos: 150,
        periodo: "Noturno",
        concluida: false
    },
    {
        turma: "Sibyla",
        curso: "Javascript",
        inicio: "30/10/2022",
        termino: "30/12/2022",
        numAlunos: 200,
        periodo: "Integral",
        concluida: false
    },
    {
        turma: "Curie",
        curso: "HTML e CSS",
        inicio: "15/09/2022",
        termino: "15/10/2022",
        numAlunos: 180,
        periodo: "Noturno",
        concluida: true
    },
    {
        turma: "Zhenyi",
        curso: "HTML e CSS",
        inicio: "01/11/2022",
        termino: "01/01/2023",
        numAlunos: 80,
        periodo: "Integral",
        concluida: false
    },
    {
        turma: "Clarke",
        curso: "HTML e CSS",
        inicio: "04/07/2022",
        termino: "04/09/2022",
        numAlunos: 200,
        periodo: "Noturno",
        concluida: true
    },
    {
        turma: "Blackwell",
        curso: "APIsRest",
        inicio: "20/03/2022",
        termino: "20/06/2022",
        numAlunos: 100,
        periodo: "Integral",
        concluida: true
    },
    {
        turma: "Elion",
        curso: "APIsRest",
        inicio: "12/01/2022",
        termino: "12/06/2022",
        numAlunos: 200,
        periodo: "Noturno",
        concluida: true
    },
    {
        turma: "Burnell",
        curso: "APIsRest",
        inicio: "18/10/2022",
        termino: "18/04/2023",
        numAlunos: 90,
        periodo: "Integral",
        concluida: false
    }
]

const estudantes = [
    {
        estudante: "Chris Evans",
        turma: "Hipátia",
        curso: "JavaScript",
        valor: "900",
        nParcelas: 9,
        desconto: false,
        parcelas: 100
    },
    {
        estudante: "Halle Berry",
        turma: "Burnell",
        curso: "APIsRest",
        valor: "2000",
        nParcelas: 4,
        desconto: false,
        parcelas: 500
    },
    {
        estudante: "Lashana Lynch",
        turma: "Zhenyi",
        curso: "HTML e CSS",
        valor: "500",
        nParcelas: 0,
        desconto: true,
        parcelas: 0
    }
]

/*****************************************************************************
Funções Buscar
******************************************************************************/

//******************Buscar Curso******************************************
const buscarCurso = (nomeCurso) => {
    let resultado
    resultado = cursos.find(el => el.curso.toLowerCase().includes(nomeCurso.toLowerCase()))
    if(resultado === undefined ){
        return "Curso não encontrado"
    }
    return resultado   
}

//*******************Buscar Turma*****************************************
const buscarTurma = () => {
    let nomeTurma = document.getElementById("find").value
    const containerTurmas = document.getElementById("container-turmas")
    resultado = turmas.filter(el => el.turma.toLocaleLowerCase().includes(nomeTurma.toLocaleLowerCase()))
    if(resultado.length === 0){
        containerTurmas.innerHTML = "Turma não encontrada!"
        document.getElementById('find').value=''
        return 0
    }
    gerarCard(resultado)
}

const gerarCard = (nomeTurma) => {
    const containerTurmas = document.getElementById("container-turmas")
    console.log(containerTurmas)
    const turmaCard = nomeTurma.map((turma)=>
        `<div id="turma">
            <h1>${turma.turma}</h1>
            <p>Curso: ${turma.curso}</p>
            <p>Início: ${turma.inicio}</p>
            <p>Término: ${turma.termino}</p>
            <p>Número de Alunos: ${turma.numAlunos}</p>
            <p>Período: ${turma.periodo}</p>
            <p>Concluída: ${turma.concluida}</p>

        </div>`
    )
    containerTurmas.innerHTML = turmaCard.join("")
    document.getElementById('find').value=''
  }
//********************Buscar estudante***********************
const buscarEstudante = () => {
    const nomeEstudante = document.getElementById("nome-relatorio").value
    const mostrarRelatorio = document.getElementById("container-relatorio")
    let resultado = estudantes.filter(el => el.estudante.toLocaleLowerCase().includes(nomeEstudante.toLocaleLowerCase()))
    if(resultado.length === 0){
        mostrarRelatorio.innerHTML = "Aluno não encontrado!"
        document.getElementById('nome-relatorio').value=''
        return 0
    }
    
    mostrarRelatorio.innerHTML = 
    `<p>Aluno: ${resultado[0].estudante}</p>
    <p>Turma: ${resultado[0].turma}</p>
    <p>Curso: ${resultado[0].curso}</p>
    <p>Valor: ${resultado[0].valor}</p>
    <p>Nº de parcelas: ${resultado[0].nParcelas}</p>
    <p>Valor parcela: ${resultado[0].parcelas}</p>
    `
    document.getElementById('nome-relatorio').value=''
}

/*********Função que incrementa o array carrinhoCursos***********************/
let carrinhoCursos = []
const incrementaCarrinhoCursos = () => {
    const nomeCurso = document.getElementById("curso-finan").value
     //chama a função buscarCurso e guarda em procura
    let procura = buscarCurso(nomeCurso)
    //adiciona ao array carrinhoCursos o valor
    carrinhoCursos.push(procura.valor)
  console.log(carrinhoCursos)
    parcelarCurso(carrinhoCursos)
}
 
/******************************************************************************
Função Parcelar Curso
******************************************************************************/
const parcelarCurso = (carrinhoCursos) => {
    const nParc = document.getElementById("n-parc").value
    const containerValor = document.getElementById("container-valor")
    console.log(carrinhoCursos)
    console.log(nParc)
    let valorFinal = 0
    let valorParcela = 0
    let desconto = 0
    let soma = 0
    //verifica quantos cursos foram comprados e atribui o desconto
    switch(carrinhoCursos.length){
        case 3:
            desconto = 0.15
        break;
        case 2:
            desconto = 0.10
        break;
        case 1:
            desconto = 0
    }
    //verifica se é a vista ou parcelado e dá os descontos
    if(nParc <= 2){
        desconto = desconto + 0.2
    } 
    
    //faz a soma do conteuro de carrinhoCursos,dá os descontos e calcula o valor da parcela
    for(let i in carrinhoCursos){
        soma += carrinhoCursos[i]
        valorFinal = soma - (soma*desconto)
        valorParcela = valorFinal/nParc
    }
    containerValor.innerHTML = `O valor do pagamento é de ${valorFinal} com ${desconto*100}% de desconto parcelado em ${nParc} de ${valorParcela}`
    document.getElementById("n-parc").value = ""
    document.getElementById("curso-finan").value = ""

} 

/****************************************************************************
Funcão Matricular
*****************************************************************************/
const matricular = () =>{
    const form = document.getElementById("formulario-mat")
    const nomeNovo = document.getElementById("name-mat").value
    const cursoNovo = document.getElementById("curso-mat").value
    const turmaNova = document.getElementById("turma-mat").value
    const nParcelasN = document.getElementById("num-parc").value
    const mostrarRelatorio = document.getElementById("container-aluno")
    
    form.addEventListener("submit", (event)=> {
        event.preventDefault();
    })
    
      
    //usa a função buscarCurso para receber o valor do curso
    let valorCurso = buscarCurso(cursoNovo)
    valorCurso = valorCurso.valor
    let valorTotal = 0
    let valorParc = 0
    let desconto = false 
    //verifica se tem desconto e aplica
     if(nParcelasN > 0 && nParcelasN <= 2){
        valorTotal = valorCurso*0.8
        valorParc = valorTotal/nParcelasN
        desconto = true 
    }else{
        valorTotal = valorCurso
        valorParc = valorTotal/nParcelasN
    }

    const newEstudante = {
        estudante: nomeNovo,
        turma: turmaNova,
        curso: cursoNovo,
        valor: valorCurso,
        nParcelas: nParcelasN,
        desconto:desconto,
        valorParcela: valorParc
    }
    estudantes.push(newEstudante)
    mostrarRelatorio.innerHTML = 
    `<p>Aluno Matriculado!</p>
    <p>Aluno: ${nomeNovo}</p>
    <p>Turma: ${turmaNova}</p>
    <p>Curso: ${cursoNovo}</p>`
    
    document.getElementById('name-mat').value=''
    document.getElementById('curso-mat').value=''
    document.getElementById('turma-mat').value=''
    document.getElementById('num-parc').value=''
    console.log(estudantes)
}

/************************************************************************
Contato
*************************************************************************/
const contato = () =>{
    containerContato = document.getElementById('mensagem-contato')
    containerContato.innerHTML = "Mensagem recebida! Logo entraremos em contato!"

}