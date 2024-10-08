import { $host, $authHost } from './index';

export const getCommentById = async (articleId: string, commentId: string) => {
  try {
    const { data } = await $host.get(`/articles/${articleId}/comments/${commentId}/`);
    return data;
  } catch (error: any) {
    console.error('Ошибка при получении комментария: ', error.response?.data || error.message);
    throw error;
  }
};

export const updateComment = async (articleId: string, commentId: string, content: string) => {
  try {
    const token = localStorage.getItem('accessToken');
    const { data } = await $authHost.put(
      `/articles/${articleId}/comments/${commentId}/`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error: any) {
    console.error('Ошибка при изменении комментария: ', error.response?.data || error.message);
    throw error;
  }
};

export const deleteComment = async (articleId: string, commentId: string) => {
  try {
    const token = localStorage.getItem('accessToken');
    await $authHost.delete(`/articles/${articleId}/comments/${commentId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    console.error('Ошибка удаления комментария: ', error.response?.data || error.message);
    throw error;
  }
};
