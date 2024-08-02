import Table from "./ui/vehicles-table/table";
import { FetchAllData, FetchSpecificModel} from "./lib/utils";

export default function Home() {

  //FetchAllData({"limit": 2});

  return (
    <div className="flex min-h-screen p-24">
      <Table filters={{}} currentPage={1}/>
    </div>
  );
}
