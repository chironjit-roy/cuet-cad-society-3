import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schema'

export default defineConfig({
  name: 'default',
  title: 'CUET CAD Club CMS',
  
  projectId: 'dmupx62x', // Replace with your Sanity project ID
  dataset: 'production',
  
  plugins: [
    structureTool(),
    visionTool()
  ],
  
  schema: {
    types: schemaTypes,
  },
})
