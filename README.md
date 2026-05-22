# Currículo — Patricia Ivana Veiga Hochsprung

Portfólio profissional em HTML/CSS inspirado em layout moderno, com seções interativas e **galeria de certificados**.

## Visualizar localmente

Abra `index.html` no navegador ou use uma extensão Live Server.

## Publicar no GitHub Pages

1. Envie o repositório para [github.com/patriciaihochsprung/patricia](https://github.com/patriciaihochsprung/patricia)
2. **Settings → Pages → Branch:** `main` · pasta **`/ (root)`**
3. URL: **https://patriciaihochsprung.github.io/patricia/**

## Estrutura

| Caminho | Descrição |
|---------|-----------|
| `index.html` | Página principal |
| `curriculo.html` | Redireciona para `index.html` |
| `assets/css/style.css` | Estilos (tema claro/escuro) |
| `assets/js/main.js` | Menu, contadores, modal de certificados |
| `public/*.jpeg` | Imagens dos certificados |

## Certificados incluídos

1. Brigada de Incêndio — Angeloni (16h)
2. NR 20 Classe I — Babitonga Engenharia
3. PAE — Plano de Atendimento Emergencial
4. EPI — NR-6
5. Benzeno — NR-20 Anexo IV

## Currículo em PDF

- **Arquivo:** `public/curriculo.pdf` — versão profissional para impressão e envio a recrutadores.
- **Botão no site:** “Ver PDF” (hero e menu).
- **Página de impressão:** `curriculo-print.html` (visualizar ou imprimir manualmente).

### Regenerar o PDF (Windows + Edge)

```powershell
$uri = [uri]::new("d:\Projetos\Patricia\patricia\curriculo-print.html").AbsoluteUri
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" `
  --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="d:\Projetos\Patricia\patricia\public\curriculo.pdf" $uri
```

Edite `curriculo-print.html` antes de rodar o comando, se alterar o conteúdo do currículo.
