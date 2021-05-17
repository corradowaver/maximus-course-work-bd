package com.example.wholesale_company_oracle_db.service

import com.example.wholesale_company_oracle_db.entity.Demand
import com.example.wholesale_company_oracle_db.entity.Good
import com.example.wholesale_company_oracle_db.entity.Sale
import com.example.wholesale_company_oracle_db.entity.Warehouse
import com.example.wholesale_company_oracle_db.repository.RepositoryGood
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class ServiceGood(@Autowired var goodRepository: RepositoryGood) {

    fun getAllGoods(): List<Good> {
        return goodRepository.getAllGoods()
    }

    fun getAllSales(): List<Sale> {
        return goodRepository.getAllSales()
    }

    fun getFiveTheMostPopularGoods(): List<Good> {
        return goodRepository.getFiveTheMostPopularGoods()
    }

    fun getGoodDemand(id: Int, lhsDate: String, rhsDate: String): List<Demand> {
        return goodRepository.getGoodDemand(id, lhsDate, rhsDate)
    }

    fun addGood(good: Good) {
        goodRepository.addGood(good)
    }

    fun addSale(sale: Sale) {
        goodRepository.addSale(sale)
    }

    fun deleteWarehouse1(id: Int) {
        goodRepository.deleteWarehouse1(id)
    }

    fun deleteWarehouse2(id: Int) {
        goodRepository.deleteWarehouse2(id)
    }


    fun addWarehouse1(warehouse: Warehouse) {
        goodRepository.addWarehouse1(warehouse)
    }

    fun addWarehouse2(warehouse: Warehouse) {
        goodRepository.addWarehouse2(warehouse)
    }

    fun deleteSale(id: Int) {
        goodRepository.deleteSale(id)
    }

    fun deleteGood(id: Int) {
        goodRepository.deleteGood(id)
    }

    fun getAllWarehouse1Goods(): List<Warehouse> {
        return goodRepository.getAllWarehouse1Goods()
    }

    fun getAllWarehouse2Goods(): List<Warehouse> {
        return goodRepository.getAllWarehouse2Goods()
    }
}