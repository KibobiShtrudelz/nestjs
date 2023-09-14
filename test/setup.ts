import { join } from 'path'
import { rm } from 'fs/promises'

global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'))
  } catch (error) {}
})
