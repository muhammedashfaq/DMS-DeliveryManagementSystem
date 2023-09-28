import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { RouteObjects } from "../../Routes/RouteObject";
import { adminreports ,getAllDashboardData} from "./adminutil/api";

const AdminDashboard = () => {
  const rupeeSymbol = "\u20B9";

  const navigate = useNavigate();
  const [pieChart,setPieChat]=useState([])
  const [selectedCity, setSelectedCity] = useState("All");
  const [amt, setamt] = useState(null);
  const [deliverCount, setDeliverycount] = useState(null);
  const [unDeliveryCount, stUnDeliveryCount] = useState(null);
  const [user, setUser] = useState(null);
  const [hubCount, setHubCount] = useState(null);
  const [shipmentCount, setShipmentCount] = useState(null);
  const [shipment, setShipment] = useState([]);
  const [deliverByMonth, setdeliveryByMonth] = useState([]);

  const fetchDataByHub = async (city) => {
    try {
      const response = await adminreports(city);

      if (response.data.success) {
        toast.success(response.data.message);
        setamt(response.data.totalAdvanceAmount);
        setDeliverycount(response.data.totalDeliveredShipment);
        stUnDeliveryCount(response.data.totalUndeliveredShipments);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
      localStorage.removeItem("admintoken");
      navigate(RouteObjects.AdminLogin);
    }
  };
  const handleCitySelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedCity(selectedValue);
    fetchDataByHub(selectedValue);
  };



  const getFullData = async () => {

    try {
      
      const response = await getAllDashboardData()
      if (response.data.success) {
        toast.success(response.data.message);
        setUser(response.data.user);
        setHubCount(response.data.hubCount);
        setShipment(response.data.shipment);
        setShipmentCount(response.data.shipmentcount);
        setHub(response.data.hub);
        setdeliveryByMonth(response.data.shipmentCountByMonth);
        setPieChat(response.data.deliveredShipmentCountpie)
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      toast.error("Something went wrong");
      localStorage.removeItem("admintoken");
      navigate(RouteObjects.AdminLogin);
      
    }
    
  };

  useEffect(() => {
    getFullData();
    fetchDataByHub("All");
  }, []);

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Total Shipment Delivered",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        name: "Month",
        categories: [],
      },
    },
  });
  useEffect(() => {
    if (deliverByMonth !== null) {
      const counts = deliverByMonth.map((shipment) => shipment.count);
      const months = deliverByMonth.map((shipment) => shipment.month);

      setChartData({
        ...chartData,
        series: [
          {
            data: counts,
          },
        ],
        options: {
          xaxis: {
            categories: months,
          },
        },
      });
    }
  }, [deliverByMonth]);

  // pie chart
  const [hub, setHub] = useState([]);

  const [chartDataPie, setChartDataPie] = useState({
    series: [],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      title: {
        text: "Product Trends by Month",
        align: "middle",
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {

    const labels = pieChart
    .filter((hubName) => hubName._id !== null)
    .map((hubName) => hubName._id);    
    const series = pieChart.map((count) => count.count);

    setChartDataPie((prevChartDataPie) => ({
      ...prevChartDataPie,
      series:series,
      options: {
        ...prevChartDataPie.options,
        labels: labels,
      },
    }));
  }, [pieChart]);
  return (
    <div className="container ">
      <div className="grid grid-cols-3 mt-9 ">
        <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
          <div className="space-y-4 text-center divide-y divide-gray-700">
            <div className="my-2 space-y-1">
              <h2 className="text-xl font-semibold sm:text-2xl">{user}</h2>
              <p className="px-5 text-xs sm:text-base dark:text-gray-400">
                Total User
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
          <div className="space-y-4 text-center divide-y divide-gray-700">
            <div className="my-2 space-y-1">
              <h2 className="text-xl font-semibold sm:text-2xl">{hubCount}</h2>
              <p className="px-5 text-xs sm:text-base dark:text-gray-400">
                Total Hub
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
          <div className="space-y-4 text-center divide-y divide-gray-700">
            <div className="my-2 space-y-1">
              <h2 className="text-xl font-semibold sm:text-2xl">
                {shipmentCount}
              </h2>
              <p className="px-5 text-xs sm:text-base dark:text-gray-400">
                Total Shipment
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 p-4 mt-8 ">
        <div id="chart">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={350}
          />
        </div>
        <div id="chart" className="flex justify-center items-center">
          <Chart
            options={chartDataPie.options}
            series={chartDataPie.series}
            type="pie"
            width={380}
          />
        </div>
      </div>

      <div className="flex justify-center mt-2 ">
        <h1 className=" pt-4 mt-2 font-serif font-extrabold text-2xl underline text-orange-600">
          Reports From {selectedCity} Hub
        </h1>
      </div>
      <div className="border-1 border-sky-100 rounded-md  flex justify-center mt-10  p-2 mb-16  shadow-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th>
                <select
                  className="w-40 bg-gray-200 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 font-mono"
                  onChange={handleCitySelect}
                  value={selectedCity}
                >
                  <option value="All">-- All --</option>
                  {hub.map((hubItem, i) => (
                    <option key={i} value={hubItem.city}>
                      {hubItem.city}
                    </option>
                  ))}
                </select>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="  divide-gray-200  font-semibold bg-slate-200 text-lg">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap border-b-2 border-sky-950 ">
                Total Advance Collected from {selectedCity} Hub
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-b-2 border-sky-950 shadow-inner bg-slate-100">
                {rupeeSymbol}
                {amt}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap  border-b-2 border-sky-950 ">
                Total Shipment Delivered from {selectedCity} Hub
              </td>
              <td className="px-6 py-4 whitespace-nowrap  border-b-2 border-sky-950 shadow-inner bg-slate-100">
                {deliverCount}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap  border-b-2 border-sky-950  ">
                Total Pending Pending Delivery from {selectedCity} Hub
              </td>
              <td className="px-6 py-4 whitespace-nowrap  border-b-2 border-sky-950 shadow-inner bg-slate-100">
                {unDeliveryCount}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
