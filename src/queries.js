export const RQ_LANGUAGES = encodeURI(`SELECT (COUNT(?lang) as ?count) ?langLabel (REPLACE(STR(?lang), "http://www.wikidata.org/entity/", "") as ?langQ)
WHERE  {
  ?item wdt:P2919 ?file .
  ?item p:P2919 ?statement .
  ?statement pq:P407 ?lang .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en" . }
}
GROUP BY ?langLabel ?lang
ORDER BY DESC(?count)`);

export function RQLanguageItems(language) {
  return `SELECT ?item ?itemLabel ?file ?itemDescription
  WHERE {
    ?item wdt:P2919 ?file .
    ?item p:P2919 ?statement .
    ?statement pq:P407 wd:${language} .
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en" . }
  }`;
}
