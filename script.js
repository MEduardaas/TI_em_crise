// DADOS DAS ETAPAS DO JOGO
const fases = [
    {
        titulo: "O sistema de vendas parou",
        descricao: "Vendedores não conseguem acessar o sistema. Investigue os registros e restaure o serviço.",
        chamados: [
            ["INC-001", "Sistema de vendas fora do ar", "Vários vendedores não conseguem trabalhar.", "CRÍTICO"],
            ["REQ-014", "Solicitação de acesso", "Uma funcionária precisa de uma conta.", "MÉDIO"],
            ["INC-002", "Lentidão no portal", "Alguns usuários relatam lentidão.", "MÉDIO"]
        ],
        pistas: [
            ["Relatório do Service Desk", "Vinte e três vendedores abriram chamados em cinco minutos."],
            ["Alerta de monitoramento", "A falha começou logo após uma alteração na configuração."],
            ["Relato do setor comercial", "A falha impede registrar novas vendas e tem alto impacto."]
        ],
        acoes: [
            {
                id: "priorizar", titulo: "Consolidar e priorizar chamados",
                descricao: "Agrupar chamados relacionados e registrar o impacto.",
                funcao: "service", pista: 0, efeito: 0,
                retorno: "Os chamados foram relacionados e o impacto foi documentado."
            },
            {
                id: "restaurar", titulo: "Restaurar a configuração anterior",
                descricao: "Aplicar uma recuperação temporária controlada.",
                funcao: "incident", pista: 1, efeito: 1,
                retorno: "Serviço restaurado. O gerenciamento de incidentes busca reduzir o impacto e recuperar a operação."
            },
            {
                id: "reiniciar", titulo: "Reiniciar tudo sem análise",
                descricao: "Ação rápida sem verificar a causa ou o alcance.",
                funcao: "incident", pista: null, efeito: -3,
                retorno: "A ação indiscriminada aumentou a instabilidade. Avalie impacto e risco antes de agir."
            }
        ],
        obrigatorias: ["priorizar", "restaurar"]
    },
    {
        titulo: "A falha se repete",
        descricao: "O serviço voltou, mas o alerta apareceu novamente. Investigue a causa provável.",
        chamados: [
            ["PRB-003", "Falha recorrente de autenticação", "A mesma falha ocorreu três vezes nesta semana.", "CRÍTICO"],
            ["INC-006", "Vendedores desconectados", "Parte dos usuários perdeu a sessão novamente.", "ALTO"],
            ["CHG-008", "Configuração provisória", "A configuração anterior foi restaurada temporariamente.", "MÉDIO"]
        ],
        pistas: [
            ["Histórico de incidentes", "As ocorrências começaram após alterações no mesmo componente."],
            ["Trecho do log", "Há erros de conexão com o banco após a renovação de credenciais."],
            ["Anotação técnica", "A solução temporária funciona, mas não corrige a causa da falha."]
        ],
        acoes: [
            {
                id: "correlacionar", titulo: "Correlacionar incidentes e logs",
                descricao: "Comparar horários e sintomas para encontrar um padrão.",
                funcao: "problem", pista: 0, efeito: 0,
                retorno: "A equipe encontrou um padrão. O gerenciamento de problemas investiga causas e reduz recorrências."
            },
            {
                id: "documentar", titulo: "Documentar causa provável",
                descricao: "Registrar evidências e a solução temporária conhecida.",
                funcao: "problem", pista: 1, efeito: 0,
                retorno: "O problema e a solução temporária foram documentados com base nas evidências."
            },
            {
                id: "alterar", titulo: "Alterar produção sem teste",
                descricao: "Modificar a configuração sem avaliar riscos.",
                funcao: "change", pista: null, efeito: -3,
                retorno: "A mudança sem teste criou risco adicional. Valide a hipótese antes de alterar produção."
            }
        ],
        obrigatorias: ["correlacionar", "documentar"]
    },
    {
        titulo: "A atualização arriscada",
        descricao: "A correção definitiva exige uma mudança. Avalie riscos, testes e plano de reversão.",
        chamados: [
            ["CHG-010", "Atualização de autenticação", "A mudança pode afetar serviços conectados.", "ALTO"],
            ["DEP-002", "Dependência do sistema de vendas", "O portal depende da autenticação.", "ALTO"],
            ["TST-004", "Ambiente de testes disponível", "É possível testar antes da implantação.", "MÉDIO"]
        ],
        pistas: [
            ["Plano de mudança", "A alteração afeta autenticação e vendas; usuários precisam ser comunicados."],
            ["Ambiente de testes", "É possível testar login, sessão e registro de vendas antes da implantação."],
            ["Plano de reversão", "A configuração atual foi guardada e pode ser restaurada se houver falha."]
        ],
        acoes: [
            {
                id: "avaliar", titulo: "Avaliar impacto e dependências",
                descricao: "Verificar serviços afetados, riscos e janela de implantação.",
                funcao: "change", pista: 0, efeito: 0,
                retorno: "Impactos e dependências avaliados. Isso ajuda a tomar uma decisão informada."
            },
            {
                id: "testar", titulo: "Testar e preparar reversão",
                descricao: "Validar cenários e confirmar o plano de retorno.",
                funcao: "change", pista: 1, efeito: 0,
                retorno: "Testes e plano de reversão preparados para controlar a mudança."
            },
            {
                id: "implantar", titulo: "Executar mudança planejada",
                descricao: "Implantar após avaliação, testes e comunicação.",
                funcao: "change", pista: 2, efeito: 1,
                retorno: "A mudança foi executada de forma controlada e o serviço foi verificado."
            }
        ],
        obrigatorias: ["avaliar", "testar", "implantar"]
    },
    {
        titulo: "Um serviço melhor",
        descricao: "A operação está estável. Defina indicadores e ações para evitar novas falhas.",
        chamados: [
            ["CSI-001", "Acompanhar recorrência", "Verificar se os incidentes diminuem.", "MÉDIO"],
            ["CSI-002", "Feedback dos usuários", "Confirmar que o sistema voltou a funcionar.", "BAIXO"],
            ["CSI-003", "Plano de melhoria", "Registrar responsáveis, prazos e indicadores.", "MÉDIO"]
        ],
        pistas: [
            ["Indicador de incidentes", "Compare a quantidade de falhas antes e depois da correção."],
            ["Feedback comercial", "Os usuários confirmam que conseguem registrar vendas normalmente."],
            ["Relatório operacional", "Acompanhe erros de autenticação e tempo de recuperação."]
        ],
        acoes: [
            {
                id: "indicadores", titulo: "Definir indicadores de acompanhamento",
                descricao: "Medir recorrência, disponibilidade e tempo de recuperação.",
                funcao: "improve", pista: 0, efeito: 0,
                retorno: "Indicadores definidos para verificar se a melhoria trouxe resultados."
            },
            {
                id: "comunicar", titulo: "Confirmar o resultado com usuários",
                descricao: "Validar o serviço e comunicar o encerramento.",
                funcao: "comms", pista: 1, efeito: 0,
                retorno: "Os usuários confirmaram a recuperação e receberam uma atualização."
            },
            {
                id: "melhorar", titulo: "Registrar plano de melhoria contínua",
                descricao: "Definir responsável, prazo e revisão dos indicadores.",
                funcao: "improve", pista: 2, efeito: 0,
                retorno: "Plano de melhoria registrado com acompanhamento futuro."
            }
        ],
        obrigatorias: ["indicadores", "comunicar", "melhorar"]
    }
];

