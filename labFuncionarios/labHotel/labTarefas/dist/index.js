"use strict";
// ============================================================
// LAB04 - Sistema de Gestão de Tarefas
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
// -----------------------------------------------------------
// Classe Tarefa
// Representa uma tarefa com seu identificador, descrição,
// status atual e o projeto ao qual pertence
// -----------------------------------------------------------
class Tarefa {
    id;
    descricao;
    status;
    projeto;
    // Construtor inicializa todas as propriedades da tarefa
    constructor(id, descricao, status, projeto) {
        this.id = id;
        this.descricao = descricao;
        this.status = status;
        this.projeto = projeto;
    }
}
// -----------------------------------------------------------
// Classe GestorTarefas
// Gerencia o conjunto de tarefas e as operações sobre elas
// -----------------------------------------------------------
class GestorTarefas {
    // Array privado: inacessível diretamente fora da classe
    tarefas = [];
    // Adiciona uma nova tarefa ao sistema
    adicionarTarefa(tarefa) {
        this.tarefas.push(tarefa);
        console.log(`Tarefa #${tarefa.id} "${tarefa.descricao}" adicionada ao projeto "${tarefa.projeto}".`);
    }
    // Atualiza o status da tarefa com o ID informado
    atualizarStatus(id, status) {
        const tarefa = this.tarefas.find((t) => t.id === id);
        if (tarefa === undefined) {
            console.error(`Erro: Tarefa com ID ${id} não encontrada.`);
            return;
        }
        tarefa.status = status;
        console.log(`Status da tarefa #${id} atualizado para "${status}".`);
    }
    // Retorna todas as tarefas pertencentes ao projeto informado
    consultarTarefasPorProjeto(projeto) {
        const resultado = this.tarefas.filter((t) => t.projeto.toLowerCase() === projeto.toLowerCase());
        if (resultado.length === 0) {
            console.error(`Nenhuma tarefa encontrada para o projeto "${projeto}".`);
        }
        return resultado;
    }
}
// -----------------------------------------------------------
// Funções de teste
// -----------------------------------------------------------
// Adiciona pelo menos três tarefas ao sistema
function adicionarTarefas(gestor) {
    console.log("\n--- Adicionando Tarefas ---");
    const t1 = new Tarefa(1, "Criar wireframes das telas", "Pendente", "App Mobile");
    const t2 = new Tarefa(2, "Desenvolver API de autenticação", "Em Andamento", "App Mobile");
    const t3 = new Tarefa(3, "Escrever documentação técnica", "Pendente", "Portal Web");
    const t4 = new Tarefa(4, "Implementar tela de login", "Pendente", "App Mobile");
    gestor.adicionarTarefa(t1);
    gestor.adicionarTarefa(t2);
    gestor.adicionarTarefa(t3);
    gestor.adicionarTarefa(t4);
}
// Atualiza o status de uma tarefa existente
function atualizarStatus(gestor) {
    console.log("\n--- Atualizando Status ---");
    // Marca tarefa #1 como concluída
    gestor.atualizarStatus(1, "Concluída");
    // Tenta atualizar uma tarefa inexistente (deve exibir erro)
    gestor.atualizarStatus(999, "Em Andamento");
}
// Consulta e exibe todas as tarefas de um projeto específico
function consultarTarefasPorProjeto(gestor) {
    console.log("\n--- Consultando Tarefas do Projeto: App Mobile ---");
    const tarefas = gestor.consultarTarefasPorProjeto("App Mobile");
    if (tarefas.length > 0) {
        tarefas.forEach((tarefa) => {
            console.log(`  [#${tarefa.id}] ${tarefa.descricao}`);
            console.log(`         Status  : ${tarefa.status}`);
            console.log(`         Projeto : ${tarefa.projeto}`);
        });
    }
    // Consulta um projeto inexistente (deve exibir mensagem de aviso)
    console.log("\n--- Consultando Tarefas do Projeto: Inexistente ---");
    gestor.consultarTarefasPorProjeto("Projeto Inexistente");
}
// -----------------------------------------------------------
// Execução principal
// -----------------------------------------------------------
const gestor = new GestorTarefas();
adicionarTarefas(gestor);
atualizarStatus(gestor);
consultarTarefasPorProjeto(gestor);
//# sourceMappingURL=index.js.map