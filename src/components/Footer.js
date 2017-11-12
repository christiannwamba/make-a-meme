import React from 'react';
import './Footer.css';

export default () => (
  <footer className="footer">
    <div className="container">
      <div className="content has-text-centered">
        <p>
          <strong>Make a MEME</strong> by{' '}
          <a href="https://twitter.com/codebeast">Codebeast</a>. The source code
          is <a href="">open</a> and {' '}
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a> licensed.
        </p>
        <p>
          This website and the meme functionalities are powered by {' '}
          <a href="https://cloudinary.com">
            Cloudinary
          </a>.
        </p>
      </div>
    </div>
  </footer>
);
