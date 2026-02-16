import request from './request';

const urls = {
  base: '/player',
  deletePlayer: (id) => `/player/${id}`,
};

export async function create(params) {
  return request.post(urls.base, params).then(response => response.data.data );
}

export async function remove(id) {
  return request.delete(urls.deletePlayer(String(id))).then(response => response.data.data );
}

export async function getAll() {
  return request.get(urls.base).then(response => response.data.data );
}
