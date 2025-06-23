import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import Navbar from "./Navbar";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const Home = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const quickActions = [
    {
      icon: "article",
      title: "Manage Content",
      desc: "Add, edit, or remove content from your website.",
      link: "#",
      linkText: "Go to Content",
    },
    {
      icon: "insights",
      title: "View Analytics",
      desc: "Analyze website performance and user behavior.",
      link: "#",
      linkText: "Go to Analytics",
    },
    {
      icon: "settings",
      title: "Update Settings",
      desc: "Configure website settings and preferences.",
      link: "#",
      linkText: "Go to Settings",
    },
  ];

  useEffect(() => {
    axios.get("https://portfolio-server-vaibhav.vercel.app/visit-stats")
      .then((res) => {
        const data = res.data;

        if (!Array.isArray(data) || data.length === 0) {
          console.warn("No visit data found");
          return;
        }

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        data.sort((a, b) => {
          if (a._id.year !== b._id.year) {
            return a._id.year - b._id.year;
          }
          return a._id.month - b._id.month;
        });

        const labels = data.map(d => `${monthNames[d._id.month - 1]} ${d._id.year}`);
        const counts = data.map(d => d.count);

        setChartData({
          labels,
          datasets: [
            {
              label: "Website Engagement",
              data: counts,
              borderColor: "#0c7ff2",
              backgroundColor: "rgba(12, 127, 242, 0.2)",
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "#0c7ff2",
              pointBorderColor: "#fff",
              pointRadius: 5,
            }
          ]
        });
      })
      .catch((err) => {
        console.error("Error fetching visit stats:", err);
      });
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#e5e7eb" },
        ticks: { color: "#374151" }
      },
      x: {
        grid: { display: false },
        ticks: { color: "#374151" }
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-['Inter','Noto Sans',sans-serif'] flex">
      <Navbar />
      <div className="flex-1 flex flex-col min-h-screen ml-0 md:ml-64">
        <main className="flex-1 px-4 sm:px-6 lg:px-10 xl:px-16 py-8">
          <div className="max-w-screen-xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Dashboard Overview</h2>

            <div className="bg-white rounded-xl border border-[#dbe0e6] shadow p-6 mb-10">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-lg font-semibold">Website Engagement</p>
                  <p className="text-sm text-[#60758a]">By Month</p>
                </div>
              </div>
              <Line data={chartData} options={chartOptions} height={150} />
            </div>

            <h3 className="text-2xl font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickActions.map((action, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-[#dbe0e6] shadow flex flex-col overflow-hidden"
                >
                  <div className="p-6 flex-grow">
                    <div className="flex items-center mb-3">
                      <span className="material-icons-outlined text-3xl text-[#0c7ff2] mr-3">
                        {action.icon}
                      </span>
                      <h4 className="text-lg font-semibold">{action.title}</h4>
                    </div>
                    <p className="text-sm text-[#60758a] mb-6">{action.desc}</p>
                  </div>
                  <div className="p-4 bg-gray-50 border-t border-[#dbe0e6]">
                    <a
                      href={action.link}
                      className="flex w-full items-center justify-center rounded-lg h-10 px-5 bg-[#0c7ff2] text-white text-sm font-medium hover:bg-blue-700 transition"
                    >
                      <span className="truncate">{action.linkText}</span>
                      <span className="material-icons-outlined text-lg ml-2">arrow_forward</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
