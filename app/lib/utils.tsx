import ApiKey from "@/api-key";

export async function FetchSpecificModel(filters: FiltersInterface) { //Fetch for a specific model since the endpoint requires at least one filter being used

    let urlFilters = "";
    for (const key in filters){
        if(filters[key]){
            if(urlFilters.length === 0){
                urlFilters = urlFilters + `${key}=${filters[key]}`; 
            }
            else {
                urlFilters = urlFilters + `&${key}=${filters[key]}`; //Add & at the beginning if it's not the first filter
            }
        }
    }

    const url = `https://api.api-ninjas.com/v1/cars?${urlFilters}`
    
    const response = await fetch(url,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': ApiKey //Change to your own API KEY
            },
        }
    )
    .catch(error => {
        console.log('Oh No! There was a problem: \n', error);
    });
    const data = await response.json();
    
    return data;
}

export async function FetchAllData (filters: FiltersInterface){
    
    //const carModels = ["camry", "yaris", "a4", "a3", "accent", "mustang"]
    const carModels = ["camry"] //models have to be manually typed because endpoints for carmakes and carmodels are behind a paywall on api-ninjas
    const carFilters: FiltersInterface = {"limit": "50"};
    let data: any = []
        for (let i = 0; i < carModels.length; i++){
            carFilters["model"] = carModels[i];
            const tempData = await FetchSpecificModel(carFilters);
            data = data.concat(tempData);
        }

    let filteredData: any = [];
    if (Object.keys(filters).length !== 0){ //Apply filters if there are any
        for (let index in data){
            if(data[index]["class"] === filters["class"] || !filters["class"]){
                if(data[index]["make"] === filters["make"] || !filters["make"]){
                    if(data[index]["model"] === filters["model"] || !filters["model"]){
                        if(data[index]["year"]?.toString()  === filters["year"]?.toString() || !filters["year"]){
                            if(data[index]["transmission"] === filters["transmission"] || !filters["transmission"]){
                                if((data[index][filters["mpg_type"]] >= filters["min_mpg"] || !filters["min_mpg"]) || !filters["mpg_type"]){
                                    if((data[index][filters["mpg_type"]] <= filters["max_mpg"] || !filters["max_mpg"]) || !filters["mpg_type"])
                                        filteredData.push(data[index]);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    else {
        filteredData = data
    }

    return filteredData;
}

export function generatePagination (currentPage: number, totalPages: number) {
    // If the total number of pages is 7 or less,
    // display all pages without any ellipsis.
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
  
    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages - 1, totalPages];
    }
  
    // If the current page is among the last 3 pages,
    // show the first 2, an ellipsis, and the last 3 pages.
    if (currentPage >= totalPages - 2) {
      return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }
  
    // If the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and its neighbors,
    // another ellipsis, and the last page.
    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ];
  };

  export function GetFilterOptions (data: CarsDataInterface[]) {

    let filters: FiltersDataInterface = {
        "class": new Set(),
        "make": new Set(),
        "model": new Set(),
        "year": new Set(),
        "transmission": new Set()
    }

    for (let car in data){
        for (let key in data[car]){  //Add filters to temporary set to eliminate duplicates
            switch(key){
                case "class":
                    filters[key].add(data[car][key])
                    break;
                case "make":
                    filters[key].add(data[car][key])
                    break;
                case "model":
                    filters[key].add(data[car][key])
                    break;
                case "year":
                    filters[key].add(data[car][key])
                    break;
                case "transmission":
                    filters[key].add(data[car][key])
                    break;
            }
        }
    }
    let filtersArrays = { //Turn sets back to array to allow use of array functions
        "class": Array.from(filters["class"]),
        "make": Array.from(filters["make"]),
        "model": Array.from(filters["model"]),
        "year": Array.from(filters["year"]),
        "transmission": Array.from(filters["transmission"])
    };
    
    return filtersArrays;
}

export interface FiltersDataInterface{ //Data to be shown on the filters menu
    [key: string]: any;
    "class": Set<string>,
    "make": Set<string>,
    "model": Set<string>,
    "year": Set<number>,
    "transmission": Set<string>
}

export interface FiltersInterface { //Filters selected by the user
    [key: string]: any;
    class?: string | null;
    make?: string | null;
    model?: string | null;
    year?: number | null;
    transmission?: string | null;
}

export interface CarsDataInterface { //Data received from the API
        [key: string]: any;
        city_mpg: number;
        class: string;
        combination_mpg: number;
        cylinders: number;
        displacement: number;
        drive: string;
        fuel_type: string;
        highway_mpg: number;
        make: string;
        model: string;
        transmission: string;
        year: number;
}