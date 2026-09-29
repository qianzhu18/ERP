"""
研发物料与设备管理 MCP 工具（内部沿用 ERP part 接口契约）
part_query / part_search / part_by_supplier / part_page
"""
import json
from fastmcp import FastMCP
from ..http_base import erp_client


def register_parts_tools(mcp: FastMCP):
    """注册研发物料与设备管理工具到 MCP Server"""

    @mcp.tool()
    async def part_query(id: int) -> str:
        """获取单个研发物料或设备的详细信息。

        Args:
            id: ERP 物料/设备ID

        Returns:
            研发物料/设备信息JSON。ERP 响应字段仍使用 partCode 等既有接口命名。
        """
        result = await erp_client.get(f"/api/parts/get/{id}")
        return json.dumps(result, ensure_ascii=False, indent=2)

    @mcp.tool()
    async def part_search(name: str) -> str:
        """根据名称关键字搜索研发物料或设备。

        Args:
            name: 物料/设备名称关键字，例如"关节执行器"、"深度相机"、"边缘计算模块"

        Returns:
            匹配的研发物料/设备列表JSON
        """
        result = await erp_client.get("/api/parts/search", params={"name": name})
        return json.dumps(result, ensure_ascii=False, indent=2)

    @mcp.tool()
    async def part_by_supplier(supplier_id: int) -> str:
        """获取指定供应商的所有产品列表。

        Args:
            supplier_id: 供应商ID

        Returns:
            该供应商提供的研发物料/设备列表JSON
        """
        result = await erp_client.get(f"/api/parts/supplier/{supplier_id}")
        return json.dumps(result, ensure_ascii=False, indent=2)

    @mcp.tool()
    async def part_page(
        current: int = 1,
        size: int = 10,
        name: str = None,
        category: str = None,
        supplier_id: int = None,
    ) -> str:
        """分页查询研发物料与设备目录。

        Args:
            current: 当前页码，默认1
            size: 每页大小，默认10
            name: 研发物料/设备名称（可选，模糊匹配）
            category: 分类（可选），例如"运动控制"、"环境感知"、"边缘计算"
            supplier_id: 供应商ID（可选）

        Returns:
            分页研发物料/设备数据JSON，包含 records, total, current, size, pages
        """
        params = {
            "current": current,
            "size": size,
            "name": name,
            "category": category,
            "supplierId": supplier_id,
        }
        result = await erp_client.get("/api/parts/page", params=params)
        return json.dumps(result, ensure_ascii=False, indent=2)

    @mcp.tool()
    async def part_create(
        part_code: str,
        name: str,
        purchase_price: float,
        model: str = None,
        specification: str = None,
        unit: str = None,
        suggested_retail_price: float = None,
        stock_warning_value: int = None,
        supplier_id: int = None,
        category: str = None,
        description: str = None,
    ) -> str:
        """创建新的研发物料/设备目录项。

        Args:
            part_code: ERP 物料/设备编码（必填，底层字段沿用接口命名）
            name: 物料/设备名称（必填）
            purchase_price: 采购单价（必填，>=0）
            model: 型号
            specification: 规格
            unit: 单位（个/套/件）
            suggested_retail_price: 建议参考价格
            stock_warning_value: 库存预警值
            supplier_id: 供应商ID
            category: 分类
            description: 描述

        Returns:
            创建结果JSON
        """
        data = {
            "partCode": part_code,
            "name": name,
            "purchasePrice": purchase_price,
            "model": model,
            "specification": specification,
            "unit": unit,
            "suggestedRetailPrice": suggested_retail_price,
            "stockWarningValue": stock_warning_value,
            "supplierId": supplier_id,
            "category": category,
            "description": description,
        }
        data = {k: v for k, v in data.items() if v is not None}
        result = await erp_client.post("/api/parts/create", json_data=data)
        return json.dumps(result, ensure_ascii=False, indent=2)
