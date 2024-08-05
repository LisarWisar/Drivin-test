import ApiKey from "@/api-key";

export function TestData () {
    let newData = [];
    for (let i = 0; i < 30; i++){
        newData.push({
            "class": "clase",
            "fuel_type": "combustible",
            "make": "Toyota",
            "model": "Camry",
            "year": (i+1).toString(),
            "transmission": "manual",
            "city_mpg": "40 mpg",
            "highway_mpg": "30 mpg",
            "combination_mpg": "20 mpg"
        })
    }
    for (let i = 0; i < 20; i++){
        newData.push({
            "class": "clase12312",
            "fuel_type": "combustible1232112312312312312",
            "make": "Toyota",
            "model": "Camry",
            "year": (i+1).toString(),
            "transmission": "manual123123",
            "city_mpg": "40 mpg",
            "highway_mpg": "30 mpg",
            "combination_mpg": "20 mpg"
        })
    }
    return newData;
}

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
    let data: any = [];
    if(!filters["model"]){
        for (let i = 0; i < carModels.length; i++){
            filters["model"] = carModels[i];
            const tempData = await FetchSpecificModel(filters);
            data = data.concat(tempData);
        }
    }
    else{
        data = await FetchSpecificModel(filters);
    }
    
    return data;
}

export const generatePagination = (currentPage: number, totalPages: number) => {
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


export interface FiltersInterface {
    [key: string]: any;
    class?: string | null;
    make?: string | null;
    model?: string | null;
    year?: number | null;
    transmission?: string | null;
}

export interface CarsDataInterface {
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