const funcoes = [
    {id: "service", nome: "Service Desk", sigla: "SD", descricao: "Registra e organiza os chamados."},
    {id: "incident", nome: "Gestão de Incidentes", sigla: "IN", descricao: "Prioriza e coordena a restauração."},
    {id: "problem", nome: "Investigação de Problemas", sigla: "PR", descricao: "Investiga padrões e causas."},
    {id: "change", nome: "Gestão de Mudanças", sigla: "CH", descricao: "Avalia riscos, testes e reversão."},
    {id: "comms", nome: "Comunicação", sigla: "CO", descricao: "Mantém usuários informados."},
    {id: "improve", nome: "Melhoria Contínua", sigla: "MC", descricao: "Acompanha indicadores e melhorias."}
];

// VARIÁVEIS DO JOGO
let faseAtual = 0;
let saude = 8;
let totalConcluidos = 0;
let acoesRestantes = 4;
let pistasEncontradas = [];
let acoesConcluidas = [];
let historico = [];
let jogoFinalizado = false;

const obter = id => document.getElementById(id);

// SALVAR E CARREGAR O PROGRESSO
function salvarProgresso() {
    const progresso = {
        faseAtual,
        saude,
        totalConcluidos,
        acoesRestantes,
        pistasEncontradas,
        acoesConcluidas,
        historico,
        jogoFinalizado,
        quantidadeJogadores: obter("quantidadeJogadores").value
    };

    localStorage.setItem("progressoJogo", JSON.stringify(progresso));
}

