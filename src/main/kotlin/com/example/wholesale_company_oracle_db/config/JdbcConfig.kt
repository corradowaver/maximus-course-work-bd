package com.example.wholesale_company_oracle_db.config

import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.datasource.DriverManagerDataSource
import javax.sql.DataSource

@Configuration
class JdbcConfig {

    @Bean(name = arrayOf("dataSource"))
    fun dataSource(): DataSource {
        val ds = DriverManagerDataSource()
        ds.url = "jdbc:oracle:thin:@localhost:1521:xe"
        ds.username = "c##test"
        ds.password = "test"
        return ds
    }

    @Bean
    fun jdbcTemplate(@Qualifier("dataSource") dataSource: DataSource): JdbcTemplate {
        return JdbcTemplate(dataSource)
    }
}
