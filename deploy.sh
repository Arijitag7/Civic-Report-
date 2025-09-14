#!/bin/bash

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Static files generated in 'out' directory"
    echo "🚀 Ready for deployment to GitHub Pages"
else
    echo "❌ Build failed!"
    exit 1
fi
