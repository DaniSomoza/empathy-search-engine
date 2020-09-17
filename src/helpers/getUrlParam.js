import queryString from "query-string";

export default function getUrlParam(param) {
  const url = window.location.href;
  const { query } = queryString.parseUrl(url);
  return query[param];
}
