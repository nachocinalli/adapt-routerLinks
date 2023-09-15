# adapt-routerLinks  

**routerLinks** is an *extension* to allow a learner navigate to an adapt model element (page, article, block or component).

You can see it [here](https://adaptlearning-no-core.web.app/#/id/eo-25)

## Usage
Use the css selector that you specified in the course settings to create a link to an adapt model element. And use the href attribute to specify the *adapt model id*.
```
<a class="router-link" href="#id-adapt-model">Router link</a>
```

If you want to use the *_name property*, add the *'router-link-name'* class to the link, and set the href attribute with the *_name property*. Use both classes like this:
```
<a class="router-link router-link-name" href="custom-name">Router link name</a>
```



----------------------------

**Author / maintainer:**  [Nacho Cinalli](https://github.com/nachocinalli/)    
