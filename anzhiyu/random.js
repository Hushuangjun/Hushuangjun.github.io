var posts=["2023/Study/Computer science/破局/","2024/Specific subject/07BP神经网络/","2024/Resource sharing/02英语音标学习/","2024/Useful tools/02科研绘图/","2024/Specific subject/06Kriging模型公式推导/","2024/Useful tools/01如何提高搜索技术/","2024/Life/毕业设计进展/","2024/Specific subject/05振型分解反应谱法推导/","2024/Specific subject/04工程估价计算题/","2024/Specific subject/03钢结构设计作业/","2023/Specific subject/02 中心差分法求相对位移时程曲线/","2023/Useful tools/博客搭建/","2023/Useful tools/Zotero 插件/","2023/Useful tools/VSCode 系列教程/","2023/Useful tools/电子书籍/","2023/Specific subject/01大端与小端/","2023/Resource sharing/01土木工程专业课程设计/","2023/Study/Civil engineering/结构设计杂谈/","2023/Study/Civil engineering/力学基础和专业基础/","2023/Life/本科生活/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };