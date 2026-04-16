export interface PainterEnv {
  privateKey: string | undefined;
  contractDeployer: string | undefined;
  contractName: string;
}

export function loadPainterEnv(): PainterEnv {
  return {
    privateKey: process.env.PAINTER_PRIVATE_KEY,
    contractDeployer: process.env.PAINTER_CONTRACT_DEPLOYER,
    contractName: process.env.PAINTER_CONTRACT_NAME ?? "stx-canvas",
  };
}

export function requirePainterEnv(): Required<PainterEnv> {
  const env = loadPainterEnv();
  if (!env.privateKey) throw new Error("PAINTER_PRIVATE_KEY is required for live broadcasts");
  if (!env.contractDeployer) throw new Error("PAINTER_CONTRACT_DEPLOYER is required for live broadcasts");
  return env as Required<PainterEnv>;
}
