---
title: "Shortcodes"
date: 2016-08-30T16:01:23+08:00
lastmod: 2018-02-01T18:01:23+08:00
draft: false
tags: ["shortcodes"]
categories: ["shortcodes"]

---

# center, right, left

```markdown
## default
![img](/path/to/img.gif "img")

{{%/* center */%}}
## center
![img](/path/to/img.gif "img")
{{%/* /center */%}}

{{%/* right */%}}
## right
![img](/path/to/img.gif "img")
{{%/* /right */%}}

{{%/* left */%}}
## left
![img](/path/to/img.gif "img")
{{%/* /left */%}}
```

## default
![img](https://wx1.sinaimg.cn/small/006SToa6ly1fm07summ2gj30qo0qomzu.jpg "img")

{{% center %}}
## center
![img](https://wx1.sinaimg.cn/small/006SToa6ly1fm07summ2gj30qo0qomzu.jpg "img")
{{% /center %}}

{{% right %}}
## right
![img](https://wx1.sinaimg.cn/small/006SToa6ly1fm07summ2gj30qo0qomzu.jpg "img")
{{% /right %}}

{{% left %}}
## left
![img](https://wx1.sinaimg.cn/small/006SToa6ly1fm07summ2gj30qo0qomzu.jpg "img")
{{% /left %}}

---

## figure with class 

```
{{%/* figure src="/path/to/img.gif" title="default" alt="img" */%}}
{{%/* figure class="center" src="/path/to/img.gif" title="center" alt="img" */%}}
{{%/* figure class="right" src="/path/to/img.gif" title="right" alt="img" */%}}
{{%/* figure class="left" src="/path/to/img.gif" title="left" alt="img" */%}}
```

{{% figure src="https://wx1.sinaimg.cn/small/006SToa6ly1fm07summ2gj30qo0qomzu.jpg" title="default" alt="img" %}}
{{% figure class="center" src="https://wx1.sinaimg.cn/small/006SToa6ly1fm07summ2gj30qo0qomzu.jpg" title="center" alt="img" %}}
{{% figure class="right" src="https://wx1.sinaimg.cn/small/006SToa6ly1fm07summ2gj30qo0qomzu.jpg" title="right" alt="img" %}}
{{% figure class="left" src="https://wx1.sinaimg.cn/small/006SToa6ly1fm07summ2gj30qo0qomzu.jpg" title="left" alt="img" %}}

---

```
{{%/* center */%}}

## hybrid in center
{{%/* figure src="/path/to/img.gif" title="default" alt="img" */%}}
{{%/* figure class="right" src="/path/to/img.gif" title="right" alt="img" */%}}

{{%/* left */%}}
{{%/* figure src="/path/to/img.gif" title="default in left" alt="img" */%}}
{{%/* /left */%}}

{{%/* /center */%}}
```

{{% center %}}
## hybrid in center
{{% figure src="https://wx1.sinaimg.cn/small/006SToa6ly1fm07summ2gj30qo0qomzu.jpg" title="default" alt="img" %}}
{{% figure class="right" src="https://wx1.sinaimg.cn/small/006SToa6ly1fm07summ2gj30qo0qomzu.jpg" title="right" alt="img" %}}
{{% left %}}
{{% figure src="https://wx1.sinaimg.cn/small/006SToa6ly1fm07summ2gj30qo0qomzu.jpg" title="default in left" alt="img" %}}
{{% /left %}}
{{% /center %}}

<style>
.post-content img {
  height: 64px;
}
</style>
