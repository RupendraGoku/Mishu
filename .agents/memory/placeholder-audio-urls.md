---
name: Placeholder audio CDN URLs
description: mixkit.co "preview" audio/music URLs are not hotlinkable and return 403 in production embeds — do not use them as real asset sources.
---

Design subagents sometimes fill music/SFX config fields with URLs like
`https://assets.mixkit.co/music/preview/...mp3` or `.../sfx/preview/...mp3`.
These are browse-page preview links, not stable public asset URLs — direct
requests return `403` (CloudFront/S3 origin block), so audio silently fails
to load in the built app.

**Why:** Discovered when a freshly built site had 8 dead audio references,
all 403ing at runtime with no visible error in the UI.

**How to apply:** When a build includes placeholder/royalty-free audio URLs
from mixkit or similar sample libraries, verify with a quick `curl -I` before
trusting them. If dead, use `generateMusic` / `generateSoundEffect` (media
generation skill) to create real local audio files under
`attached_assets/generated_audio/`, copy them into the artifact's `public/`
dir, and reference them via `${import.meta.env.BASE_URL}...` so they resolve
correctly under the artifact's base path.
