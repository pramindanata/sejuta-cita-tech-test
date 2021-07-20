import dotenv from 'dotenv';

dotenv.config();

import podLabels from './pod-labels';
import { executeInPodCommandBatch, ExitCode } from './lib';

executeInPodCommandBatch({
  podLabels,
  command: 'npm run seed:clear',
  setProcessTitle: (podName) => `# Clearing ${podName}`,
}).catch((err) => {
  console.error(err);
  process.exit(ExitCode.One);
});
