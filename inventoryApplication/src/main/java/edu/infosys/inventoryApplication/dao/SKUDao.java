package edu.infosys.inventoryApplication.dao;

import java.util.List;

import edu.infosys.inventoryApplication.bean.SKU;


public interface SKUDao {
	public void save(SKU sku);
	public SKU findSKUById(String id);
	public void removeSKU(String id);
	public List<SKU> showAllSKUs();
	public void update(SKU sku);
	public List<String> getSkuIdList();
}
