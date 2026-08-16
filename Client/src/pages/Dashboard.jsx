import React, { useEffect, useState } from "react";
import { dummyCreationData } from "../assets/assets";
import { ChartColumnStacked, Gem } from "lucide-react";
import { Protect } from "@clerk/clerk-react";
import { CreationItems } from "../components/CreationItems";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creation, setCreation] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/user/get-user-creations", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setCreation(data.creations);
      } else {
        toast.error(
          data.message || "Failed to fetch creations. Please try again.",
        );
      }
    } catch (error) {
      toast.error(
        error.message ||
          "An error occurred while fetching creations. Please try again.",
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        {/*Total Creation Card*/}

        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-xl font-semibold">{creation.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex items-center justify-center">
            <ChartColumnStacked className="w-5 text-white" />
          </div>
        </div>

        {/*Active Plan Card*/}

        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Active Plan</p>
            <h2 className="text-xl font-semibold">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex items-center justify-center">
            <Gem className="w-5 text-white" />
          </div>
        </div>
      </div>

      {loading ? (
        <div className=" flex items-center justify-center h-3/4">
          <div className='animate-spin rounded-full h-11 w-11 border-3 border-purple-500 border-t-transparent'></div>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="mt-6 mb-4">Recent Creations</p>
          {creation.map((item) => (
            <CreationItems key={item.id} item={item} />
          ))}
        </div>
      )}
 </div>
 

  )
}

export default Dashboard
