package com.example.wholesale_company_oracle_db.controllers

import com.example.wholesale_company_oracle_db.entity.Demand
import com.example.wholesale_company_oracle_db.entity.Good
import com.example.wholesale_company_oracle_db.entity.Sale
import com.example.wholesale_company_oracle_db.entity.Warehouse
import com.example.wholesale_company_oracle_db.service.ServiceGood
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin()
class MainController(@Autowired var serviceGood: ServiceGood) {

    @GetMapping("/goods")
    fun getAllGoods(): List<Good> {
        return serviceGood.getAllGoods()
    }

    @GetMapping("/goods-five-popular")
    fun getFiveTheMostPopularGoods(): List<Good> {
        return serviceGood.getFiveTheMostPopularGoods()
    }

    @GetMapping("/goods-demand")
    fun getGoodDemand(@RequestParam id: Int, @RequestParam lhs: String, @RequestParam rhs: String): List<Demand> {
        return serviceGood.getGoodDemand(id, lhs, rhs)
    }

    @DeleteMapping("/delete-warehouse1")
    fun deleteWarehouse1(@RequestParam id: Int){
        serviceGood.deleteWarehouse1(id)
    }

    @DeleteMapping("/delete-warehouse2")
    fun deleteWarehouse2(@RequestParam id: Int){
        serviceGood.deleteWarehouse2(id)
    }

    @DeleteMapping("/delete-sale")
    fun deleteSale(@RequestParam id: Int){
        serviceGood.deleteSale(id)
    }

    @DeleteMapping("/delete-good")
    fun deleteGood(@RequestParam id: Int){
        serviceGood.deleteGood(id)
    }

    @PostMapping("/add-sale")
    fun addSale(@RequestBody sale: Sale){
        serviceGood.addSale(sale)
    }
    @PostMapping("/add-good")
    fun addGood(@RequestBody good: Good) {
        serviceGood.addGood(good)
    }

    @PostMapping("/add-warehouse1")
    fun addWarehouse1(@RequestBody warehouse: Warehouse) {
        serviceGood.addWarehouse1(warehouse)
    }

    @PostMapping("/add-warehouse2")
    fun addWarehouse2(@RequestBody warehouse: Warehouse) {
        serviceGood.addWarehouse2(warehouse)
    }

    @GetMapping("/sales")
    fun getAllSales(): List<Sale> {
        return serviceGood.getAllSales();
    }

    @GetMapping( "/warehouse1")
    fun getAllWarehouse1Goods(): List<Warehouse> {
        return serviceGood.getAllWarehouse1Goods();
    }

    @GetMapping("/warehouse2")
    fun getAllWarehouse2Goods(): List<Warehouse> {
        return serviceGood.getAllWarehouse2Goods();
    }
}