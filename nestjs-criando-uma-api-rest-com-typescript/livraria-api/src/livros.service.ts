import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Livro } from './livro.model';

@Injectable()
export class LivrosService {
  // livros: Livro[] = [
  //   new Livro('LIV01', 'Livro 1', 29.9),
  //   new Livro('LIV02', 'Livro 2', 29.9),
  //   new Livro('LIV03', 'Livro 3', 29.9),
  // ];

  constructor(@InjectModel(Livro) private livroModel: typeof Livro) {}

  async obterTodos(): Promise<Livro[]> {
    return this.livroModel.findAll();
  }

  async obterUm(id: number): Promise<Livro> {
    return this.livroModel.findByPk(id);
  }

  async criar(livro: Livro) {
    this.livroModel.create(livro);
  }

  async alterar(livro: Livro): Promise<[number, Livro[]]> {
    return this.livroModel.update(livro, {
      where: {
        id: livro.id,
      },
    });
  }

  async apagar(id: number) {
    const livro: Livro = await this.obterUm(id);
    livro.destroy();
  }
}
