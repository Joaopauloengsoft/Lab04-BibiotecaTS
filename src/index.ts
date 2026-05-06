class Livro {
    public codigo: number;
    public titulo: string;
    public autor: string;
    public disponivel: boolean;

    constructor(codigo: number, titulo: string, autor: string, disponivel: boolean = true) {
        this.codigo = codigo;
        this.titulo = titulo;
        this.autor = autor;
        this.disponivel = disponivel;
    }
}




class Biblioteca {
    public acervo: Livro[] = [];
    
    public adicionarLivro(livro: Livro): void {
        const existe: Livro | undefined = this.acervo.find((l: Livro) => l.codigo === livro.codigo);
        if (existe) {
            throw new Error(`O livro com código ${livro.codigo} já existe no acervo.`);
        }
        this.acervo.push(livro);
        console.log(`Livro "${livro.titulo}" adicionado ao acervo.`);
    }

    public registrarEmprestimo(codigo: number): void {
        const livro: Livro | undefined = this.acervo.find((l: Livro) => l.codigo === codigo);
        if (!livro) {
            throw new Error(`O livro com código ${codigo} não foi encontrado no acervo.`);
        }
        if (!livro.disponivel) {
            throw new Error(`O livro "${livro.titulo}" não está disponível para empréstimo.`);
        }
        livro.disponivel = false;
        console.log(`Livro "${livro.titulo}" emprestado com sucesso.`);
    }

    public consultarDisponibilidade(codigo: number): boolean {
        const livro: Livro | undefined = this.acervo.find((l: Livro) => l.codigo === codigo);
        if (!livro) {
            throw new Error(`O livro com código ${codigo} não foi encontrado no acervo.`);
        }
        return livro.disponivel;
    }
}

function cadastrarLivros(biblioteca: Biblioteca): void {
  console.log("\n--- Cadastrando Livros ---");
 
  const livros: Livro[] = [
    new Livro(1, "Dom Casmurro", "Machado de Assis"),
    new Livro(2, "Grande Sertão: Veredas", "João Guimarães Rosa"),
    new Livro(3, "O Cortiço", "Aluísio Azevedo"),
    new Livro(4, "Capitães da Areia", "Jorge Amado"),
  ];
 
  for (const livro of livros) {
    biblioteca.adicionarLivro(livro);
  }
}


function realizarEmprestimo(biblioteca: Biblioteca, codigo: number): void {
  console.log("\n--- Registrando Empréstimo ---");
 
  try {
    biblioteca.registrarEmprestimo(codigo);
  } catch (erro: unknown) {
    if (erro instanceof Error) {
      console.error(` Erro ao registrar empréstimo: ${erro.message}`);
    }
  }
}


function verificarDisponibilidade(biblioteca: Biblioteca, codigo: number): void {
  console.log("\n--- Consultando Disponibilidade ---");
 
  try {
    const disponivel: boolean = biblioteca.consultarDisponibilidade(codigo);
    const status: string = disponivel ? "Disponível" : "Indisponível";
    console.log(`Livro de código ${codigo}: ${status}.`);
  } catch (erro: unknown) {
    if (erro instanceof Error) {
      console.error(`Erro na consulta: ${erro.message}`);
    }
  }
}


const minhaBiblioteca: Biblioteca = new Biblioteca();
 
// 1. Cadastrar livros
cadastrarLivros(minhaBiblioteca);
 
// 2. Consultar disponibilidade antes do empréstimo
verificarDisponibilidade(minhaBiblioteca, 2);
 
// 3. Registrar empréstimo do livro de código 2
realizarEmprestimo(minhaBiblioteca, 2);
 
// 4. Consultar disponibilidade após o empréstimo
verificarDisponibilidade(minhaBiblioteca, 2);
 
// 5. Tentar emprestar o mesmo livro novamente (erro esperado)
realizarEmprestimo(minhaBiblioteca, 2);
 
// 6. Consultar livro inexistente (erro esperado)
verificarDisponibilidade(minhaBiblioteca, 99);
 
// 7. Consultar livro ainda disponível
verificarDisponibilidade(minhaBiblioteca, 3);
