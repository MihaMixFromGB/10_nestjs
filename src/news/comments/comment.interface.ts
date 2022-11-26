export interface Comment {
  id: string;
  newsId: string;
  parentId: string | null;
  children: Record<string, Comment>;
  author: string;
  avatar: string;
  text: string;
}
