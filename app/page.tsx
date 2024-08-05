import Table from "./ui/vehicles-table/table";
import { FetchAllData, FetchSpecificModel} from "./lib/utils";
import Pagination from "./ui/vehicles-table/pagination";

import { TestData } from "./lib/utils"; //Delete after testing

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {

  const currentPage = Number(searchParams?.page) || 1;
  //const carsData = await FetchAllData({"limit": 50});
  const carsData = TestData();
  const totalPages = Math.ceil(carsData.length/20);

  return (
    <div className="w-full py-14 px-6 bg-white">
      <div className="mt-5 flex w-full justify-center">
        { <Pagination totalPages={totalPages} /> }
      </div>
      <div className="flex min-h-screen my-4">
        <Table data={carsData} filters={{}} currentPage={currentPage}/>
      </div>
      <div className="mt-5 flex w-full justify-center">
        { <Pagination totalPages={totalPages} /> }
      </div>
  </div>
  );
}
