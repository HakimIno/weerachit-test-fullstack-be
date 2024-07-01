export class CreatePostDto {
    title: string;
    content: string;
    authorId: number;
    tags?: string[];
}

export class PostDto {
    take?: number;
}

export class UpdatePostDto {
    title?: string;
    content?: string;
    authorId?: number;
    tags?: string[];
}