function carregarProgresso() {
    const dados = localStorage.getItem("progressoJogo");

    if (!dados) {
        return false;
    }

    try {
        const progresso = JSON.parse(dados);

        // Verifica se os dados principais existem e são válidos.
        if (
            !Number.isInteger(progresso.faseAtual) ||
            progresso.faseAtual < 0 ||
            progresso.faseAtual >= fases.length ||
            !Array.isArray(progresso.pistasEncontradas) ||
            !Array.isArray(progresso.acoesConcluidas) ||
            !Array.isArray(progresso.historico)
        ) {
            return false;
        }

        faseAtual = progresso.faseAtual;
        saude = Number(progresso.saude);
        totalConcluidos = Number(progresso.totalConcluidos);
        acoesRestantes = Number(progresso.acoesRestantes);
        pistasEncontradas = progresso.pistasEncontradas;
        acoesConcluidas = progresso.acoesConcluidas;
        historico = progresso.historico;
        jogoFinalizado = Boolean(progresso.jogoFinalizado);

        if (["4", "5", "6"].includes(String(progresso.quantidadeJogadores))) {
            obter("quantidadeJogadores").value = String(progresso.quantidadeJogadores);
        }

        mostrarTudo();
        mostrarMensagem("Progresso carregado. Continue de onde parou.", "sucesso");
        return true;
    } catch (erro) {
        console.error("Não foi possível carregar o progresso:", erro);
        return false;
    }
}

function escapar(texto) {
    return String(texto).replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[caractere]);
}

// DISTRIBUIÇÃO DAS FUNÇÕES ENTRE OS JOGADORES
function obterFuncoesDosJogadores() {
    const quantidade = Number(obter("quantidadeJogadores").value);

    if (quantidade === 4) {
        return [
            {jogador: 1, funcoes: ["service", "comms"]},
            {jogador: 2, funcoes: ["incident"]},
            {jogador: 3, funcoes: ["problem", "improve"]},
            {jogador: 4, funcoes: ["change"]}
        ];
    }

    if (quantidade === 5) {
        return [
            {jogador: 1, funcoes: ["service"]},
            {jogador: 2, funcoes: ["incident"]},
            {jogador: 3, funcoes: ["problem"]},
            {jogador: 4, funcoes: ["change"]},
            {jogador: 5, funcoes: ["comms", "improve"]}
        ];
    }

    return funcoes.map((funcao, indice) => ({
        jogador: indice + 1,
        funcoes: [funcao.id]
    }));
}

function equipePossuiFuncao(idFuncao) {
    return obterFuncoesDosJogadores().some(jogador =>
        jogador.funcoes.includes(idFuncao)
    );
}

// HISTÓRICO
function adicionarHistorico(texto) {
    historico.unshift(texto);
    historico = historico.slice(0, 8);
    mostrarHistorico();
}

function mostrarHistorico() {
    obter("historico").innerHTML = historico.map(texto =>
        `<div class="historico-item">${escapar(texto)}</div>`
    ).join("");
}

// CHAMADOS
function mostrarChamados() {
    const fase = fases[faseAtual];
    obter("contadorChamados").textContent = `${fase.chamados.length} chamados`;

    obter("listaChamados").innerHTML = fase.chamados.map(chamado => {
        const classe = chamado[3] === "CRÍTICO" || chamado[3] === "ALTO"
            ? "critico" : "medio";

        return `
            <article class="chamado">
                <h4>${escapar(chamado[0])} · ${escapar(chamado[1])}</h4>
                <p>${escapar(chamado[2])}</p>
                <div class="etiquetas-chamado">
                    <span class="tag ${classe}">${escapar(chamado[3])}</span>
                    <span class="tag">EM ANÁLISE</span>
                </div>
            </article>`;
    }).join("");
}

// PISTAS
function investigarPista(indice) {
    if (pistasEncontradas.includes(indice)) return;

    pistasEncontradas.push(indice);
    const pista = fases[faseAtual].pistas[indice];

    adicionarHistorico(`Pista investigada: ${pista[0]}.`);
    mostrarTudo();
    mostrarMensagem("Pista descoberta! Compartilhe essa informação com a equipe.", "sucesso");
    salvarProgresso();
}

