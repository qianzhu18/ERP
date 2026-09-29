"""Small in-memory ERP API for local UI/agent exploration.

This is a demo substitute for the separate Java ERP service referenced by the
project. It is intentionally local-only and resets when the process restarts.
"""
from copy import deepcopy
from datetime import date
from typing import Any

from fastapi import FastAPI, Request

app = FastAPI(title="Local demo ERP API", version="0.1.0")

suppliers: list[dict[str, Any]] = [
    {"id": 1, "supplierCode": "SUP-001", "name": "启衡运动控制（示例）", "contactPerson": "周经理", "creditRating": "A", "status": 1, "onTimeRate": 0.96, "supplyCapacity": "高"},
    {"id": 2, "supplierCode": "SUP-002", "name": "灵瞳传感技术（示例）", "contactPerson": "陈经理", "creditRating": "A", "status": 1, "onTimeRate": 0.93, "supplyCapacity": "高"},
    {"id": 3, "supplierCode": "SUP-003", "name": "云枢边缘计算（示例）", "contactPerson": "林经理", "creditRating": "B", "status": 1, "onTimeRate": 0.82, "supplyCapacity": "中"},
]
parts: list[dict[str, Any]] = [
    {"id": 1, "partCode": "ACT-100", "name": "关节执行器模组", "model": "JX-10", "unit": "套", "purchasePrice": 4200.0, "suggestedRetailPrice": 5200.0, "stockWarningValue": 6, "supplierId": 1, "category": "运动控制", "description": "机器人原型验证用关节执行器模组（示例数据）"},
    {"id": 2, "partCode": "PER-210", "name": "深度相机与3D激光雷达套件", "model": "DP-L3", "unit": "套", "purchasePrice": 6800.0, "suggestedRetailPrice": 8200.0, "stockWarningValue": 3, "supplierId": 2, "category": "环境感知", "description": "机器人环境感知原型验证套件（示例数据）"},
    {"id": 3, "partCode": "COM-330", "name": "边缘计算模块", "model": "EC-8", "unit": "台", "purchasePrice": 9800.0, "suggestedRetailPrice": 11800.0, "stockWarningValue": 2, "supplierId": 3, "category": "边缘计算", "description": "机器人本体控制与推理验证设备（示例数据）"},
]
inventory: list[dict[str, Any]] = [
    {"id": 1, "partId": 1, "currentQuantity": 2, "safetyStock": 6, "warehouseLocation": "研发样机库-A01", "partDetail": parts[0]},
    {"id": 2, "partId": 2, "currentQuantity": 5, "safetyStock": 3, "warehouseLocation": "感知实验室-B03", "partDetail": parts[1]},
    {"id": 3, "partId": 3, "currentQuantity": 1, "safetyStock": 2, "warehouseLocation": "边缘计算实验室-C02", "partDetail": parts[2]},
]
orders: list[dict[str, Any]] = [
    {"id": 1, "orderNumber": "PO-2026-001", "totalAmount": 25200.0, "status": 3, "orderTime": "2026-09-10", "orderDetail": [{"partId": 1, "partName": "关节执行器模组", "quantity": 6, "unitPrice": 4200.0, "supplierName": "启衡运动控制（示例）"}]},
    {"id": 2, "orderNumber": "PO-2026-002", "totalAmount": 27200.0, "status": 0, "orderTime": "2026-09-18", "orderDetail": [{"partId": 2, "partName": "深度相机与3D激光雷达套件", "quantity": 4, "unitPrice": 6800.0, "supplierName": "灵瞳传感技术（示例）"}]},
    {"id": 3, "orderNumber": "PO-2026-003", "totalAmount": 19600.0, "status": 4, "orderTime": "2026-09-22", "orderDetail": [{"partId": 3, "partName": "边缘计算模块", "quantity": 2, "unitPrice": 9800.0, "supplierName": "云枢边缘计算（示例）"}]},
]


def ok(data: Any) -> dict[str, Any]:
    return {"code": 200, "message": "success", "data": deepcopy(data)}


