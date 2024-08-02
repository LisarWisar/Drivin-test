import ApiKey from "@/api-key";

export function TestData () {
    let newData = [];
    for (let i = 0; i < 40; i++){
        newData.push({
            "id": i+1, //API has no id
            "class": "clase",
            "fuel_type": "combustible",
            "make": "Toyota",
            "model": "Camry",
            "year": i+1,
            "transmission": "manual",
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
    const carModels = ["camry", "yaris"] //models have to be manually typed because endpoints for carmakes and carmodels are behind a paywall on api-ninjas
    let data: any = []; //check option to declaring data of type any
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


export interface FiltersInterface {
    [key: string]: any;
    class?: string | null;
    make?: string | null;
    model?: string | null;
    year?: number | null;
    transmission?: string | null;
}