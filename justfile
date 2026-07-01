set shell := ["zsh", "-ic"]

# Daily Cleanup
[group('pnpm')]
clean:
    pnpm clean:daily

# Output dtree of the current directory
[group('ctxt')]
dtree:
    dtree

# create a directory_index.md file for the current directory
[group('ctxt')]
admd:
    admd .

# Open Claude Code in the current repo
[group('ai--')]
claude:
    claude

# Open the repo's GitHub page in the browser
[group('chro')]
gh-repo:
    #!/usr/bin/env bash
    set -euo pipefail
    # Convert the SSH remote URL (git@github.com:...) to an https:// URL and strip the trailing .git
    remote=$(git config --get remote.origin.url | sed -E 's#git@github.com:~/https://github.com/#; s#\.git$##')
    xdg-open "$remote"

# Fuzzy-pick a branch (local or remote) and check it out
[group('git-')]
g-branch:
    #!/usr/bin/env bash
    set -euo pipefail
    # List all branches, strip the leading "* " / spaces, then pick one with fzf
    branch=$(git branch -a | sed 's/^[* ]*//' | fzf --prompt="Branch > ")
    # Drop the "remotes/origin/" prefix so checkout creates/tracks the right branch
    [ -n "$branch" ] && git checkout "${branch##remotes/origin/}"

# Browse the last 30 commits with a graph + diff preview
[group('git-')]
g-log:
    # fzf preview extracts the commit hash from the selected line and runs git show on it
    git log --oneline --graph --decorate -30 | fzf --prompt="Log > " --preview 'git show $(echo {} | grep -o "[a-f0-9]\{7,\}" | head -1)'

# add, commit
[group('git-')]
g-commit:
    #!/usr/bin/env bash
    set -euo pipefail
    git status --short
    echo
    read -rp "Commit message: " msg
    [ -n "$msg" ] || {
        echo "Commit message required"
        exit 1
    }
    git add .
    git commit -m "$msg"
    

# Deploy to Cloudflare via Wrangler
[group('dply')]
d-cloudflare:
    wrangler deploy

# Deploy to Netlify production
[group('dply')]
d-netlify:
    netlify deploy --prod

# Wipe node_modules + lockfile and reinstall dependencies from scratch
[group('proj')]
reset:
    rm -rf node_modules pnpm-lock.yaml && pnpm install

# Run typecheck and lint together
[group('pnpm')]
check:
    pnpm astro check && pnpm lint

# Run dev server
[group('pnpm')]
dev:
    pnpm dev

# Watch .ts/.astro files and re-run check on every change
[group('proj')]
watch:
    watchexec -e ts,tsx,astro -- just check
    
# Fuzzy-find any file in the repo and open it in default editor, with a syntax-highlighted preview
[group('file')]
f-edit:
    #!/usr/bin/env bash
    set -euo pipefail
    file=$(find . -type f -not -path './node_modules/*' -not -path './.git/*' | fzf --prompt="Edit > " --preview 'bat --color=always --style=numbers {}')
    [ -n "$file" ] && xdg-open "$file"
    
# Fuzzy-search recent zsh history and re-run whatever you pick
[group('zsh-')]
z-hist:
    #!/usr/bin/env zsh
    set -euo pipefail
    cmd=$(tac ~/.zsh_history | sed -E 's/^: [0-9]+:[0-9]+;//' | fzf --prompt="History > " --no-sort)
    [[ -n "$cmd" ]] && eval "$cmd"
    
# Kill whatever's listening on the given port
[group('proj')]
port-kill:
    #!/usr/bin/env bash
    set -euo pipefail
    
    # This line pauses the terminal and waits for you to type
    read -p "🔌 Enter Port Number: " PORT
    
    # Exit safely if you press Enter without typing anything
    [ -z "$PORT" ] && exit 0
    
    pid=$(lsof -ti tcp:$PORT || true)
    if [ -n "$pid" ]; then
        kill -9 $pid
        echo "Killed process on port $PORT (pid $pid)"
    else
        echo "Nothing listening on port $PORT"
    fi
    
