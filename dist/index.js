"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Livro {
    codigo;
    titulo;
    autor;
    disponivel;
    constructor(codigo, titulo, autor, disponivel = true) {
        this.codigo = codigo;
        this.titulo = titulo;
        this.autor = autor;
        this.disponivel = disponivel;
    }
}
class Biblioteca {
    acervo = [];
    adicionarLivro(livro) {
        const existe = this.acervo.find((l) => l.codigo === livro.codigo);
        if (existe) {
            throw new Error(`O livro com código ${livro.codigo} já existe no acervo.`);
        }
        this.acervo.push(livro);
        console.log(`Livro "${livro.titulo}" adicionado ao acervo.`);
    }
    registrarEmprestimo(codigo) {
        const livro = this.acervo.find((l) => l.codigo === codigo);
        if (!livro) {
            throw new Error(`O livro com código ${codigo} não foi encontrado no acervo.`);
        }
        if (!livro.disponivel) {
            throw new Error(`O livro "${livro.titulo}" não está disponível para empréstimo.`);
        }
        livro.disponivel = false;
        console.log(`Livro "${livro.titulo}" emprestado com sucesso.`);
    }
    consultarDisponibilidade(codigo) {
        const livro = this.acervo.find((l) => l.codigo === codigo);
        if (!livro) {
            throw new Error(`O livro com código ${codigo} não foi encontrado no acervo.`);
        }
        return livro.disponivel;
    }
}
function cadastrarLivros(biblioteca) {
    console.log("\n--- Cadastrando Livros ---");
    const livros = [
        new Livro(1, "Dom Casmurro", "Machado de Assis"),
        new Livro(2, "Grande Sertão: Veredas", "João Guimarães Rosa"),
        new Livro(3, "O Cortiço", "Aluísio Azevedo"),
        new Livro(4, "Capitães da Areia", "Jorge Amado"),
    ];
    for (const livro of livros) {
        biblioteca.adicionarLivro(livro);
    }
}
function realizarEmprestimo(biblioteca, codigo) {
    console.log("\n--- Registrando Empréstimo ---");
    try {
        biblioteca.registrarEmprestimo(codigo);
    }
    catch (erro) {
        if (erro instanceof Error) {
            console.error(` Erro ao registrar empréstimo: ${erro.message}`);
        }
    }
}
function verificarDisponibilidade(biblioteca, codigo) {
    console.log("\n--- Consultando Disponibilidade ---");
    try {
        const disponivel = biblioteca.consultarDisponibilidade(codigo);
        const status = disponivel ? "✅ disponível" : "Indisponível";
        console.log(`Livro de código ${codigo}: ${status}.`);
    }
    catch (erro) {
        if (erro instanceof Error) {
            console.error(`Erro na consulta: ${erro.message}`);
        }
    }
}
const minhaBiblioteca = new Biblioteca();
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
//# sourceMappingURL=index.js.map