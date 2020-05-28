const files = require.context('.', false, /\.vue$/)
const generators = files.keys().map(key => files(key).default)

const components: any = {
  CrudDate: null,
  CrudNumber: null
}
generators.forEach((component) => {
  components[component.name] = component
})

export default components
