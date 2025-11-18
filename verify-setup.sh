#!/bin/bash

# Todo App - Project Setup Verification Script
# This script verifies all required files are in place

echo "🔍 Verifying Todo App Project Structure..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

verify_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        return 0
    else
        echo -e "${RED}✗${NC} $1"
        return 1
    fi
}

verify_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
        return 0
    else
        echo -e "${RED}✗${NC} $1/"
        return 1
    fi
}

count=0
errors=0

echo "📁 Directories:"
verify_dir "src/app/core/services" && ((count++)) || ((errors++))
verify_dir "src/app/core/guards" && ((count++)) || ((errors++))
verify_dir "src/app/core/models" && ((count++)) || ((errors++))
verify_dir "src/app/features/todos/todo-list" && ((count++)) || ((errors++))
verify_dir "src/app/features/todos/todo-item" && ((count++)) || ((errors++))
verify_dir "src/app/features/todos/todo-form" && ((count++)) || ((errors++))
verify_dir "src/app/features/about" && ((count++)) || ((errors++))
verify_dir "src/app/features/settings" && ((count++)) || ((errors++))
verify_dir "src/app/shared/components/header" && ((count++)) || ((errors++))
verify_dir "src/app/shared/components/footer" && ((count++)) || ((errors++))
verify_dir "src/app/shared/ui" && ((count++)) || ((errors++))
verify_dir "src/environments" && ((count++)) || ((errors++))

echo ""
echo "📄 Core Files:"
verify_file "src/app/core/models/todo.model.ts" && ((count++)) || ((errors++))
verify_file "src/app/core/services/todo.service.ts" && ((count++)) || ((errors++))
verify_file "src/app/core/services/auth.service.ts" && ((count++)) || ((errors++))
verify_file "src/app/core/guards/auth.guard.ts" && ((count++)) || ((errors++))

echo ""
echo "🎨 Component Files:"
verify_file "src/app/features/todos/todo-list/todo-list.component.ts" && ((count++)) || ((errors++))
verify_file "src/app/features/todos/todo-list/todo-list.component.html" && ((count++)) || ((errors++))
verify_file "src/app/features/todos/todo-list/todo-list.component.css" && ((count++)) || ((errors++))
verify_file "src/app/features/todos/todo-item/todo-item.component.ts" && ((count++)) || ((errors++))
verify_file "src/app/features/todos/todo-item/todo-item.component.html" && ((count++)) || ((errors++))
verify_file "src/app/features/todos/todo-item/todo-item.component.css" && ((count++)) || ((errors++))
verify_file "src/app/features/todos/todo-form/todo-form.component.ts" && ((count++)) || ((errors++))
verify_file "src/app/features/todos/todo-form/todo-form.component.html" && ((count++)) || ((errors++))
verify_file "src/app/features/todos/todo-form/todo-form.component.css" && ((count++)) || ((errors++))
verify_file "src/app/features/about/about.component.ts" && ((count++)) || ((errors++))
verify_file "src/app/features/settings/settings.component.ts" && ((count++)) || ((errors++))

echo ""
echo "🎯 Shared Components:"
verify_file "src/app/shared/components/header/header.component.ts" && ((count++)) || ((errors++))
verify_file "src/app/shared/components/header/header.component.html" && ((count++)) || ((errors++))
verify_file "src/app/shared/components/header/header.component.css" && ((count++)) || ((errors++))
verify_file "src/app/shared/components/footer/footer.component.ts" && ((count++)) || ((errors++))
verify_file "src/app/shared/ui/styles.css" && ((count++)) || ((errors++))

echo ""
echo "🧪 Test Files:"
verify_file "src/app/core/services/todo.service.spec.ts" && ((count++)) || ((errors++))
verify_file "src/app/features/todos/todo-list/todo-list.component.spec.ts" && ((count++)) || ((errors++))

echo ""
echo "📚 Root Files:"
verify_file "src/app/app.component.ts" && ((count++)) || ((errors++))
verify_file "src/app/app.routes.ts" && ((count++)) || ((errors++))
verify_file "src/main.ts" && ((count++)) || ((errors++))
verify_file "src/styles.css" && ((count++)) || ((errors++))
verify_file "src/environments/environment.ts" && ((count++)) || ((errors++))

echo ""
echo "📖 Documentation:"
verify_file "README.md" && ((count++)) || ((errors++))
verify_file "DEMO_SCRIPT.md" && ((count++)) || ((errors++))

echo ""
echo "═══════════════════════════════════════════════"
echo -e "${GREEN}✓ Files verified: $count${NC}"
if [ $errors -eq 0 ]; then
    echo -e "${GREEN}✓ All files present!${NC}"
else
    echo -e "${RED}✗ Missing files: $errors${NC}"
fi
echo "═══════════════════════════════════════════════"
echo ""
echo "📋 Next Steps:"
echo "1. Run: npm install"
echo "2. Run: npm start"
echo "3. Open: http://localhost:4200"
echo "4. See DEMO_SCRIPT.md for testing instructions"
echo ""
