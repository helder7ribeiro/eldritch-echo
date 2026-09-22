/**
 * Ponte de hot reload para JavaScript.
 *
 * O servidor do Foundry observa os arquivos e emite o evento `hotReload`, mas
 * o cliente (Game##handleHotReload) só sabe tratar css, hbs/html e json — ele
 * ignora js/mjs. O Hook `hotReload` dispara ANTES desse switch, então dá para
 * interceptar a mudança de script e recarregar a página sozinho.
 *
 * Exige `js` em flags.hotReload.extensions no manifesto do pacote observado
 * (tanto o módulo quanto o fork do CoC7 já declaram).
 */
import { MODULE_ID } from './main.js'

let pending = null

Hooks.on('hotReload', data => {
  if (!['js', 'mjs'].includes(data.extension)) return // css/hbs/json: deixa o core cuidar

  if (game.settings?.get(MODULE_ID, 'autoReloadOnScript') === false) return false

  // O webpack escreve o bundle em várias passadas; espera assentar.
  clearTimeout(pending)
  pending = setTimeout(() => {
    console.log(`${MODULE_ID} | ${data.packageId}/${data.path} mudou — recarregando`)
    window.location.reload()
  }, 750)

  return false
})
