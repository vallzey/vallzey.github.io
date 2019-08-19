/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/2018/02/04/管理github的star项目/FeelUOwn.png","b9f5ce79e6d258cca063ce752ca5abac"],["/2018/02/04/管理github的star项目/MyPerf4J.gif","877095b18ef6bdf252b7aadddba440e7"],["/2018/02/04/管理github的star项目/SPADE.gif","2017997518fbc21664861185b73da19d"],["/2018/02/04/管理github的star项目/arc_theme.png","4e170bb31868a7b76265d4290f3f0143"],["/2018/02/04/管理github的star项目/es6tutorial.jpg","714d000d4a58483cef4660130f21d987"],["/2018/02/04/管理github的star项目/index.html","34221102affd16137f8e69f826b2358f"],["/2018/02/06/Linux用户权限/index.html","441cdbef5e4b4b2146116caf6073574f"],["/2018/03/01/python基本模块/index.html","a230884b260f00b23d192fe114f9a72c"],["/2018/03/04/c语言内存分配/index.html","7b6a421443f5d1e0fda5a773a58e5eb8"],["/2018/03/04/c语言小笔记/index.html","c740477a29f0cabd8494b68864c7b58d"],["/2018/04/05/curl命令的使用/index.html","f4413cdbdb1226fc45a4d1e0e41e9da9"],["/2018/04/08/OSX相关命令/index.html","896f516f2f1d68eed6c13a87caf1f6ee"],["/2018/05/06/conda命令的使用/index.html","8053a99b69a4587d7b579c1f84344c52"],["/2018/05/19/int和Integer/index.html","28c4da13a121a7c6e71e310fc04d0680"],["/2018/05/22/对比Vector、ArrayList、LinkedList/all.jpg","3a82d69000c875ec5fc6a83a64b36f87"],["/2018/05/22/对比Vector、ArrayList、LinkedList/index.html","b4ba56352fc8a3e42b322207b783a288"],["/2018/06/06/Linux常用命令-长期更新/index.html","5ad5c77ed7e9968435d8627a5e8b48c2"],["/2018/07/03/Ubuntu桌面快捷设置/index.html","a40476660a8ce0aa8bab96db0c17336d"],["/2018/07/04/logging的使用/index.html","ec0a3e9f12b7957422c72ef0561ee0fb"],["/2018/07/04/markdown使用方法/index.html","eeaf364ba5b8b1601d36ec9a6a0ebacb"],["/2018/07/04/mongodb关于用户的操作/index.html","cd52a653647d3022c0b5ed7fce63e567"],["/2018/07/04/关于tcp客户端/index.html","34d6a0c75c70b75d85a0fd218f158876"],["/2018/07/04/配置zsh/index.html","3858e5275a7ee2627490a94ffd4f5431"],["/2018/07/20/CDH集群安装笔记/index.html","4c3cbe58e0f7dfb410d27e25ff205675"],["/2018/07/21/Kylin-在-CDH-中的安装/index.html","5f5899d1a45d5d357fa917fda43c44ba"],["/2018/08/09/STL标准模版库/index.html","597637315ec1594361e3f7893ade658d"],["/2018/08/22/KylinApi使用/index.html","866bc4c70777a1f20a8e26419dd36447"],["/2018/09/20/DataX实践/index.html","1a5729c1918c6722a27be1c497890387"],["/2018/10/12/selenium的使用/index.html","912de4d034a0c525e47d81747633d9ba"],["/2018/10/20/ConfigParser的使用/index.html","cf2980b31762130c877c9180f55d1c70"],["/2018/10/20/getopt的使用/index.html","0a79cbd011c6a7a2da1adf82070993cf"],["/2018/10/20/pymongo的简单使用案例/index.html","0550714b666523ab3dda4cb1b4771388"],["/2018/10/20/关于pandas的使用/index.html","82d0b0435985ba96add8299edb6d7c83"],["/2018/10/21/tensorflow的简单使用/index.html","962ba882a2536798d45ef796843d08c7"],["/2019/01/03/重新编译JVM/index.html","8f90231ac4224902c39ef3c1a22a625c"],["/2019/02/05/【工具篇】ASM：Java字节码框架/index.html","6e5218fb487ceac984f589c30055528a"],["/2019/02/07/【工具篇】javap命令/index.html","5811b657fd2a2869dcf8a01affc85405"],["/2019/02/22/ssh相关笔记/index.html","b4fb99f5549532daafe4642180e2e3aa"],["/2019/03/07/Java序列化/index.html","887d2c7ec357940f06cb3a1b2d8b2c77"],["/2019/03/14/mac安装测试redis/index.html","17fc866dbc748237aac5a0fbcb156bad"],["/2019/04/03/docker相关使用/index.html","3b4663f826967c7cf6d6be4452550101"],["/2019/04/03/谈谈fnal、fnally、-fnalize有什么不同/index.html","006b4284b3e1428c044922967b136377"],["/2019/04/10/强引用、软引用、弱引用、幻象引用/index.html","de971687b0598512f9402152e0ebc265"],["/2019/04/10/理解Java的字符串，String、StringBufer、StringBuilder/index.html","61baa436fd1fe07c6ff21f8b0620779d"],["/2019/05/13/supervisor的安装和使用/index.html","674ae395cabe9f484adcf07ac2aa61e9"],["/2019/07/02/3次握手和4次挥手/all.png","93913af58bb0e1a920a454b5a7c5e776"],["/2019/07/02/3次握手和4次挥手/index.html","c3645f6c4af2d811a30f06dfd0ee7d3b"],["/2019/07/03/【工具篇】OpenJDK项目CodeTools/index.html","7cd3578c2d7b54568ae3667f4369bf34"],["/2019/07/04/Redis简介/index.html","4b7c84351456b53ba1bc775db50f66ca"],["/2019/07/07/高性能MySQL/index.html","cf5a2a60516dd711fa22be82c084928c"],["/2019/07/07/高性能MySQL/mysql架构.png","6280d062c5c55165f22b7e09156642ab"],["/2019/07/20/DataX实践/index.html","2008120ad2a809810d46efd5a5474eee"],["/2019/07/20/DataX实践/plugin_dev_guide_1.png","04ea7a8c72fb585c36ac7e96dffb5b10"],["/2019/07/20/DataX实践/plugin_dev_guide_2.png","d9cafd799b54c469f9a249bae0011f3d"],["/2019/08/02/Hadoop的调度器/index.html","bfca7a21dbd0c808331e91f18f7c3baf"],["/archives/2018/02/index.html","2c6580cf7cd4c814ad41a80c955c3d94"],["/archives/2018/03/index.html","59c15779e0cd630fb41985fa49b0d361"],["/archives/2018/04/index.html","1899fd55befed3c51ba1fe6e43f78353"],["/archives/2018/05/index.html","373b8589077c72d4e2c17314924293a3"],["/archives/2018/06/index.html","396555400af63d0bd5b4a04f5181e9ea"],["/archives/2018/07/index.html","09b77717e6628b5944fab530c3943b02"],["/archives/2018/08/index.html","7ef8e95c7bdc7616a254dc89146b46d4"],["/archives/2018/09/index.html","eee5605e5e48f26d2e881a26820860db"],["/archives/2018/10/index.html","284f478dc3e1e651b11a97447ebba745"],["/archives/2018/index.html","121cb0a8175f350c30c61c4fdd05f540"],["/archives/2018/page/2/index.html","d96a42e7fa8b0e48e76adb491ee8f0e3"],["/archives/2018/page/3/index.html","fd5800676e55a870a2f6159da994387c"],["/archives/2019/01/index.html","09ee29ec39a9afa5fe1dd1957e4c4909"],["/archives/2019/02/index.html","01dc4cd73304b11d7dd318ca158458b7"],["/archives/2019/03/index.html","f372c9eb51a76c0f03472b2e8ac57091"],["/archives/2019/04/index.html","0b4a6ab9364512b6f9117a0857b5814a"],["/archives/2019/05/index.html","a16d3b6d4e9266edf15b2e5f54fff3fc"],["/archives/2019/07/index.html","bf3edcff0b69e43098116275686efa5d"],["/archives/2019/08/index.html","574e24a1e41e02722cb7abb6a634a78e"],["/archives/2019/index.html","36b466b6cd64d39bb30898a9c83725a5"],["/archives/2019/page/2/index.html","b6eb0c6d18915ec5c17c3bc34e9216a6"],["/archives/index.html","9c266c5bc8944993ce37fd7d126b2bcf"],["/archives/page/2/index.html","863308deea25d8b948f787953b301f41"],["/archives/page/3/index.html","4887d559bfe1d949cb5d678efc73eb2a"],["/archives/page/4/index.html","db0e27bbeb742e780e110a67e221b3c5"],["/archives/page/5/index.html","b4898c2fc04b5727fde42ae96a3bea8b"],["/assets/css/APlayer.min.css","fbe994054426fadb2dff69d824c5c67a"],["/assets/js/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["/assets/js/Meting.min.js","bfac0368480fd344282ec018d28f173d"],["/categories/C-C/index.html","4fb205f87ebd4d78a820aa5a00b7e913"],["/categories/Java/index.html","11720a195504fab3278495b295b0074d"],["/categories/index.html","4e796d60d6f7950bf397cbd12725fadf"],["/categories/python/index.html","246b0e5d474e271227dca465b68f829a"],["/categories/大数据/index.html","7b1d20114dd472780ad856c51dcb9196"],["/categories/开发/index.html","2f4dcf33abc9df625155e8b55ba5c1dc"],["/categories/操作系统/index.html","53e3f42327fa67e511e67b5ddff6c1ea"],["/categories/数据库/index.html","d8f5f0380be9fc1f667f7ae1232a32d7"],["/categories/系统命令/index.html","d6c22a379dffc5144da8edc5db8485e3"],["/categories/计算机网络/index.html","c3f8ff98cd3d982ea94a73f726a0651b"],["/categories/随笔/index.html","dd1a1b29da051339fe86c58fd9b72ff5"],["/css/index.css","147293492a9d5b5518d12f0eecf0365f"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/gallery/index.html","4ff6b7c8893ba23085c0acf337cd89a7"],["/images/archive.jpg","f95ce1ea13939ecc93026bdac9527d69"],["/images/avatar.png","d299cadb0ba98db63e8a5e05f1b36d23"],["/images/bg.jpg","02db9c3581a2861ffc13f3e4e088aae3"],["/images/bg2.jpg","f0b8cadd602f249e8594ce9ad978bf73"],["/images/camera.png","33f066954169f1c376a3367b1d7ac54b"],["/images/default_cover.jpg","68c3789dad5ae885ad9f8c9fdbe1c854"],["/images/notebook.png","8dcde2044ac89694adefc856f9df0ada"],["/images/post.jpg","f6f76b53c1d63c46d9878ae71763df80"],["/images/top_1.jpg","74f7734db8d5c28c33c92c687c64f255"],["/images/top_2.jpg","b7cf6868ae95f40d089ca8d2e60b9708"],["/images/top_3.jpg","dcc9c24f5cbd16f4a561969cf28d0f99"],["/img/404.jpg","23cf82ba04680b72d5616d74aa3f5550"],["/img/algolia.svg","fd40b88ac5370a5353a50b8175c1f367"],["/img/alipay.jpg","9d7d25339256096f77b7a3634bcd6e33"],["/img/avatar.png","9eee8b7f139e0b0ddad209d66d3577a3"],["/img/comment_bg.png","04208f25e34b8f29f072efbb2e212c86"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/img/wechat.jpg","67599109276ad864d53e34817dbc0d72"],["/index.html","71bc0b5a2ba6ff68b8ce912939b45fa1"],["/js/activate-power-mode.js","2345780cb71f6e17a20d9ca2283accda"],["/js/baidupush.js","7d26211fa55bebac2e0c0abeee05a267"],["/js/main.js","ef5ad6ffd1ee48c4b69990047c4d059b"],["/js/nightshift.js","e498a040e1746e95b5ed33b9d41618f7"],["/js/runtimeshow.js","6bc5dc7652b39605152475b840e88899"],["/js/search/algolia.js","db2e58114adef0dfd2f2d0a246b50ef4"],["/js/search/local-search.js","e7bab78aa2b388479ea96bb0b04b6834"],["/js/third-party/anime.min.js","9b4bbe6deb700e1c3606eab732f5eea5"],["/js/third-party/canvas-ribbon.js","6ca731e8db63562c0dd6461eabbd65d7"],["/js/third-party/fireworks.js","080fdfcacffc6828826484645140af50"],["/js/third-party/jquery.fancybox.min.js","3c9fa1c1199cd4f874d855ecb1641335"],["/js/third-party/jquery.min.js","c9f5aeeca3ad37bf2aa006139b935f0a"],["/js/third-party/piao.js","d7a4ef27420717adccfca1c1287f8c44"],["/js/tw_cn.js","fbc127c110435085bde10997850bbc55"],["/js/utils.js","816e7d34d69996e6a4f0b92a81c16cca"],["/music/index.html","5b1b12010960d75b6b751539e80efa4e"],["/page/2/index.html","eead37539269f18cfe0066b52f62f754"],["/page/3/index.html","341915f52f166e6ebf4ea1bae9535302"],["/page/4/index.html","a288a721eda673f61131ad9aca2b9518"],["/page/5/index.html","7f13b178b440ec6a2ce0e6793b8747aa"],["/tags/Hadoop/index.html","5d1b0847ce84541ca9b33ee8b9a809b8"],["/tags/Linux/index.html","3460d8b1e77cb7931313b52ff575ed3e"],["/tags/Mac/index.html","b81d66a53b205cff3b034a7b5bc83d60"],["/tags/MySQL/index.html","897e510ee1e90e0b2f19b5802b70460b"],["/tags/TCP/index.html","a8cbdeb8b90954c5f5f27797fcc8ab30"],["/tags/github/index.html","022815a6fd659086eb95442ff9a70073"],["/tags/http/index.html","4310e6208f0166d245fe4a4cefc54392"],["/tags/index.html","79d652a36e4c29e13f7a5276efb0d4bb"],["/tags/markdown/index.html","230f95f242634334ed7df3361f64ba60"],["/tags/mongodb/index.html","2827bc96916e195caf2bdc68e8447c05"],["/tags/python模块/index.html","1737d109f0878d9e2d6ba0c6d7175d6b"],["/tags/redis/index.html","4b5aa39441bbacb0b9bf056f24438a3d"],["/tags/大数据/index.html","aef7e0e5a5b469c12611339417e527b4"],["/tags/系统/index.html","33925576940535083d06ecb4ad03f077"],["/tags/系统命令/index.html","47684883d50bf3a06b141cefc6645fe0"],["/tags/随笔/index.html","b5929f53084878c625f9d1c52773c82a"],["/tags/随笔/page/2/index.html","13766d6bd3b8020a3e525bdc87e96376"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get("/*", toolbox.cacheFirst, {"origin":"https://vallzey.github.io/"});