def page(rows: list[dict[str, Any]], params: dict[str, Any]) -> dict[str, Any]:
    current = max(1, int(params.get("current") or 1))
    size = max(1, min(100, int(params.get("size") or 10)))
    start = (current - 1) * size
    return ok({"records": rows[start:start + size], "total": len(rows), "current": current, "size": size, "pages": (len(rows) + size - 1) // size})


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "mode": "local-demo"}


@app.get("/api/suppliers/search")
def supplier_search(name: str = ""):
    return ok([x for x in suppliers if name.lower() in x["name"].lower()])


@app.get("/api/suppliers/page")
def supplier_page(current: int = 1, size: int = 10, name: str | None = None, status: int | None = None, creditRating: str | None = None):
    rows = [x for x in suppliers if (not name or name.lower() in x["name"].lower()) and (status is None or x["status"] == status) and (not creditRating or x["creditRating"] == creditRating)]
    return page(rows, {"current": current, "size": size})


@app.get("/api/suppliers/get/{item_id}")
def supplier_get(item_id: int):
    return ok(next((x for x in suppliers if x["id"] == item_id), None))


@app.post("/api/suppliers/create")
async def supplier_create(request: Request):
    body = await request.json()
    item = {"id": max(x["id"] for x in suppliers) + 1, **body}
    suppliers.append(item)
    return ok(item)


@app.patch("/api/suppliers/update-status/{item_id}")
def supplier_status(item_id: int, status: int):
    item = next((x for x in suppliers if x["id"] == item_id), None)
    if item:
        item["status"] = status
    return ok(item)


@app.get("/api/parts/get/{item_id}")
def part_get(item_id: int):
    return ok(next((x for x in parts if x["id"] == item_id), None))


@app.get("/api/parts/search")
def part_search(name: str = ""):
    return ok([x for x in parts if name.lower() in x["name"].lower()])


@app.get("/api/parts/supplier/{supplier_id}")
def parts_by_supplier(supplier_id: int):
    return ok([x for x in parts if x["supplierId"] == supplier_id])


@app.get("/api/parts/page")
def part_page(current: int = 1, size: int = 10, name: str | None = None, category: str | None = None, supplierId: int | None = None):
    rows = [x for x in parts if (not name or name.lower() in x["name"].lower()) and (not category or category == x["category"]) and (supplierId is None or supplierId == x["supplierId"])]
    return page(rows, {"current": current, "size": size})


@app.post("/api/parts/create")
async def part_create(request: Request):
    body = await request.json()
    item = {"id": max(x["id"] for x in parts) + 1, **body}
    parts.append(item)
    return ok(item)


@app.post("/api/orders/create")
async def order_create(request: Request):
    body = await request.json()
    item = {"id": max(x["id"] for x in orders) + 1, "orderTime": date.today().isoformat(), **body}
    orders.append(item)
    return ok(item)


@app.put("/api/orders/update/{item_id}")
async def order_update(item_id: int, request: Request):
    item = next((x for x in orders if x["id"] == item_id), None)
    if item:
        item.update(await request.json())
    return ok(item)


@app.get("/api/orders/page")
def order_page(current: int = 1, size: int = 10, orderNumber: str | None = None, status: int | None = None, startDate: str | None = None, endDate: str | None = None):
    rows = [x for x in orders if (not orderNumber or orderNumber.lower() in x["orderNumber"].lower()) and (status is None or x["status"] == status) and (not startDate or x["orderTime"] >= startDate) and (not endDate or x["orderTime"] <= endDate)]
    return page(rows, {"current": current, "size": size})


@app.get("/api/orders/get/{item_id}")
def order_get(item_id: int):
    return ok(next((x for x in orders if x["id"] == item_id), None))


@app.get("/api/orders/search-details")
def order_details(partName: str | None = None, startDate: str | None = None, endDate: str | None = None):
    rows = []
    for order in orders:
        if startDate and order["orderTime"] < startDate[:10]:
            continue
        if endDate and order["orderTime"] > endDate[:10]:
            continue
        rows.extend({**d, "orderNumber": order["orderNumber"], "status": order["status"]} for d in order.get("orderDetail", []) if not partName or partName.lower() in d.get("partName", "").lower())
    return ok(rows)


@app.get("/api/orders/statistics")
def order_statistics(startDate: str | None = None, endDate: str | None = None):
    rows = [x for x in orders if (not startDate or x["orderTime"] >= startDate) and (not endDate or x["orderTime"] <= endDate)]
    return ok({"totalOrders": len(rows), "totalAmount": sum(x["totalAmount"] for x in rows), "statusCounts": {str(s): sum(x["status"] == s for x in rows) for s in range(5)}})


@app.patch("/api/orders/update-status/{item_id}")
def order_status(item_id: int, status: int):
    item = next((x for x in orders if x["id"] == item_id), None)
    if item:
        item["status"] = status
    return ok(item)


@app.get("/api/inventory/warning")
def inventory_warning():
    return ok([x for x in inventory if x["currentQuantity"] < x["safetyStock"]])


@app.get("/api/inventory/page")
def inventory_page(current: int = 1, size: int = 10, partName: str | None = None, warehouseLocation: str | None = None):
    rows = [x for x in inventory if (not partName or partName.lower() in x["partDetail"]["name"].lower()) and (not warehouseLocation or warehouseLocation == x["warehouseLocation"])]
    return page(rows, {"current": current, "size": size})


@app.get("/api/inventory/check")
def inventory_check():
    return ok({"totalSku": len(inventory), "warningCount": sum(x["currentQuantity"] < x["safetyStock"] for x in inventory), "totalQuantity": sum(x["currentQuantity"] for x in inventory)})


@app.post("/api/inventory/inbound")
async def inventory_inbound(request: Request, partId: int, quantity: int, warehouseLocation: str | None = None):
    item = next((x for x in inventory if x["partId"] == partId), None)
    if item:
        item["currentQuantity"] += quantity
    else:
        part = next((x for x in parts if x["id"] == partId), {})
        item = {"id": len(inventory) + 1, "partId": partId, "currentQuantity": quantity, "safetyStock": part.get("stockWarningValue", 0), "warehouseLocation": warehouseLocation or "A-01", "partDetail": part}
        inventory.append(item)
    return ok(item)


@app.post("/api/inventory/outbound")
async def inventory_outbound(partId: int, quantity: int):
    item = next((x for x in inventory if x["partId"] == partId), None)
    if item:
        item["currentQuantity"] = max(0, item["currentQuantity"] - quantity)
    return ok(item)


@app.get("/api/inventory/get/{item_id}")
def inventory_get(item_id: int):
    return ok(next((x for x in inventory if x["id"] == item_id), None))
