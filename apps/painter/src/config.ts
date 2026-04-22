/**
 * Configuration interface for the STX Canvas Painter application.
 */
export interface PainterConfig {
  /** The Stacks address that deployed the canvas contract. */
  contractDeployer: string;
  /** The name of the canvas contract (e.g., "stx-canvas"). */
  contractName: string;
  /** The private key used to sign transactions for painting. */
  privateKey: string;
  /** Delay in milliseconds between consecutive paint transactions. */
  delayMs: number;
  /** If true, simulates painting without broadcasting transactions. */
  dryRun: boolean;
}

/**
 * Loads configuration values from environment variables.
 * @returns A partial PainterConfig object containing values found in the environment.
 */
export function loadConfigFromEnv(): Partial<PainterConfig> {
  return {
    contractDeployer: process.env.PAINTER_CONTRACT_DEPLOYER,
    contractName: process.env.PAINTER_CONTRACT_NAME ?? "stx-canvas",
    privateKey: process.env.PAINTER_PRIVATE_KEY,
  };
}
