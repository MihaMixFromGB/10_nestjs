export interface Comment {
  id: string;
  newsId: string;
  parentId: string | null;
  children: Record<string, Comment>;
  author: string;
  text: string;
}
