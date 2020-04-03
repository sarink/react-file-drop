# react-file-drop changelog

### v3.0.0

- Upgrade all dependencies (most notably, react and typescript)
- Export FileDrop as a named const (instead of default export)
- Update window existence checks (for SSR)
- Refactor source to use eslint and prettier

### v0.2.0

- Rewrite in Typescript
- Add React 16 support
- Add IE 11 support
- Add file-type-checking (only allow dragging/dropping of actual files, according to event.dataTransfer.types)
- Remove functionality where user can "cancel" a drag event on the frame
- Remove AMD/standalone support (I think the time has come)
- Remove disableDoubleDrop prop
- Remove targetAlwaysVisible prop

### v0.1.0

- The original. You should definitely upgrade.
