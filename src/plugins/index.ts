import path from 'path'
const files = require.context('./modules', false, /\.(j|t)s$/)
files.keys().forEach(async key => import('.' + path.join('/modules', key)))
