// ============================================================
// LAB02 - Sistema de Gerenciamento de Funcionários
// ============================================================

// -----------------------------------------------------------
// Classe Funcionario
// Representa um funcionário da empresa com seus dados básicos
// -----------------------------------------------------------
class Funcionario {
  public matricula: number;
  public nome: string;
  public cargo: string;
  public salario: number;

  // Construtor inicializa todas as propriedades do funcionário
  constructor(matricula: number, nome: string, cargo: string, salario: number) {
    this.matricula = matricula;
    this.nome = nome;
    this.cargo = cargo;
    this.salario = salario;
  }
}

// -----------------------------------------------------------
// Classe Empresa
// Gerencia a lista de funcionários e as operações sobre eles
// -----------------------------------------------------------
class Empresa {
  // Array privado: só pode ser acessado pelos métodos desta classe
  private funcionarios: Funcionario[] = [];

  // Adiciona um novo funcionário à lista da empresa
  public adicionarFuncionario(funcionario: Funcionario): void {
    this.funcionarios.push(funcionario);
    console.log(`Funcionário "${funcionario.nome}" cadastrado com sucesso.`);
  }

  // Atualiza o salário do funcionário com a matrícula informada
  public atualizarSalario(matricula: number, salario: number): void {
    const funcionario: Funcionario | undefined = this.funcionarios.find(
      (f) => f.matricula === matricula
    );

    if (funcionario === undefined) {
      console.error(`Erro: Funcionário com matrícula ${matricula} não encontrado.`);
      return;
    }

    funcionario.salario = salario;
    console.log(`Salário de "${funcionario.nome}" atualizado para R$ ${salario.toFixed(2)}.`);
  }

  // Retorna o funcionário com a matrícula informada, ou undefined se não existir
  public consultarFuncionario(matricula: number): Funcionario | undefined {
    const funcionario: Funcionario | undefined = this.funcionarios.find(
      (f) => f.matricula === matricula
    );

    if (funcionario === undefined) {
      console.error(`Erro: Funcionário com matrícula ${matricula} não encontrado.`);
    }

    return funcionario;
  }
}

// -----------------------------------------------------------
// Funções de teste
// -----------------------------------------------------------

// Cadastra três funcionários na empresa
function cadastrarFuncionarios(empresa: Empresa): void {
  console.log("\n--- Cadastrando Funcionários ---");

  const f1: Funcionario = new Funcionario(1001, "Israel", "Desenvolvedor", 8500.00);
  const f2: Funcionario = new Funcionario(1002, "Carlos Eduardo", "Designer", 7200.00);
  const f3: Funcionario = new Funcionario(1003, "Valcir Jr.", "Analista de RH", 6800.00);

  empresa.adicionarFuncionario(f1);
  empresa.adicionarFuncionario(f2);
  empresa.adicionarFuncionario(f3);
}

// Atualiza o salário de um funcionário existente
function atualizarSalario(empresa: Empresa): void {
  console.log("\n--- Atualizando Salário ---");

  // Atualiza salário da matrícula 1001
  empresa.atualizarSalario(1001, 9500.00);

  // Tenta atualizar uma matrícula inexistente (deve exibir erro)
  empresa.atualizarSalario(9999, 5000.00);
}

// Consulta um funcionário pela matrícula e exibe suas informações
function consultarFuncionario(empresa: Empresa): void {
  console.log("\n--- Consultando Funcionário ---");

  const funcionario: Funcionario | undefined = empresa.consultarFuncionario(1001);

  if (funcionario !== undefined) {
    console.log("Dados do funcionário encontrado:");
    console.log(`  Matrícula : ${funcionario.matricula}`);
    console.log(`  Nome      : ${funcionario.nome}`);
    console.log(`  Cargo     : ${funcionario.cargo}`);
    console.log(`  Salário   : R$ ${funcionario.salario.toFixed(2)}`);
  }

  // Consulta uma matrícula inexistente (deve exibir erro)
  empresa.consultarFuncionario(9999);
}

// -----------------------------------------------------------
// Execução principal
// -----------------------------------------------------------
const empresa: Empresa = new Empresa();

cadastrarFuncionarios(empresa);
atualizarSalario(empresa);
consultarFuncionario(empresa);