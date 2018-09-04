#!/usr/bin/env python3
from pathlib import Path
from string import Template
from subprocess import call


ROOT = Path(__file__).parent.parent
TEMPLATE_FILE = ROOT / 'templates' / 'index.html'
STATIC_FILES = ROOT / 'build' / 'static'
INDEX = ROOT / 'build' / 'index.html'


if __name__ == '__main__':
    ret = call(['yarn', 'build'], cwd=str(ROOT))

    files = {}
    for file in STATIC_FILES.glob('**/*.*'):
        files[file.suffix] = file.name

    assert '.js' in files and '.css' in files

    with TEMPLATE_FILE.open() as f:
        template = Template(f.read())

    with INDEX.open(mode='w') as f:
        f.write(
            template.substitute(
                css_file=files['.css'],
                js_file=files['.js'],
            )
        )
