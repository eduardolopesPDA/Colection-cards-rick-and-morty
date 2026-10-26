# Rick and Morty Cards

Sistema de cartas de colecionador de personagens de Rick and Morty, consumindo a [Rick and Morty API](https://rickandmortyapi.com/).

Projeto acadêmico de Web Design — **HTML + CSS puro + JavaScript** (sem frameworks, sem build).

## Funcionalidades

- Grid de cartas criadas dinamicamente com JavaScript
- Busca por nome
- Filtros por status (Alive / Dead / Unknown) e espécie
- Página de detalhes do personagem
- Favoritos salvos no `localStorage`

## Como rodar

Basta abrir o `index.html` no navegador (não precisa de servidor). A API é pública e não exige chave.

## Estrutura

```text
├── index.html        # Grid, busca e filtros
├── detalhes.html     # Ficha do personagem (?id=1)
├── css/
│   ├── styles.css    # Reset, variáveis, layout base
│   ├── cards.css     # Estética de carta de colecionador
│   └── pages.css     # Detalhes, filtros, responsivo
├── js/
│   ├── api.js        # Fetch da API (listar, buscar, detalhe)
│   ├── cards.js      # Criação dinâmica dos cards
│   ├── favorites.js  # Favoritos (localStorage)
│   ├── filters.js    # Montagem da query de busca/filtros
│   ├── main.js       # Orquestração da home
│   └── detalhes.js   # Orquestração da página de detalhes
└── assets/fonts/     # Tipografia do tema
```

## API utilizada

`https://rickandmortyapi.com/api/character`

Exemplos de chamadas usadas no projeto:

| Recurso | URL |
|---|---|
| Listar | `/character` |
| Buscar + filtrar | `/character?name=rick&status=alive&species=human` |
| Detalhe | `/character/1` |
