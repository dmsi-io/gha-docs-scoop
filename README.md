# gha-docs-scoop

The purpose of this GitHub Action is to automate the publishing of documentation from internal repos.

### Usage

```yaml
name: Documentation Update

on:
  push:
    branches:
      - main

jobs:
  publish:
    name: Update Doc
    runs-on: ubuntu-latest
    steps:
      - name: Update Doc
        uses: dmsi-io/gha-docs-scoop@main
        with:
          token: ${{ secrets.MY_TOKEN }}
```

### Optional Params

#### repo

Name of the repo to as it should be listed in the docs site.

Default: ${{ github.event.repository.name }}

```yaml
with:
  repo: 'my-special-repo'
```
