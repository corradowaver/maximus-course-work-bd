package com.example.wholesale_company_oracle_db.controllers

import oracle.jdbc.OracleDatabaseException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import java.sql.SQLException


@ControllerAdvice
class ExceptionHandlerAdvice {
    @ExceptionHandler(SQLException::class)
    fun handleException(e: SQLException): ResponseEntity<*> {
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body<String>(e.message)
    }
}