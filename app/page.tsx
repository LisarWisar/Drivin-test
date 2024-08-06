import Table from "./ui/vehicles-table/table";
import Pagination from "./ui/vehicles-table/pagination";
import CarFilters from "./ui/vehicles-table/filters";
import { FetchAllData, GetFilterOptions} from "./lib/utils";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    class?: string;
    make?: string;
    model?: string;
    year?: number;
    transmission?: string;
    min_mpg?: number;
    max_mpg?: number;
    mpg_type?: string
  };
}) {

  const currentPage = Number(searchParams?.page) || 1;
  const carsData = await FetchAllData({
    "class": searchParams?.class || null,
    "make": searchParams?.make || null,
    "model": searchParams?.model || null,
    "year": searchParams?.year || null,
    "transmission": searchParams?.transmission || null,
    "min_mpg": searchParams?.min_mpg || null,
    "max_mpg": searchParams?.max_mpg || null,
    "mpg_type": searchParams?.mpg_type || null
  });
  const nonFilteredCarsData = await FetchAllData({});
  const totalPages = Math.ceil(carsData.length/20);
  let filterOptions = GetFilterOptions(nonFilteredCarsData); //Get list of non-repeating possible options. Must fetch again because the non filtered results are required

  return (
    <div className="w-full py-14 px-6 bg-white">
      <div className="mt-5 flex w-full justify-center">
        { <Pagination totalPages={totalPages} /> }
      </div>
      <div>
        <CarFilters filters={filterOptions}/>
      </div>
      <div className="flex min-h-screen my-4">
        <Table data={carsData} currentPage={currentPage}/>
      </div>
      <div className="mt-5 flex w-full justify-center">
        { <Pagination totalPages={totalPages} /> }
      </div>
  </div>
  );
}
