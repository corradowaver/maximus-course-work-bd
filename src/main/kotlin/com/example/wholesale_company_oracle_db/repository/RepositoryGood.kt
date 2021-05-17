package com.example.wholesale_company_oracle_db.repository

import com.example.wholesale_company_oracle_db.entity.Demand
import com.example.wholesale_company_oracle_db.entity.Good
import com.example.wholesale_company_oracle_db.entity.Sale
import com.example.wholesale_company_oracle_db.entity.Warehouse
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Repository
import java.sql.ResultSet
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.*

@Repository
class RepositoryGood(@Autowired var jdbcTemplate: JdbcTemplate) {

    fun getAllGoods(): List<Good> = jdbcTemplate.query("SELECT * FROM GOODS",
            { rs: ResultSet, _: Int ->
                Good(rs.getString("ID").toInt(), rs.getString("NAME"),
                    rs.getString("PRIORITY").toByte())
            })

    fun getFiveTheMostPopularGoods(): List<Good> = jdbcTemplate.query("SELECT * FROM (SELECT good_id, name, priority FROM sales JOIN goods ON sales.good_id = goods.id " +
            "GROUP BY good_id, priority, name ORDER BY SUM(good_count) DESC) WHERE ROWNUM < 6",
        { rs: ResultSet, _: Int ->
            Good(rs.getString("good_id").toInt(), rs.getString("NAME"),
                rs.getString("PRIORITY").toByte())
        })

    fun getGoodDemand(id: Int, lhsDate: String, rhsDate: String): List<Demand> = jdbcTemplate.query(" SELECT CREATE_DATE, SUM(good_count) " +
            "as demand FROM sales JOIN goods ON sales.good_id = goods.id" +
            "  WHERE CREATE_DATE >= '${lhsDate}' AND CREATE_DATE <= '${rhsDate}' AND good_id = ${id} GROUP BY CREATE_DATE ORDER BY CREATE_DATE",
    {
        rs: ResultSet, _: Int ->
        Demand(
            LocalDate.parse(rs.getString("CREATE_DATE"), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss", Locale.ENGLISH)).toString(),
            rs.getString("DEMAND").toInt()
        )
    })

    fun deleteGood(id: Int) {
        jdbcTemplate.execute("DELETE FROM GOODS WHERE ID = ${id}")
    }

    fun deleteSale(id: Int) {
        jdbcTemplate.execute("DELETE FROM SALES WHERE ID = ${id}")
    }

    fun deleteWarehouse1(id: Int) {
        jdbcTemplate.execute("DELETE FROM WAREHOUSE1 WHERE ID = ${id}")
    }

    fun deleteWarehouse2(id: Int) {
        jdbcTemplate.execute("DELETE FROM WAREHOUSE2 WHERE ID = ${id}")
    }

    fun addWarehouse1(warehouse: Warehouse) {
        jdbcTemplate.update("INSERT INTO WAREHOUSE1(good_count, good_id)" +
                " VALUES(?, ?)", warehouse.good_count, warehouse.good_id)
    }

    fun addWarehouse2(warehouse: Warehouse) {
        jdbcTemplate.update("INSERT INTO WAREHOUSE2(good_count, good_id)" +
                " VALUES(?, ?)", warehouse.good_count, warehouse.good_id)
    }

    fun addGood(good: Good) {

            if (good.id == -1) {
                jdbcTemplate.update("INSERT INTO GOODS(name, priority)" +
                        " VALUES(?, ?)", good.name, good.priority)
            } else {
                jdbcTemplate.update("UPDATE GOODS SET name = ?, priority = " +
                            "? WHERE ID = ?", good.name, good.priority, good.id)
            }
    }

    fun addSale(sale: Sale) {
        if (sale.id == -1) {
            jdbcTemplate.update("INSERT INTO SALES(good_count, create_date, good_id) " +
                    "VALUES(?, ?, ?)", sale.good_count, sale.create_date, sale.good_id)
        } else {
            jdbcTemplate.update("UPDATE SALES SET GOOD_COUNT = ?, CREATE_DATE = " +
                    "?, GOOD_ID = ? WHERE ID = ?", sale.good_count, sale.create_date, sale.good_id, sale.id)
        }
    }

    fun getGoodById(id: Int): Good {
        val rowMapper: RowMapper<Good> = RowMapper<Good> { rs: ResultSet, rowIndex: Int ->
            Good(rs.getString("ID").toInt(), rs.getString("NAME"),
                rs.getString("PRIORITY").toByte())
        }
        val sql: String = "SELECT * FROM GOODS WHERE id = ${id}";
        val results = jdbcTemplate.query(sql, rowMapper)

        return results[0];
    }

    fun getSaleById(id: Int): Sale {
        val rowMapper: RowMapper<Sale> = RowMapper<Sale> { rs: ResultSet, rowIndex: Int ->
            Sale(rs.getString("ID").toInt(), rs.getString("GOOD_COUNT").toInt(),
                LocalDate.parse(rs.getString("CREATE_DATE"), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss", Locale.ENGLISH)).toString(), rs.getString("GOOD_ID").toInt(),
                rs.getString("NAME"), rs.getString("PRIORITY").toByte())
        }
        val sql: String = "SELECT sales.id as id, good_count, create_date, "+
                "good_id, NAME, PRIOrity FROM Sales JOIN goods ON GOODS.id = Sales.good_id WHERE sales.id = ${id}";
        val results = jdbcTemplate.query(sql, rowMapper)

        return results[0];
    }

    fun getAllSales(): List<Sale> = jdbcTemplate.query("SELECT sales.id as id, good_count, create_date, " +
            "good_id, NAME, PRIOrity FROM Sales JOIN goods ON GOODS.id = Sales.good_id",
        { rs: ResultSet, _: Int ->
            Sale(rs.getString("ID").toInt(), rs.getString("GOOD_COUNT").toInt(),
                LocalDate.parse(rs.getString("CREATE_DATE"), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss", Locale.ENGLISH)).toString(), rs.getString("GOOD_ID").toInt(),
                rs.getString("NAME"), rs.getString("PRIORITY").toByte())
        })

    fun getAllWarehouse1Goods(): List<Warehouse> = jdbcTemplate.query("SELECT good_id,  NAME, PRIOrity, SUM(good_count) as good_count FROM GOODS JOIN warehouse1" +
            " ON GOODS.id = warehouse1.good_id GROUP BY good_id, NAME, PRIOrity",
        { rs: ResultSet, _: Int ->
            Warehouse(rs.getString("good_id").toInt(),  rs.getString("NAME"),
                rs.getString("PRIORITY").toByte(), rs.getString("GOOD_COUNT").toInt())
        })

    fun getAllWarehouse2Goods(): List<Warehouse> = jdbcTemplate.query("SELECT good_id,  NAME, PRIOrity, SUM(good_count) as good_count FROM GOODS JOIN warehouse2" +
            " ON GOODS.id = warehouse2.good_id GROUP BY good_id, NAME, PRIOrity",
        { rs: ResultSet, _: Int ->
            Warehouse(rs.getString("good_id").toInt(), rs.getString("NAME"),
                rs.getString("PRIORITY").toByte(), rs.getString("GOOD_COUNT").toInt())
        })
}

