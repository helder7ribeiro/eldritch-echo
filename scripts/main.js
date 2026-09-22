/**
 * Eldrich Echo — extensões próprias para o sistema Call of Cthulhu 7th Edition.
 *
 * Tudo aqui é feito de fora do sistema: nada neste módulo exige alterar o
 * fork do CoC7. Quando algo só for possível mexendo no core, aí sim vai
 * para o fork.
 */
import './dev-reload.js'

export const MODULE_ID = 'eldrich-echo'
const SYSTEM_ID = 'CoC7'

function log (...args) {
  console.log(`${MODULE_ID} |`, ...args)
}

Hooks.once('init', () => {
  // Os esmodules do sistema carregam antes dos do módulo, então neste ponto
  // game.CoC7 ainda não existe (ele nasce no hook init do próprio sistema).
  game.modules.get(MODULE_ID).api = {}

  game.settings.register(MODULE_ID, 'autoReloadOnScript', {
    name: 'ELDRICHECHO.Settings.AutoReload.Name',
    hint: 'ELDRICHECHO.Settings.AutoReload.Hint',
    scope: 'client',
    config: true,
    type: Boolean,
    default: true
  })

  log('init')
})

Hooks.once('setup', () => {
  if (game.system.id !== SYSTEM_ID) {
    return ui.notifications.error(`${MODULE_ID} requer o sistema ${SYSTEM_ID}.`)
  }

  // APIs de registro públicas do CoC7 (coc7/hooks/init.js).
  // Descomente conforme for criando conteúdo próprio:
  // game.CoC7.eras('eldrichEcho', 'ELDRICHECHO.Era.Name', 'fa-solid fa-anchor')
  // game.CoC7.journalStyle('eldrich-noir', 'ELDRICHECHO.JournalStyle.Noir')

  log('setup — sistema', game.system.id, game.system.version)
})

Hooks.once('ready', () => {
  log(`pronto sobre ${game.system.title} ${game.system.version} (Foundry ${game.version})`)
})

// Hooks próprios do CoC7 — esta é a lista completa na versão 8.15.
Hooks.on('occupationFinishedCoC7', actor => log('ocupação concluída', actor?.name))
Hooks.on('archetypeFinishedCoC7', actor => log('arquétipo concluído', actor?.name))
Hooks.on('setupFinishedCoC7', actor => log('setup concluído', actor?.name))
Hooks.on('messageUpdatedCoC7', message => log('mensagem atualizada', message?.id))
