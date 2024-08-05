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

      const sortSvg = (column: string) =>
        sortColumn === column ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
          >
            {sortOrder === "asc" ? (
              <path d="M7 10l5 5 5-5z" />
            ) : (
              <path d="M7 14l5-5 5 5z" />
            )}
    
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        ) : null;

    return(
        <table className="min-w-full border-collapse text-left rounded-lg overflow-hidden items-start">
            <thead className="bg-blue-100">
                <tr>
                    <th scope="col" onClick={() => handleSort("class")} className="p-2 w-2/12">
                        <div className="flex  flex-row items-center">
                            <p>Tipo de auto</p>
                            {sortSvg("class")}
                        </div>
                    </th>
                    <th scope="col" onClick={() => handleSort("fuel_type")}  className="p-2  w-2/12">  
                        <div className="flex flex-row items-center">  
                            <p>Tipo de combustible</p>
                            {sortSvg("fuel_type")}
                        </div>
                    </th> 
                    <th scope="col" onClick={() => handleSort("make")} className="p-2 w-1/12">
                        <div className="flex flex-row items-center">
                            <p>Marca</p>
                            {sortSvg("make")}
                        </div>
                    </th> 
                    <th scope="col" onClick={() => handleSort("model")} className="p-2 w-2/12">
                        <div className="flex flex-row items-center">
                            <p>Modelo</p>
                            {sortSvg("model")}
                        </div>
                    </th> 
                    <th scope="col" onClick={() => handleSort("year")} className="p-2 w-1/12">
                        <div className="flex flex-row items-center">
                            <p>Año</p>
                            {sortSvg("year")}
                        </div>
                    </th> 
                    <th scope="col" onClick={() => handleSort("transmission")} className="p-2 w-1/12">
                        <div className="flex flex-row items-center">
                            <p>Tipo de transmisión</p>
                            {sortSvg("transmission")}
                        </div>
                    </th>
                    <th scope="col" onClick={() => handleSort("city_mpg")} className="p-2 w-1/12">
                        <div className="flex flex-row items-center">
                            <p>Consumo en ciudad</p>
                            {sortSvg("city_mpg")}
                        </div>
                    </th>  
                    <th scope="col" onClick={() => handleSort("highway_mpg")} className="p-2 w-1/12">
                        <div className="flex flex-row items-center">
                            <p>Consumo en carretera</p>
                            {sortSvg("highway_mpg")}
                        </div>
                    </th>  
                    <th scope="col" onClick={() => handleSort("combination_mpg")} className="p-2 w-1/12">
                        <div className="flex flex-row items-center">
                            <p>Consumo mixto</p>
                            {sortSvg("combination_mpg")}
                        </div>
                    </th>  
                </tr>
            </thead>
            <tbody className="bg-white">
                {sortedVehicles.map((car, index) => (
                    <tr key={index}>
                        <td className="pl-3 py-2.5 border-b-2 border-blue-50">{car.class}</td>
                        <td className="pl-3 py-2.5 border-b-2 border-blue-50">{car.fuel_type}</td>
                        <td className="pl-3 py-2.5 border-b-2 border-blue-50">{car.make}</td>
                        <td className="pl-3 py-2.5 border-b-2 border-blue-50">{car.model}</td>
                        <td className="pl-3 py-2.5 border-b-2 border-blue-50">{car.year}</td>
                        <td className="pl-3 py-2.5 border-b-2 border-blue-50">{car.transmission}</td>
                        <td className="pl-3 py-2.5 border-b-2 border-blue-50">{car.city_mpg}</td>
                        <td className="pl-3 py-2.5 border-b-2 border-blue-50">{car.highway_mpg}</td>
                        <td className="pl-3 py-2.5 border-b-2 border-blue-50">{car.combination_mpg}</td>
                    </tr>
                ))}
                <tr className="h-full"></tr>
            </tbody>
        </table>
    )
}