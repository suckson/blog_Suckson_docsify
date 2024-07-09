1. 概述
持续集成(Continuous Integration)是软件开发过程中的重要环节，不论是在开发环境，还是生产环境，其好处都是可以让团队尽快得到反馈，从而尽早发现和解决问题，不要等到用户来报告问题，影响产品和团队的声誉。越早越快地发现和解决问题，成本越低，这也是敏捷开发的基本目的之一。

持续集成的工具有不少，著名的有CruiseControl、JetBrains的TeamCity、微软的Team Foundation Server。本文讲的是另外一个相对轻巧的持续集成工具Travis。这个工具的不同之处是，它已经搭建好了，有自己的环境，省去了你用自己的服务器安装、配置的麻烦。如果你的项目是开源的，只需要在https://travis-ci.org/上用Github的账号注册就可以免费使用了;如果不是开源的项目，就要收费了，要用https://travis-ci.com/，具体的收费标准可以参考https://travis-ci.com/plans。下面只讲述https://travis-ci.org/的使用和配置，因为https://travis-ci.com/我也没用过，不过估计收费的功能应该更多更好一些。
