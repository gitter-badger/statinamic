---
title: How to use Collections in Statinamic
---

By default, Statinamic provides 2 things to help you work with collections:

- it create file that contains all pages metadata in a unique collection,
- it provides an helper that helps you filter/sort/limit the collection.

## Collection file

Here is a minimal and simple example of a collection file.
Note that metadata have two additional fields: `__filename` and `__url`.

```json
[
  {
    "__filename": "index.md",
    "__url": "/",
    "title": "Awesome Website"
  },
  {
    "__filename": "blog/index.md",
    "__url": "/blog/",
    "title": "Awesome blog"
  },
  {
    "__filename": "blog/halloween.md",
    "__url": "/blog/halloween/",
    "title": "Awesome Halloween blog post",
    "layout": "Post",
    "date": "2015-10-31"
  },
  {
    "__filename": "blog/xmas.md",
    "__url": "/blog/xmas/",
    "title": "Awesome Christmas blog post",
    "layout": "Post",
    "date": "2015-12-25"
  },
]
```

As you can see, this file contains all pages, index and post.

The easy way to get some data is to use Statinamic helper

```js
// es6
import enhanceCollection from "statinamic/lib/enhance-collection"

// es5
var enhanceCollection = require("statinamic/lib/enhance-collection").default
```

With it, anywhere in your components you can easily filter some pages:

```js
enhanceCollection(collection, {
  filter: { layout: "Post" },
  sort: "date",
  reverse: true,
  // limit: 1,
})
```

Now you will ask "But where `collection` come from?". Fair enough.
Here is an example of a component that will display posts, sorted by date, and
others pages (that are not a post) in a second list.
You will see that the collection is retrieved from the redux store using the
connect decorator.
[There is currently an issue open to replace this way to do by a simpler method
that might be based on react context](https://github.com/MoOx/statinamic/issues/40)

```js
import React, { Component } from "react"
import { PropTypes } from "react"

import Page from "Page"

import { connect } from "react-redux"
import enhanceCollection from "statinamic/lib/enhance-collection"

export default
@connect(
  ({ collection }) => {
    return { collection }
  }
)
class Collection extends Component {

  static propTypes = {
    head: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired,
    collection: PropTypes.array,
  }

  render() {
    const {
      collection,
    } = this.props
    return (
      <div>
        <Page { ...this.props } />
        {
          Boolean(!collection || !collection.length) &&
          <div>
            { "No entry" }
          </div>
        }
        {
          Boolean(collection && collection.length) &&
          <div>
            { "Posts (by date)" }
            <ul>
            {
              enhanceCollection(collection, {
                filter: { layout: "Post" },
                sort: "date",
                reverse: true,
                // limit: 1,
              })
              .map((item) => {
                return (
                  <li key={ item.__url }>
                    <a href={ item.__url }>
                      { item.title }
                    </a>
                  </li>
                )
              })
            }
            </ul>

            { "Other pages" }
            <ul>
            {
              enhanceCollection(collection, {
                filter: ({ layout }) => layout !== "Post",
                sort: "title",
              })
              .map((item) => {
                return (
                  <li key={ item.__url }>
                    <a href={ item.__url }>
                      { item.title }
                    </a>
                  </li>
                )
              })
            }
            </ul>
          </div>
        }
      </div>
    )
  }
}
```
