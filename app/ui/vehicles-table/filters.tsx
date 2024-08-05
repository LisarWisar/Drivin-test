"use client";

import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function CarFilters({
    filters,
  }: {
    filters: any;
  }){


    const [classFilterOpen, setClassFilterOpen] = useState(false);
    const [makeFilterOpen, setMakeFilterOpen] = useState(false);
    const [modelFilterOpen, setModelFilterOpen] = useState(false);
    const [yearFilterOpen, setYearFilterOpen] = useState(false);
    const [transmissionFilterOpen, setTransmissionFilterOpen] = useState(false);

    const[classFilterSelected, setClassFilterSelected] = useState("");
    const[makeFilterSelected, setMakeFilterSelected] = useState("");
    const[modelFilterSelected, setModelFilterSelected] = useState("");
    const[yearFilterSelected, setYearFilterSelected] = useState("");
    const[transmissionFilterSelected, setTransmissionFilterSelected] = useState("");

    const toggleClassFilter = () => {setClassFilterOpen(!classFilterOpen)};
    const toggleMakeFilter = () => {setMakeFilterOpen(!makeFilterOpen)};
    const toggleModelFilter = () => {setModelFilterOpen(!modelFilterOpen)};
    const toggleYearFilter = () => {setYearFilterOpen(!yearFilterOpen)};
    const toggleTransmissionFilter = () => {setTransmissionFilterOpen(!transmissionFilterOpen)};

    const handleClassSelected = (option: string) => {setClassFilterSelected(option)}
    const handleMakeSelected = (option: string) => {setMakeFilterSelected(option)}
    const handleModelSelected = (option: string) => {setModelFilterSelected(option)}
    const handleYearSelected = (option: string) => {setYearFilterSelected(option)}
    const handleTransmissionSelected = (option: string) => {setTransmissionFilterSelected(option)}

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleFilter = (filterOption: string, term: any) => { //Add filter to URL
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
          params.set(filterOption, term);
        } else {
          params.delete(filterOption);
        }
        replace(`${pathname}?${params.toString()}`);
      };
    
    return(
        <div className="flex flex-row justify-between px-10 mt-4 text-center">
            <div className="px-2 w-1/5">
                <div className="flex justify-center">
                    <button className="h-10 w-full border p-2 rounded-lg hover:bg-gray-100" onClick={() => toggleClassFilter()}>
                        Filter by class
                    </button>
                </div>
                    {classFilterOpen && (
                        <div className="border rounded-md my-1">
                            {filters["class"].map(function (option: string) {
                                return(
                                    <div
                                    className={classFilterSelected === option ? "bg-blue-600 text-white": "hover:bg-blue-400 hover:text-white"}
                                    onClick={() => {
                                        handleFilter("class", option);
                                        handleClassSelected(option);
                                    }}>
                                        {option[0].toUpperCase()+option.slice(1)}
                                    </div>
                                )
                            })}
                            <div
                            className={classFilterSelected === "" ? "bg-blue-600 text-white": "hover:bg-blue-400 hover:text-white"}
                            onClick={() => {
                                handleFilter("class", null);
                                handleClassSelected("");
                            }}>
                                No filters
                            </div>
                        </div>
                    )}
            </div>
            <div className="px-2 w-1/5">
                <div className="flex justify-center">
                    <button className="h-10 w-full border p-2 rounded-lg hover:bg-gray-100" onClick={() => toggleMakeFilter()}>
                        Filter by make
                    </button>
                </div>
                {makeFilterOpen && (
                    <div className="border rounded-md my-1">
                        {filters["make"].map(function (option: string) {
                            return(
                                <div 
                                className={makeFilterSelected === option ? "bg-blue-600 text-white": "hover:bg-blue-400 hover:text-white"}
                                onClick={() => {
                                    handleFilter("make", option)
                                    handleMakeSelected(option);
                                }}>
                                    {option[0].toUpperCase()+option.slice(1)}
                                </div>
                                
                            )
                        })}
                        <div
                            className={makeFilterSelected === "" ? "bg-blue-600 text-white": "hover:bg-blue-400 hover:text-white"}
                            onClick={() => {
                                handleFilter("make", null);
                                handleMakeSelected("");
                            }}>
                                No filters
                        </div>
                    </div>
                )}
            </div>
            <div className="px-2 w-1/5">
                <div className="flex justify-center">
                    <button className="h-10 w-full border p-2 rounded-lg hover:bg-gray-100" onClick={() => toggleModelFilter()}>
                        Filter by model
                    </button>
                </div>
                {modelFilterOpen && (
                    <div className="border rounded-md my-1">
                        {filters["model"].map(function (option: string) {
                            return(
                                <div className={modelFilterSelected === option ? "bg-blue-600 text-white": "hover:bg-blue-400 hover:text-white"}
                                onClick={() => {
                                    handleFilter("model", option);
                                    handleModelSelected(option);
                                }}>
                                    {option[0].toUpperCase()+option.slice(1)}
                                </div>
                            )
                        })}
                        <div
                            className={modelFilterSelected === "" ? "bg-blue-600 text-white": "hover:bg-blue-400 hover:text-white"}
                            onClick={() => {
                                handleFilter("model", null);
                                handleModelSelected("");
                            }}>
                                No filters
                        </div>
                    </div>
                )}
            </div>
            <div className="px-2 w-1/5">
                <div className="flex justify-center">
                    <button className="h-10 w-full border p-2 rounded-lg hover:bg-gray-100" onClick={() => toggleYearFilter()}>
                        Filter by year
                    </button>
                </div>
                {yearFilterOpen && (
                    <div className="border rounded-md my-1">
                        {filters["year"].map(function (option: string) {
                            return(
                                <div className={yearFilterSelected === option ? "bg-blue-600 text-white": "hover:bg-blue-400 hover:text-white"}
                                onClick={() => {
                                    handleFilter("year", option);
                                    handleYearSelected(option);
                                }}>
                                    {option}
                                </div>
                            )
                        })}
                        <div
                            className={yearFilterSelected === "" ? "bg-blue-600 text-white": "hover:bg-blue-400 hover:text-white"}
                            onClick={() => {
                                handleFilter("year", null);
                                handleYearSelected("");
                            }}>
                                No filters
                        </div>
                    </div>
                )}
            </div>
            <div className="px-2 w-1/5">
                <div className="flex justify-center">
                    <button className="h-10 w-full border p-2 rounded-lg hover:bg-gray-100" onClick={() => toggleTransmissionFilter()}>
                        Filter by Transmission
                    </button>
                </div>
                {transmissionFilterOpen && (
                    <div className="border rounded-md my-1">
                        {filters["transmission"].map(function (option: string) {
                            return(
                                <div className={transmissionFilterSelected === option ? "bg-blue-600 text-white": "hover:bg-blue-400 hover:text-white"}
                                onClick={() => {
                                    handleFilter("transmission", option);
                                    handleTransmissionSelected(option);
                                }}>
                                    {option === "a" ? "Automatic": "Manual"}
                                </div>
                            )
                        })}
                        <div
                            className={transmissionFilterSelected === "" ? "bg-blue-600 text-white": "hover:bg-blue-400 hover:text-white"}
                            onClick={() => {
                                handleFilter("transmission", null);
                                handleTransmissionSelected("");
                            }}>
                                No filters
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}