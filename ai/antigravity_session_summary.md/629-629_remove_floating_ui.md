# 2026/06/29 - Remove `@floating-ui/dom` dependency

## Overview
The `@floating-ui/dom` logic was already removed from `src/design/overlays/components/dropdown-menu/dropdown-menu.client.ts` in favor of a native DOM fallback, but the package was still installed in the project. This session uninstalled the package and cleaned up the dependencies.

## Changes Made
* Executed `pnpm remove @floating-ui/dom` to remove the package.
* Confirmed it was not being used anywhere else in the project.

## Affected Files
* `package.json`
* `pnpm-lock.yaml`
