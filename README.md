# BookMatch
An app for finding interesting books to read.

## Stack
- Database, Auth & Edge-Functions: [supabase](https://supabase.com/)
- Frontend: [Svelte & SvelteKit](https://svelte.dev/)
  - Styles: [Tailwind CSS](https://tailwindcss.com/)
- Deployment: [Netlify](https://www.netlify.com/)

## Development
### Setting up Supabase
First setup a supabase project (or run one
[locally](https://supabase.com/docs/reference/cli/supabase-start)). After doing
that put it's URL and key into the `.env` file (an example can be found in
`.env.example`).

### Scripts
This project uses pnpm v10.8.0 as the package manager. It can be installed with
corepack or alternatively via nix (`flake.nix` provides a dev-shell).

To install dependencies run:
```sh
pnpm install
```

Useful scripts include:
```sh
pnpm dev   # run in watch mode
pnpm build # build the app
pnpm check # run type-check
pnpm lint  # run the linter (eslint)
pnpm fmt   # format the code (prettier)
```
