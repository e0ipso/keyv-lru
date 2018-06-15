<!--
  This file was generated by emdaer

  Its template can be found at .emdaer/README.emdaer.md
-->

<!--
  emdaerHash:6e0028e7e9d03a3872442c14dd5ccf5d
-->

<h1 id="keyv-lru-redis-img-align-right-src-logo-svg-alt-contenta-logo-title-contenta-logo-width-100-">Keyv LRU - Redis <img align="right" src="./logo.svg" alt="Contenta logo" title="Contenta logo" width="100"></h1>
<p>This project is part of the <a href="https://www.npmjs.com/package/keyv">Keyv</a> suite.</p>
<!-- toc -->
<ul>
<li><a href="#installation">Installation</a><ul>
<li><a href="#install">Install</a></li>
</ul>
</li>
<li><a href="#features">Features</a></li>
<li><a href="#usage">Usage</a></li>
<li><a href="#contributors">Contributors</a></li>
<li><a href="#license">License</a></li>
</ul>
<!-- tocstop -->
<p><a href="https://travis-ci.com/e0ipso/keyv-lru/"><img src="https://img.shields.io/travis/e0ipso/keyv-lru.svg?style=flat-square" alt="Travis"></a> <a href="https://coveralls.io/github/e0ipso/keyv-lru/"><img src="https://img.shields.io/coveralls/github/e0ipso/keyv-lru.svg?style=flat-square" alt="Coverage"></a> <a href="https://github.com/emdaer/emdaer"><img src="https://img.shields.io/badge/📓-documented%20with%20emdaer-F06632.svg?style=flat-square" alt="Documented with emdaer"></a></p>
<h2 id="installation">Installation</h2>
<p>In order to use LRU as your store in Keyv you will need to:</p>
<h3 id="install">Install</h3>
<p>Install this module in your project:</p>
<pre><code>
yarn add keyv-lru
</code></pre>
<h2 id="features">Features</h2>
<p>This module is based on the <a href="https://www.npmjs.com/package/tiny-lru"><code>tiny-lru</code></a>
module. This is one of the <a href="https://github.com/dominictarr/bench-lru#results">best performing libraries for LRU storages</a>.</p>
<h2 id="usage">Usage</h2>
<p>Create your Keyv object by executing:</p>

```js
const options = {
  notify: false,
  ttl: 0,
  expire: 0,
};
const keyvLru = new KeyvLru(max, options);
```
<p>See <a href="https://www.npmjs.com/package/tiny-lru"><code>tiny-lru</code></a> to learn about the
available options.</p>
<h2 id="contributors">Contributors</h2>
<details>
<summary><strong>Contributors</strong></summary><br>
<a title="Engineer and programmer focused on online applications." href="https://github.com/e0ipso">
  <img align="left" src="https://avatars0.githubusercontent.com/u/1140906?s=24">
</a>
<strong>Mateu Aguiló Bosch</strong>
<br><br>
</details>

<h2 id="license">License</h2>
<p>keyv-lru is <a href="./LICENSE">MIT licensed</a>.</p>
