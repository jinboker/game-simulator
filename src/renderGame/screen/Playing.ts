import { Player } from '..'
import { core } from 'src/core'
import { clearCanvas } from 'src/utils'
import { ScreenRenderer } from './ScreenRenderer'

export class Playing extends ScreenRenderer {
  protected operate = {
    A() {
      core.isStop = !core.isStop
    }
  }

  constructor() {
    super('playing')

    new Player()
  }

  render() {
    clearCanvas(['role', 'other'])
  }
}
