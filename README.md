# DCloudnotes

#### 介绍

DCloudnotes是一个去中心化云笔记应用。用户可将自己的笔记内容上传到ipfs，然后通过编写智能合约把ipfs地址保存到Ploygon区块链（mumbai测试网络）和moralis的数据库中，便于用户根据ipfs地址获取到自己上传的笔记内容。笔记内容是一个富文本，用户除了编写文字，也可以上传图片，然后把所有的内容构造成一个json格式的文件，上传到ipfs网络。

#### 技术堆栈和工具

1. Solidity - 编写智能合约
2. Javascript - 使用reactJs编写前端页面
3. React routers - reactJs 路由组件
4. react-moralis - 运用moralis快速开发web3
5. Hardhat - 智能合约开发框架
6. Quill - 富文本编辑器


#### 安装教程

1. 安装 NodeJS
2. 安装 Hardhat
3. 安装 ReactJs
4. 安装 MetaMask 在浏览器

#### 使用说明

1. Clone/Download the Repository

2. 安装依赖: 

	npm install  
	cd app & npm install

3. 部署合约: 
	
	npx hardhat run ./scripts/deploy.js --network mumbai (部署到Ploygon测试网络)

4. 测试合约:
	
	npx hardhat test

5. 运行
	
	cd app & npm run start

