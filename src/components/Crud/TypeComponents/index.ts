export default function findComponent() {
  const files = require.context('.', false, /\.vue$/)
  const files1 = require.context('./', false)
  const files2 = require.context('..', false)
  const components: any = {
  }
  files.keys().forEach(
    (key) => {
      const contextValue = files(key).default
      const name = contextValue && contextValue.options && contextValue.options.name
      components[name] = contextValue
    }
  )
  return components
}
