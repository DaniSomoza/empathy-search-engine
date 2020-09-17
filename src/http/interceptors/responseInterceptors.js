export function responseInterceptorSuccess(response) {
  return response.data;
}

export function responseInterceptorError(response) {
  // TODO: IMPLEMENT HTTP ERROR

  // TODO: IMPLEMENT HERE REFRESH FLOW

  return Promise.reject(response.response);
}
