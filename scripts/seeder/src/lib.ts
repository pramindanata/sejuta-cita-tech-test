import { spawn } from 'child_process';

export enum ExitCode {
  One = 1,
  Zero = 0,
}

export async function executeInPodCommandBatch(
  options: Options,
): Promise<void> {
  const { command, podLabels, setProcessTitle } = options;
  const kubectlCommand = process.env.KUBECTL_COMMAND;
  const getPodsInfoCommand = `${kubectlCommand} get pods`;
  const podsInformation = await executeCommand(getPodsInfoCommand);
  const podNames = getPodNames(podLabels, podsInformation);

  for (const podName of podNames) {
    const seedCommand = `${kubectlCommand} exec -t ${podName} -- ${command}`;
    const title = setProcessTitle(podName);

    console.log(title);
    const outputText = await executeCommand(seedCommand);
    console.log(outputText);
  }
}

export function getPodNames(
  appLabels: string[],
  podsInformation: string,
): string[] {
  const podNames: string[] = [];

  for (const label of appLabels) {
    const regex = new RegExp(`(${label}\\S+)`, 'g');
    const match = podsInformation.match(regex);

    if (!match || !match[0]) {
      throw new PodNameForLabelNotFoundError(label);
    }

    podNames.push(match[0]);
  }

  return podNames;
}

export function executeCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let successText = '';
    let errorText = '';

    const process = spawn(command, {
      shell: true,
    });

    process.on('close', () => {
      if (errorText) {
        const error = new ProcessFailError(errorText);

        return reject(error);
      }

      if (!successText) {
        const error = new NoBufferOnProcessError();

        return reject(error);
      }

      return resolve(successText);
    });

    process.stderr.on('data', (buffer) => {
      errorText += buffer.toString();
    });

    process.stdout.on('data', (buffer) => {
      successText += buffer.toString();
    });
  });
}

export class PodNameForLabelNotFoundError extends Error {
  constructor(label: string) {
    super(`Pod name for label "${label}" is not found.`);
  }
}

export class NoBufferOnProcessError extends Error {
  constructor() {
    super(`Process is not returning any buffer, something wrong here.`);
  }
}

export class ProcessFailError extends Error {
  constructor(private errorText: string) {
    super(`Process fail. Error:\n${errorText}`);
  }

  getText(): string {
    return this.errorText;
  }
}

interface Options {
  podLabels: string[];
  command: string;
  setProcessTitle: (podName: string) => string;
}
