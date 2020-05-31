export default function findComponent() {
  const files = require.context('.', false, /\.vue$/)
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