function mostrarPistas() {
    const fase = fases[faseAtual];

    obter("contadorPistas").textContent =
        `${pistasEncontradas.length}/${fase.pistas.length} pistas`;

    obter("listaPistas").innerHTML = fase.pistas.map((pista, indice) => {
        const encontrada = pistasEncontradas.includes(indice);

        return `
            <button class="pista ${encontrada ? "" : "nao-descoberta"}"
                    data-pista="${indice}" ${encontrada ? "disabled" : ""}>
                <div>
                    <h4>${encontrada ? escapar(pista[0]) : `Investigar registro ${indice + 1}`}</h4>
                    <p>${encontrada ? escapar(pista[1]) : "Clique para examinar esta evidência."}</p>
                </div>
            </button>`;
    }).join("");

    document.querySelectorAll("[data-pista]").forEach(botao => {
        botao.addEventListener("click", () =>
            investigarPista(Number(botao.dataset.pista))
        );
    });
}

// EXECUTAR AÇÕES
function executarAcao(idAcao) {
    if (jogoFinalizado || acoesRestantes <= 0) return;

    const fase = fases[faseAtual];
    const acao = fase.acoes.find(item => item.id === idAcao);

    if (!acao || acoesConcluidas.includes(idAcao)) return;
    if (acao.pista !== null && !pistasEncontradas.includes(acao.pista)) return;
    if (!equipePossuiFuncao(acao.funcao)) return;

    acoesRestantes--;
    acoesConcluidas.push(idAcao);
    saude = Math.max(0, Math.min(10, saude + acao.efeito));

    if (fase.obrigatorias.includes(acao.id)) {
        totalConcluidos++;
    }

    adicionarHistorico(`${acao.titulo}: ${acao.retorno}`);

    if (saude === 0) {
        jogoFinalizado = true;
        mostrarMensagem(
            "DERROTA: a saúde dos serviços chegou a zero. Reinicie e reveja as decisões da equipe.",
            "erro"
        );
    } else {
        mostrarMensagem(acao.retorno, acao.efeito < 0 ? "erro" : "sucesso");
    }

    mostrarTudo();

    if (!jogoFinalizado && fase.obrigatorias.every(id => acoesConcluidas.includes(id))) {
        mostrarMensagem(
            `${acao.retorno} Objetivos da etapa concluídos. Você pode avançar.`,
            "sucesso"
        );
    }

    salvarProgresso();
}

function mostrarAcoes() {
    const fase = fases[faseAtual];

    obter("listaAcoes").innerHTML = fase.acoes.map(acao => {
        const jaFeita = acoesConcluidas.includes(acao.id);
        const precisaPista = acao.pista !== null &&
            !pistasEncontradas.includes(acao.pista);
        const semFuncao = !equipePossuiFuncao(acao.funcao);

        const desabilitada = jogoFinalizado || acoesRestantes <= 0 ||
            jaFeita || precisaPista || semFuncao;

        let textoBotao = "Executar";

        if (jaFeita) textoBotao = "Concluída";
        else if (precisaPista) textoBotao = "Requer pista";
        else if (semFuncao) textoBotao = "Função indisponível";
        else if (acoesRestantes <= 0) textoBotao = "Sem ações";

        const nomeFuncao = funcoes.find(funcao =>
            funcao.id === acao.funcao
        ).nome;

        return `
            <article class="acao">
                <div class="acao-texto">
                    <h4>${escapar(acao.titulo)}</h4>
                    <p>${escapar(acao.descricao)}</p>
                    <span class="tag">Função: ${escapar(nomeFuncao)}</span>
                </div>
                <button data-acao="${acao.id}" ${desabilitada ? "disabled" : ""}>
                    ${textoBotao}
                </button>
            </article>`;
    }).join("");

    document.querySelectorAll("[data-acao]").forEach(botao => {
        botao.addEventListener("click", () =>
            executarAcao(botao.dataset.acao)
        );
    });
}

// FUNÇÕES DOS JOGADORES
function mostrarFuncoes() {
    const jogadores = obterFuncoesDosJogadores();

    obter("listaFuncoes").innerHTML = jogadores.map(jogador => {
        const lista = jogador.funcoes.map(id =>
            funcoes.find(funcao => funcao.id === id)
        );

        return `
            <div class="funcao">
                <div class="sigla">${lista.map(funcao => funcao.sigla).join("+")}</div>
                <div>
                    <strong>Jogador ${jogador.jogador}: ${lista.map(funcao => funcao.nome).join(" + ")}</strong>
                    <p>${lista.map(funcao => funcao.descricao).join(" ")}</p>
                </div>
            </div>`;
    }).join("");
}

