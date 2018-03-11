import uglify from 'uglify-js'
import { DEFAULTS } from './const'

import Plugin = PluginHelper.Plugin
import PluginOptions = PluginHelper.Options
import Options = PluginUglifyjs.Options

export default class PluginUglifyjs implements Plugin {
  constructor (public options: Options) {
    this.options = Object.assign({}, DEFAULTS, this.options)
  }

  async apply (pluginOptions: PluginOptions): Promise<string> {
    let { filter, config } = this.options
    let { src, code, output } = pluginOptions

    if (!filter.test(src)) {
      return Promise.resolve(code)
    }
    else {
      output('压缩', src)

      let result = uglify.minify(code, config)

      return Promise.resolve(result.code)
    }
  }
}
