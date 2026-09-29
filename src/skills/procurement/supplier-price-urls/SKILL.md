---
name: supplier-price-urls
description: 供应商报价URL映射 - 各供应商在线报价系统地址
scope: procurement
version: 1.0.0
---

# 供应商报价URL映射

## 概述
记录各主要供应商的在线报价系统URL，用于价格比对和市场竞争分析。

## URL映射表（演示占位地址）

| 供应商 | 报价系统URL | 备注 |
|--------|------------|------|
| 启衡运动控制（示例） | https://example.com/qiheng/quote | 关节执行器与伺服驱动 |
| 灵瞳传感技术（示例） | https://example.com/lingtong/price | 深度相机与激光雷达 |
| 云枢边缘计算（示例） | https://example.com/yunshu/catalog | 边缘计算模块 |
| 维拓能源设备（示例） | https://example.com/weitou/quote | 机器人电池与电源模块 |

## 使用场景
1. 当用户要求对比某研发物料/设备的市场价格时
2. 需要验证供应商报价是否合理时
3. 进行供应商竞争力分析时

## 使用方式
- 配合 `web_search` 工具搜索最新报价
- 配合 `web-scraper` 技能抓取报价页面
- 将抓取结果与 ERP 中的采购价进行对比

## 注意事项
- 表内供应商和 example.com 地址均为虚构占位数据，不代表真实企业或可访问报价源；接入真实报价前需替换并核验
- 部分报价系统需要登录，仅抓取公开页面
- 价格数据仅供参考，实际以合同价为准
