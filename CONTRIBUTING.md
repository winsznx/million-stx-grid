# Contributing

Thanks for your interest in improving The Million STX Grid.

## Setup
```
pnpm install
pnpm turbo run build
```

## Development
- Web app: `pnpm --filter web dev`
- SDK rebuild on demand: `pnpm --filter @winsznx/stx-canvas-client build`
- Painter dry run: `pnpm painter --image ./path.png --dry-run`

## Tests
```
pnpm turbo run test
```

## Commit style
Follow Conventional Commits: `feat(scope): ...`, `fix(scope): ...`, `chore: ...`, etc. Keep commits atomic — one logical change per commit.

## Reporting bugs
Open an issue using the bug report template. Include the network, wallet, and exact reproduction steps.
