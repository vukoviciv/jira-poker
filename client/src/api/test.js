import request from './request';

const urls = { root: '/test' };

export async function testApi() {
  return request.get(urls.root).then(response => response.data );
}
