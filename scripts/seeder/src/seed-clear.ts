import dotenv from 'dotenv';
import { executeCommand, ExitCode, getPodNames } from './lib';

dotenv.config();

main().catch((err) => {
  console.error(err);
  process.exit(ExitCode.One);
});

async function main(): Promise<void> {
  const appLabels = ['auth-service', 'user-service'];
  const kubectlCommand = process.env.KUBECTL_COMMAND;

  const getPodsInfoCommand = `${kubectlCommand} get pods`;
  const podsInformation = await executeCommand(getPodsInfoCommand);
  const podNames = getPodNames(appLabels, podsInformation);

  for (const podName of podNames) {
    const seedCommand = `${kubectlCommand} exec -t ${podName} -- npm run seed:clear`;

    // TODO: Replace pod name with label
    console.log(`---Clearing ${podName}---`);
    const outputText = await executeCommand(seedCommand);
    console.log(outputText);
  }
}
