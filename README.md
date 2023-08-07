# DraftCode

<img src="./public/images/draftcode.png" alt="Image do site DraftCode">

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [x] Área para administradores adicionarem suas redes sociais para ficar em evidência no site
- [ ] Melhorar performance.
- [ ] Melhorar responsividade.
- [ ] Corrigir bugs existentes.

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você tem o `docker` instalado.
- Você tem o `cloudinary` configurado.
- Você tem o `oauth app` do github configurado.
- Você tem o `microsserviço` de upload de imagens rodando.
- Você tem a versão mais recente do `node` e `npm` instalado.
- Você configurou suas váriaveis de ambiente conforme está presente no `.env.example`.

Caso não tenha o microsserviço de upload de imagens, você pode baixar ele [aqui](https://github.com/matheuspergoli/draftcode-upload-image), é obrigatório para criar novos desafios ter o microsserviço de upload de imagens rodando.

Crie um oauth app no github seguindo [este tutorial](docs/oauth/OAUTH.MD), é obrigatório para o funcionamento do NextAuth que você crie e configure um oauth app no github, caso contrário, o login com o github não irá funcionar.

Configure o cloudinary seguindo [esse passo a passo](https://github.com/matheuspergoli/draftcode-upload-image/blob/main/docs/cloudinary/CLOUDINARY.MD)

## 🚀 Instalando o DraftCode

Para instalar o DraftCode, siga estas etapas:

Linux:

```
npm install && sudo docker-compose up -d && npx prisma db push && npm run dev
```

Windows:

```
npm install && docker-compose up -d && npx prisma db push && npm run dev
```

## 📫 Contribuindo para o DraftCode

Para contribuir com o DraftCode, siga estas etapas:

1. Faça um fork desse projeto e clone pra você.
2. Crie uma branch: `git checkout -b <nome_branch>`.
3. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
4. Envie para a branch original: `git push origin <nome_do_projeto> / <local>`
5. Crie a solicitação de pull.

Como alternativa, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## 🤝 Colaboradores

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/matheuspergoli" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/94739199?v=4" width="100px;" alt="Foto do Matheus Pergoli no GitHub"/><br>
        <sub>
          <b>Matheus Pergoli</b>
        </sub>
      </a>
    </td>
		<td align="center">
      <a href="https://github.com/NatanCastro" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/65430728?v=4" width="100px;" alt="Foto do Natan Castro no GitHub"/><br>
        <sub>
          <b>Natan Castro</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/vitorFRE" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/68834970?v=4" width="100px;" alt="Foto do VitorFRE no GitHub"/><br>
        <sub>
          <b>Vitor Santos</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE) para mais detalhes.

[⬆ Voltar ao topo](#DraftCode)<br>
