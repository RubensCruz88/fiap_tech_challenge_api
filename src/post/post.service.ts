import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostEntity } from "./post.entity";
import { Repository, Like } from "typeorm";
import { UsuarioEntity } from "../usuario/usuario.entity";
import { CriaPostDTO } from "./dto/CriaPostDTO";
import { EditaPostDTO } from "./dto/EditaPostDTO";

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(PostEntity)
		private readonly postRepository: Repository<PostEntity>,
		@InjectRepository(UsuarioEntity)
		private readonly usuarioRepository: Repository<UsuarioEntity>
	) {}

	async criaPost(userId: string,dadosPost: CriaPostDTO) {
		const usuario = await this.usuarioRepository.findOneBy({id: userId})

		if(!usuario) {
			throw new NotFoundException('Usuario não encontrado')
			
		}

		const postEntity = new PostEntity()
		postEntity.titulo = dadosPost.titulo
		postEntity.conteudo = dadosPost.conteudo
		postEntity.usuario = usuario

		const postCriado = await this.postRepository.save(postEntity)

		return postCriado
	}

	async listarPosts() {
		const posts = await this.postRepository.find({
			relations: {
				usuario: true
			}
		})

		return posts
	}

	async getPostById(postId: string) {
		const post = await this.postRepository.findOne({
			where: {
				id: postId
			},
			relations: {
				usuario: true
			}
		})

		if(!post) {
			throw new NotFoundException('Post não encontrado')
		}

		return post
	}

	async editaPost(user: any,postId: string, dadosPost: EditaPostDTO) {
		const post = await this.postRepository.createQueryBuilder('post')
			.innerJoin('post.usuario','usuario')
			.select([
				'post',
				'usuario.id'
			])
			.where('post.id = :postId',{ postId })
			.getOne()

		if (!post) {
			throw new NotFoundException('Post não encontrado')
		}

		if(user.tipo !== 'admin' && user.sub !== post.usuario.id)
			throw new ForbiddenException("usuário sem permissão de editar post")

		if (dadosPost.titulo) {
			post.titulo = dadosPost.titulo
		}
		
		if (dadosPost.conteudo) {
			post.conteudo = dadosPost.conteudo
		}

		return await this.postRepository.save(post)
	}

	async deletaPost(user: any, postId: string) {
		const post = await this.postRepository.createQueryBuilder('post')
			.innerJoin('post.usuario','usuario')
			.select([
				'post',
				'usuario.id'
			])
			.where('post.id = :postId',{ postId })
			.getOne()

		if (!post) {
			throw new NotFoundException('Post não encontrado')
		}

		if(user.tipo !== 'admin' && user.sub !== post.usuario.id)
			throw new ForbiddenException("usuário sem permissão de editar post")

		await this.postRepository.remove(post)
		return { message: 'Post deletado com sucesso' }
	}

	async buscaPosts(termo: string) {
		if (!termo) {
			return await this.listarPosts()
		}

		const posts = await this.postRepository.find({
			where: [
				{ titulo: Like(`%${termo}%`) },
				{ conteudo: Like(`%${termo}%`) }
			],
			relations: {
				usuario: true
			}
		})

		return posts
	}

	async listarPostsPorUsuario(userId: string) {
		const posts = await this.postRepository.find({
			relations: {
				usuario: true
			},
			where: {
				usuario: {
					id: userId
				}
			}
		})

		return posts
	}
}