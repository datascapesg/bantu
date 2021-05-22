import { readJSON, writeJSON } from 'https://deno.land/x/flat@0.0.10/mod.ts' 

const toName = ({ name }) => name


// Read the downloaded_filename JSON
const { data } = await readJSON(Deno.args[0])

// Rework data, cleaning up tags and categories to be simple string arrays
const cleanedData = data.map(d => {
  const { tags, categories, skills } = d
  return {
    ...d,
    tags: tags.map(toName),
    skills: skills.map(toName),
    categories: categories.map(toName),
  }
})

// Write a new JSON file with our filtered data
await writeJSON(Deno.env.get('POSTPROCESS_FILENAME'), cleanedData)
console.log('Done.')
