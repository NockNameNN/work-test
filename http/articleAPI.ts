import {$host, $authHost} from "./index";

export const getArticles = async () => {
  try {
    const { data } = await $host.get('/articles/');
    return data;
  } catch (error: any) {
    console.error('Ошибка загрузки статей: ', error.response?.data || error.message);
    throw error;
  }
}

export const createArticle = async (title: string, content: string, image: File | null) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    const { data } = await $authHost.post('/articles/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  } catch (error: any) {
    console.error('Ошибка при добавлении статьи: ', error.response?.data);
    throw error;
  }
};

export const getArticleById = async (id: string) => {
  try {
    const { data } = await $host.get(`/articles/${id}/`);
    return data;
  } catch (e: any) {
    console.error('Ошибка при получении статьи: ', e.response?.data);
    throw e;
  }
}

export const updateArticle = async (id: string, title: string | null, content: string | null, image: File | null) => {
  try {
    const token = localStorage.getItem('accessToken');
    const formData = new FormData();
    if (title) {
      formData.append('title', title);
    } 
    if (content)
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    const method = (title && content && image) ? 'put' : 'patch';

    const { data } = await $authHost[method](`articles/${id}/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (e: any) {
    console.error('Ошибка при изменении статьи: ', e.response?.data);
    throw e;
  }
}

export const deleteArticle = async (id: string) => {
  try {
    const token = localStorage.getItem('accessToken');
    await $authHost.delete(`articles/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e: any) {
    console.error('Ошибка удаления статьи: ', e.response?.data);
    throw e;
  }
};

export const getCommentsByArticleId = async (id: string) => {
  try {
    const {data} = await $host.get(`/articles/${id}/comments/`);
    return data;
  } catch (e: any) {
    console.error('Ошибка при получении комментариев: ', e.response?.data);
    throw e;
  }
};

export const createComment = async (id: string, content: string, parent: string | null) => {
  try {
    const token = localStorage.getItem('accessToken');
    const {data} = await $authHost.post(`/articles/${id}/comments/`, {content, parent}, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }) 
    return data;
  } catch (e: any) {
    console.error('Ошибка при создании комментария: ', e.response?.data);
    throw e;
  }
}