// MENSAGENS E INDICADORES
function mostrarMensagem(texto, tipo = "") {
    const mensagem = obter("mensagem");
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

function atualizarIndicadores() {
    obter("saude").textContent = saude;
    obter("barraSaude").style.width = `${saude * 10}%`;

    obter("textoSaude").textContent =
        saude >= 8 ? "Operação estável" :
        saude >= 5 ? "Serviço instável" :
        saude > 0 ? "Risco elevado" : "Serviço indisponível";

    obter("objetivos").textContent = totalConcluidos;
    obter("barraObjetivos").style.width =
        `${Math.min(100, totalConcluidos / 10 * 100)}%`;

    obter("acoes").textContent = acoesRestantes;
    obter("numeroFase").textContent = `${faseAtual + 1}/${fases.length}`;
}

function mostrarTudo() {
    const fase = fases[faseAtual];

    obter("tituloFase").textContent = fase.titulo;
    obter("descricaoFase").textContent = fase.descricao;

    atualizarIndicadores();
    mostrarChamados();
    mostrarPistas();
    mostrarAcoes();
    mostrarFuncoes();

    const etapaConcluida = fase.obrigatorias.every(id =>
        acoesConcluidas.includes(id)
    );

    obter("avancar").hidden = !etapaConcluida || jogoFinalizado;
    obter("reiniciar").hidden = !jogoFinalizado;

    mostrarHistorico();
}

// AVANÇAR ETAPA
function avancarFase() {
    const fase = fases[faseAtual];

    const concluiuTudo = fase.obrigatorias.every(id =>
        acoesConcluidas.includes(id)
    );

    if (!concluiuTudo || jogoFinalizado) return;

    if (faseAtual === fases.length - 1) {
        jogoFinalizado = true;
        mostrarTudo();

        mostrarMensagem(
            "VITÓRIA! A equipe concluiu a investigação, restaurou serviços e registrou melhorias. Reveja o histórico e discuta as práticas ITIL utilizadas.",
            "sucesso"
        );

        adicionarHistorico("Vitória! Todas as etapas foram concluídas.");
        obter("reiniciar").hidden = false;
        obter("avancar").hidden = true;
        salvarProgresso();
        return;
    }

    faseAtual++;
    pistasEncontradas = [];
    acoesConcluidas = [];
    acoesRestantes = 4;

    mostrarTudo();
    mostrarMensagem("Nova etapa iniciada. Leia os chamados e investigue as pistas.");
    adicionarHistorico(`Nova etapa: ${fases[faseAtual].titulo}.`);
    salvarProgresso();
}

// REINICIAR
function reiniciarJogo() {
    faseAtual = 0;
    saude = 8;
    totalConcluidos = 0;
    acoesRestantes = 4;
    pistasEncontradas = [];
    acoesConcluidas = [];
    historico = [];
    jogoFinalizado = false;

    mostrarTudo();
    mostrarMensagem("Missão reiniciada. Comece investigando as pistas.");
    adicionarHistorico("Missão iniciada. O sistema de vendas está instável.");
    salvarProgresso();
}

// EVENTOS DOS BOTÕES
obter("avancar").addEventListener("click", avancarFase);
obter("reiniciar").addEventListener("click", reiniciarJogo);

obter("quantidadeJogadores").addEventListener("change", () => {
    mostrarFuncoes();
    mostrarAcoes();
    salvarProgresso();
});

// INICIAR NOVO JOGO
obter("novoJogo").addEventListener("click", () => {
    obter("menuInicial").hidden = true;
    obter("telaJogo").hidden = false;
    reiniciarJogo();
});

// VOLTAR AO MENU
obter("menuJogo").addEventListener("click", () => {
    salvarProgresso();
    obter("menuInicial").hidden = false;
    obter("telaJogo").hidden = true;
});

// CONTINUAR JOGO SALVO
obter("continuarJogo").addEventListener("click", () => {
    const carregou = carregarProgresso();

    if (carregou) {
        obter("menuInicial").hidden = true;
        obter("telaJogo").hidden = false;
    } else {
        alert("Nenhum progresso salvo válido foi encontrado!");
    }
});

// A TELA INICIAL É O MENU PRINCIPAL.
obter("menuInicial").hidden = false;
obter("telaJogo").hidden = true;
