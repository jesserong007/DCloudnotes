# DCloudnotes

#### 介绍

DCloudnotes是一个去中心化云笔记应用。用户可以把自己的笔记内容上传到ipfs，用户只需要花费少量的eth就可以把对应笔记内容的ipfs地址保存到以太坊区块链中（kovan测试网络），同时也保存到moralis的数据库中，便于用户更快速地查看到笔记的列表，然后根据ipfs地址获取自己上传的笔记内容的详情。笔记内容是一个富文本文档，用户除了编写文字，也可以上传图片到ipfs，然后把笔记的内容构造成一个json格式的文件，上传到ipfs分布式存储网络。

#### 目的

在我们平时学习或工作当中，我们都会经常需要做笔记，笔记对于我们来说是非常重要的信息，我们觉得有必要把这些内容上传到ipfs & filecoin。传统的云笔记应用是把用户的笔记内容保存到中心化的数据库，而数据库是由某个公司管理，用户不能自己掌握自己的数据，存在数据丢失的可能，中心化的数据库也存在存储空间的局限性。而DCloudnotes是一个去中心化云笔记应用，用户可将自己的笔记内容保存到ipfs分布式存储中，然后把ipfs地址记录到以太坊区块链网络中，让用户数据更安全，不可篡改，可以永久存储；而且ipfs & filecoin也具有庞大的存储空间。解决了传统的云笔记应用存在的问题。

#### 展示

链接： https://hidden-sunset-4510.on.fleek.co/ （ 代码已部署到fleek的ipfs上 ）


1. 登录页面，用户连接MetaMask钱包即可登录进入首页。在首页中，用户可以看到自己的笔记列表，笔记列表是从数据库中获取的，笔记的详情是读取ipfs地址返回的json格式数据来获取的。


<img src="https://bafybeicrnde7iqnggysy5dftko7mnjefwsp3uynltc765kf33naogpph24.ipfs.dweb.link/1657963028670.jpg" style="width:100%;" />

<img src="https://bafybeibxawac5ogn4xwqiccqs5t2eckss66gpzz5sidl35iprhkdncsizq.ipfs.dweb.link/1657963300687.jpg" style="width:100%;" />


2. 在首页，可查看自己的笔记列表，和查看笔记的内容详情，也可对笔记内容进行修改更新，也可以删除笔记。更新笔记时，是将新的笔记内容以json数据格式上传到ipfs，生成新的ipfs地址。


<img src="https://bafybeib6devnbdrprgp5fm5552o76od5rup4leaxybgdo7yzlikwaathwq.ipfs.dweb.link/1657965129967.jpg" style="width:100%;" />

<img src="https://bafybeiheeikmcc7mp5zbzqcacctklgcbpxz6hs6vzn6j4ecxfnusqmydqi.ipfs.dweb.link/1657965292255.jpg" style="width:100%;" />

<img src="https://bafybeicgf43kvvzazcmplkgbahbwqi5d3pgngb3ifqukvzkx2blu2qptsy.ipfs.dweb.link/1657965336735.jpg" style="width:100%;" />


3. 在添加页面，用户可以添加笔记，笔记内容是一个富文本文档，除了可以编写文字，也可以上传图片到ipfs，然后把笔记的内容构造成一个json格式的文件，上传到ipfs。


<img src="https://bafybeidaip54r7jah25uc6xclaojajyme3km6lbvw466o3crf3o74ygwo4.ipfs.dweb.link/1657963656927.jpg" style="width:100%;" />


4. 回收站页面，用户可查看已删除的笔记和笔记的详情，也可恢复笔记到自己的笔记列表，也可把笔记彻底删除。


<img src="https://bafybeibckzw5bn2zgqvjr4oxdorunv5k5ie2uc6uxgkxn4jl7crdwhikmq.ipfs.dweb.link/1657965454597.jpg" style="width:100%;" />


5. 在个人页面，用户可修改自己的用户名，用户也可用自己的NFT作为自己的头像。


<img src="https://bafybeigu665b5cd2gksduh54r4el4ajsyrscrrovw2wshssxsa4v6z5wfq.ipfs.dweb.link/1657965543569.jpg" style="width:100%;" />



#### 技术堆栈和工具

1. Solidity - 编写智能合约
2. Javascript - 使用reactJs编写前端页面
3. React routers - reactJs 路由组件
4. react-moralis - 运用moralis快速开发web3
5. Hardhat - 智能合约开发框架
6. Quill - 富文本编辑器


#### 安装

1. 安装 NodeJS
2. 安装 Hardhat
3. 安装 ReactJs
4. 安装 MetaMask 在浏览器

#### 使用说明

1. Clone/Download the Repository

2. 安装依赖: 

	npm install  
	cd app & npm install

3. 测试合约:
	
	npx hardhat test

4. 编译合约:
	
	npx hardhat compile

5. 部署合约: 
	
	npx hardhat run ./scripts/deploy.js --network kovan (部署到kovan测试网络)

6. 运行应用
	
	cd app & npm run start

#### 优化的想法

1. 添加自动保存功能，防止用户忘记保存笔记内容。更新笔记内容能自动实时保存到数据库，然后点击保存按钮才上传到ipfs。
2. 修改花费eth的规则，可根据上传内容的大小来计算需要花费多少eth，目前是定死了费用。
3. 优化solidity代码，让前端更多的跟合约交互，目前主要是跟moralis的数据库交互。
