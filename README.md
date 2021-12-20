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
          repo: ${{ github.event.repository.name }}
          token: ${{ secrets.MY_TOKEN }}
```
