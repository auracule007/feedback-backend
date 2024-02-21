This file is part of our feedback


git lfs install
git lfs track "*.mp4"
git add .gitattributes
git commit -m "new commit"
git lfs migrate import --include="*.mp4"
git push --force  