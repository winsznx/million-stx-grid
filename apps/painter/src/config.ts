export interface PainterConfig {
  contractDeployer: string;
  contractName: string;
  privateKey: string;
  delayMs: number;
  dryRun: boolean;
}

export function loadConfigFromEnv(): Partial<PainterConfig> {
  return {
    contractDeployer: process.env.PAINTER_CONTRACT_DEPLOYER,
    contractName: process.env.PAINTER_CONTRACT_NAME ?? "stx-canvas",
    privateKey: process.env.PAINTER_PRIVATE_KEY,
  };
}
