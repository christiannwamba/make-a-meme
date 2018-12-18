import React from 'react';
import './Hero.css'

export default () => (
  <section className="hero is-dark">
    <div className="hero-body">
      <div className="container">
        <h1 className="title">Make a MEME</h1>
        <h2 className="subtitle">Make a Meme and tell a friend</h2>
        <div> 
          <h5 className="subtitle is-6">Spread the word
            <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A//christiannwamba.github.io/make-a-meme/" class="button is-small is-link">
              <span>Facebook</span>
            </a>
            <a href="https://twitter.com/home?status=Make%20your%20own%20memes%20on%20https%3A//christiannwamba.github.io/make-a-meme/" class="button is-small is-info ">
              <span>Twitter</span>
            </a>
          </h5>
        </div>
      </div>
    </div>
  </section>
);
