import request from './request';

const urls = { root: '/player' };

export async function create(params) {
  return request.post(urls.root, params).then(response => response.data.data );
}

export async function getAll() {
  return request.get(urls.root).then(response => response.data.data );
}
