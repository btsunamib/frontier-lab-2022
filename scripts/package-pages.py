"""Prepare reproducible Pages assets and the local HTTP connector download."""
from pathlib import Path
import shutil,zipfile
root=Path(__file__).resolve().parents[1]
dist=root/'dist';(dist/'.nojekyll').touch();downloads=dist/'downloads';downloads.mkdir(exist_ok=True)
with zipfile.ZipFile(downloads/'frontier-lab-local.zip','w',zipfile.ZIP_DEFLATED) as archive:
 for name in ['start-local.py','start-windows.bat','LOCAL_README.md']:archive.write(root/name,name)
 for path in sorted(dist.rglob('*')):
  if path.is_file() and 'downloads' not in path.relative_to(dist).parts:archive.write(path,path.relative_to(root).as_posix())
shutil.rmtree(root/'docs',ignore_errors=True)
shutil.copytree(dist,root/'docs')
print('Pages files and local connector package ready.')
