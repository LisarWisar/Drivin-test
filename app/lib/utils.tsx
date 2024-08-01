
export default function TestData () {
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

export interface FiltersInterface {
    class?: string;
    make?: string;
    model?: string;
    year?: number;
    transmission?: string;
}