import os from 'os';
import path from 'path';
import ghpages from 'gh-pages';

process.env.CACHE_DIR = path.join(os.tmpdir(), 'gh-pages-cache');

ghpages.publish('dist', {dotfiles: true, nojekyll: true}, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log('Published dist to gh-pages');
});