"use strict";
// ============================================================
// LAB03 - Sistema de Reservas de Hotel
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
// -----------------------------------------------------------
// Classe Reserva
// Representa uma reserva de quarto com os dados do hóspede
// e o período de estadia
// -----------------------------------------------------------
class Reserva {
    numeroQuarto;
    nomeHospede;
    dataEntrada;
    dataSaida;
    // Construtor inicializa todas as propriedades da reserva
    constructor(numeroQuarto, nomeHospede, dataEntrada, dataSaida) {
        this.numeroQuarto = numeroQuarto;
        this.nomeHospede = nomeHospede;
        this.dataEntrada = dataEntrada;
        this.dataSaida = dataSaida;
    }
}
// -----------------------------------------------------------
// Classe Hotel
// Gerencia a lista de reservas ativas e as operações sobre elas
// -----------------------------------------------------------
class Hotel {
    // Array privado: inacessível diretamente fora da classe
    reservas = [];
    // Adiciona uma nova reserva ao sistema
    registrarReserva(reserva) {
        // Verifica se o quarto já possui uma reserva ativa
        const reservaExistente = this.reservas.find((r) => r.numeroQuarto === reserva.numeroQuarto);
        if (reservaExistente !== undefined) {
            console.error(`Erro: Quarto ${reserva.numeroQuarto} já está reservado para "${reservaExistente.nomeHospede}".`);
            return;
        }
        this.reservas.push(reserva);
        console.log(`Reserva registrada: Quarto ${reserva.numeroQuarto} para "${reserva.nomeHospede}" ` +
            `(${reserva.dataEntrada.toLocaleDateString("pt-BR")} → ${reserva.dataSaida.toLocaleDateString("pt-BR")}).`);
    }
    // Remove a reserva do quarto especificado
    cancelarReserva(numeroQuarto) {
        const index = this.reservas.findIndex((r) => r.numeroQuarto === numeroQuarto);
        if (index === -1) {
            console.error(`Erro: Nenhuma reserva encontrada para o quarto ${numeroQuarto}.`);
            return;
        }
        const cancelada = this.reservas[index];
        this.reservas.splice(index, 1);
        console.log(`Reserva do quarto ${numeroQuarto} (hóspede: "${cancelada.nomeHospede}") cancelada com sucesso.`);
    }
    // Retorna "Reservado" ou "Disponível" para o quarto especificado
    consultarStatusQuarto(numeroQuarto) {
        const reserva = this.reservas.find((r) => r.numeroQuarto === numeroQuarto);
        return reserva !== undefined ? "Reservado" : "Disponível";
    }
}
// -----------------------------------------------------------
// Funções de teste
// -----------------------------------------------------------
// Registra pelo menos duas reservas no hotel
function registrarReservas(hotel) {
    console.log("\n--- Registrando Reservas ---");
    const r1 = new Reserva(101, "Carlos Andrade", new Date("2025-06-10"), new Date("2025-06-15"));
    const r2 = new Reserva(202, "Fernanda Oliveira", new Date("2025-06-12"), new Date("2025-06-18"));
    const r3 = new Reserva(303, "Ricardo Mendes", new Date("2025-06-20"), new Date("2025-06-25"));
    hotel.registrarReserva(r1);
    hotel.registrarReserva(r2);
    hotel.registrarReserva(r3);
    // Tenta reservar um quarto já ocupado (deve exibir erro)
    const duplicada = new Reserva(101, "Outro Hóspede", new Date("2025-06-11"), new Date("2025-06-14"));
    hotel.registrarReserva(duplicada);
}
// Cancela a reserva de um dos quartos
function cancelarReserva(hotel) {
    console.log("\n--- Cancelando Reserva ---");
    // Cancela a reserva do quarto 202
    hotel.cancelarReserva(202);
    // Tenta cancelar um quarto sem reserva (deve exibir erro)
    hotel.cancelarReserva(999);
}
// Consulta e exibe o status de quartos específicos
function consultarStatus(hotel) {
    console.log("\n--- Consultando Status dos Quartos ---");
    const quartos = [101, 202, 303, 404];
    quartos.forEach((numeroQuarto) => {
        const status = hotel.consultarStatusQuarto(numeroQuarto);
        console.log(`  Quarto ${numeroQuarto}: ${status}`);
    });
}
// -----------------------------------------------------------
// Execução principal
// -----------------------------------------------------------
const hotel = new Hotel();
registrarReservas(hotel);
cancelarReserva(hotel);
consultarStatus(hotel);
//# sourceMappingURL=index.js.map