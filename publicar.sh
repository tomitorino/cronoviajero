#!/usr/bin/env bash
# Publica Cronoviajero en GitHub Pages. La primera vez crea el repositorio y activa la página;
# las siguientes solo sube los cambios (parche).   Uso:  ./publicar.sh "qué cambió"
set -e
cd "$(dirname "$0")"
REPO="${REPO:-cronoviajero}"
MSG="${1:-parche}"

command -v git >/dev/null || { echo "Falta git:  sudo apt install git gh"; exit 1; }
command -v gh  >/dev/null || { echo "Falta gh:   sudo apt install gh"; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "Falta iniciar sesión en GitHub:  gh auth login"; exit 1; }

USUARIO="$(gh api user -q .login)"
[ -d .git ] || git init -q -b main
# identidad para los commits (usa el mail privado de GitHub, no el tuyo real)
git config user.name  >/dev/null || git config user.name  "$USUARIO"
git config user.email >/dev/null || git config user.email "$(gh api user -q .id)+$USUARIO@users.noreply.github.com"

git add -A
git commit -q -m "$MSG" || echo "(no había cambios nuevos para guardar)"

if git remote get-url origin >/dev/null 2>&1; then
  git push -q
else
  gh repo create "$REPO" --public --source=. --remote=origin --push
  gh api -X POST "repos/$USUARIO/$REPO/pages" -f 'source[branch]=main' -f 'source[path]=/' >/dev/null \
    || echo "No pude activar Pages solo: activalo en Settings > Pages > Branch: main"
fi

echo
echo "Listo. El juego queda en:  https://$USUARIO.github.io/$REPO/"
echo "(la primera vez tarda 1-2 minutos en aparecer; los parches, menos de un minuto)"
