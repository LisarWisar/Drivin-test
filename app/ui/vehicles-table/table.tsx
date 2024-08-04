"use client";

import React from "react";
import { useState } from "react";

import { FiltersInterface, CarsDataInterface} from "@/app/lib/utils";

export default function Table ({
    data,
    filters,
    currentPage,
  }: {
    data: CarsDataInterface[];
    filters: FiltersInterface;
    currentPage: number;
  }) {

    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    //const data = TestData(); //test data of 40 entries
    const firstIndex = (currentPage-1)*20;
    const lastIndex = Math.min((currentPage*20),data.length);

    const sortedVehicles = [...data].sort((a, b) => {
        if (sortColumn) {
            if (sortOrder === "asc") {
                return a[sortColumn] < b[sortColumn] ? -1 : 1;
            } else {
                return a[sortColumn] > b[sortColumn] ? -1 : 1;
            }
        } else {
            return 0;
        }
    }).slice(firstIndex, lastIndex);

    const handleSort = (column: string | null) => {
        if (sortColumn === column) {
          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
          setSortColumn(column);
          setSortOrder("asc");
        }
      };
    

    return(
        <table className="min-w-full">
            <thead>
                <tr>
                    <th scope="col" onClick={() => handleSort("class")}>
                        Tipo de auto
                    </th>
                    <th scope="col" onClick={() => handleSort("fuel_type")}>    
                        Tipo de combustible
                    </th> 
                    <th scope="col" onClick={() => handleSort("make")}>
                        Marca
                    </th> 
                    <th scope="col" onClick={() => handleSort("model")}>
                        Modelo
                    </th> 
                    <th scope="col" onClick={() => handleSort("year")}>
                        Año
                    </th> 
                    <th scope="col" onClick={() => handleSort("transmission")}>
                        Tipo de transmisión
                    </th>
                    <th scope="col" onClick={() => handleSort("city_mpg")}>
                        Consumo en ciudad
                    </th>  
                    <th scope="col" onClick={() => handleSort("highway_mpg")}>
                        Consumo en carretera
                    </th>  
                    <th scope="col" onClick={() => handleSort("combination_mpg")}>
                        Consumo mixto
                    </th>  
                </tr>
            </thead>
            <tbody>
                {sortedVehicles.map((car, index) => ( //Caution, API response has no id column, must be added manually
                    <tr key={index}>
                        <td>{car.class}</td>
                        <td>{car.fuel_type}</td>
                        <td>{car.make}</td>
                        <td>{car.model}</td>
                        <td>{car.year}</td>
                        <td>{car.transmission}</td>
                        <td>{car.city_mpg}</td>
                        <td>{car.highway_mpg}</td>
                        <td>{car.combination_mpg}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

