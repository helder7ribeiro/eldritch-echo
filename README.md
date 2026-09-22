# Eldrich Echo

Módulo pessoal para o sistema [Call of Cthulhu 7th Edition](https://github.com/Miskatonic-Investigative-Society/CoC7-FoundryVTT) no Foundry VTT.

Ele estende o CoC7 **de fora**, usando a API pública do sistema (`game.CoC7`),
os hooks próprios dele e os hooks de render do Foundry — sem precisar alterar o
sistema. Mudanças que exigem mexer no core vivem no fork do CoC7, não aqui.

## Desenvolvimento

O módulo não tem build: os arquivos em disco são os arquivos servidos.
Com `hotReload` ligado no servidor, editar `styles/`, `templates/` ou `lang/`
reflete ao vivo; editar `scripts/` dispara um refresh automático da página
(ver `scripts/dev-reload.js`).

## Requisitos

- Foundry VTT v13+ (verificado em v14)
- Sistema `CoC7` 8.15 ou superior
