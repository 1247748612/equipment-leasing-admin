const files = require.context('.', false, /\.(vue|tsx)$/)
const generators = files.keys().map(key => files(key).default)

const components: any = {
}
generators.forEach((component) => {
  components[component.name] = component
})

export default components
