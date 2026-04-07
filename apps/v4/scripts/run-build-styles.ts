// Standalone runner for buildStyles — used to test the codegen in isolation
// without running the full registry build pipeline. Safe to delete after
// verification, or keep as a fast incremental rebuild entrypoint.
import { buildStyles } from './lib/build-styles'

buildStyles().catch((err) => {
  console.error('❌ buildStyles failed:', err)
  process.exit(1)
})