# Find TODO/FIXME comments across the codebase
[group('proj')]
todo:
    grep -rn --exclude-dir=node_modules --exclude-dir=.git -E 'TODO|FIXME' --include='*.ts' --include='*.astro' --include='*.css' . || echo "No TODOs found"
    
# Check for outdated pnpm dependencies
[group('pnpm')]
outdated:
    pnpm outdated
    
# Auto-fix lint and formatting issues
[group('pnpm')]
lint-fix:
    pnpm lint --fix

# Generate component status list and verification checklist
[group('proj')]
component-status:
    pnpm status:components

# Auto-fix lint issues, then hand any leftovers to Claude Code
[group('proj')]
lint-fix-ai:
	#!/usr/bin/env bash
	set -euo pipefail
	pnpm lint --fix || true
	if ! output=$(pnpm lint 2>&1); then
	    echo "$output" | claude -p "Fix these lint/type errors in this project"
	else
	    echo "Lint is clean."
	fi

[group('proj')]
import-recipe:
    #!/usr/bin/env bash
    set -euo pipefail
    
    # 1. Ensure your library directory exists
    if [ ! -d "$HOME/.just" ]; then
        echo "Error: Library directory ~/.just not found."
        exit 1
    fi

    # 2. Pick the bundle file from your library
    BUNDLE=$(ls -1 ~/.just | fzf --prompt="📦 Select Bundle > ")
    [ -z "$BUNDLE" ] && exit 0

    # 3. Read the file and find all the available recipe names inside it
    # We use the same grep logic from our universal launcher to find the names!
    AVAILABLE_RECIPES=$(grep -E '^[a-zA-Z0-9_-]+:' "$HOME/.just/$BUNDLE" | sed 's/://g' | awk '{print $1}')
    
    # 4. Pick the specific recipe(s) using fzf multi-select (-m)
    SELECTED=$(echo -e "$AVAILABLE_RECIPES" | fzf -m --prompt="🎯 Select recipe(s) to extract (Tab) > ")
    [ -z "$SELECTED" ] && exit 0

    # 5. Extract ONLY the selected recipes using awk and append them to your justfile
    echo "" >> justfile
    echo "$SELECTED" | while read -r recipe; do
        awk -v target="$recipe:" '
            # Temporarily save [group] tags in case the target recipe is next
            /^\[group/ { prev_group=$0; next }
            
            # When we hit a recipe name...
            /^[a-zA-Z0-9_-]+:/ {
                # If it is the one we want, turn on printing and print the group tag first
                if ($1 == target) {
                    in_block=1
                    if (prev_group) print prev_group
                    print $0
                } else {
                    # If it is a different recipe, turn printing off
                    in_block=0
                }
                prev_group=""
                next
            }
            
            # Print all standard lines if we are inside the target block
            in_block { print }
        ' "$HOME/.just/$BUNDLE" >> justfile
        
        echo "" >> justfile
        echo "✅ Extracted $recipe from $BUNDLE!"
    done

# @recipe: todo-scan
# @desc: Find TODO/FIXME comments across the codebase
[group('project')]
todo-scan:
    grep -rn --exclude-dir=node_modules --exclude-dir=.git -E 'TODO|FIXME' --include='*.ts' --include='*.astro' --include='*.css' . || echo "No TODOs found"


# @recipe: history
# @desc: Fuzzy-search recent zsh history and re-run whatever you pick
[group('shell')]
history:
    #!/usr/bin/env zsh
    set -euo pipefail
    cmd=$(tac ~/.zsh_history | sed -E 's/^: [0-9]+:[0-9]+;//' | fzf --prompt="History > " --no-sort)
    [[ -n "$cmd" ]] && eval "$cmd"

# Added by jk publish
git-push_super:
    #!/usr/bin/env bash
    git add .
    read -p "Enter commit message: " msg
    if [ -n "$msg" ]; then
        git commit -m "$msg"
        git push --follow-tags
    else
        echo "Commit cancelled (empty message)."
    fi
