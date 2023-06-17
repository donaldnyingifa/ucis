import React, { useEffect, useState, useMemo, useRef } from "react";
import * as echarts from 'echarts';
import { Row, Col } from "react-bootstrap";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Table from "../../components/table";
import "./dashboard.scss";

function Dashboard() {
  const chartRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const initialData = useMemo(
    () => [
      {
        name: "Star Wars",
        gender: "male",
        dob: "Sat Jun 17 2010 22:13:21 GMT+0100",
        income: "₦470,000",
      },
      {
        name: "John Doe",
        gender: "female",
        dob: "Sat Jun 17 2000 22:13:21 GMT+0100",
        income: "₦760,000",
      },
      {
        name: "Andrew Tate",
        gender: "male",
        dob: "Sat Jun 17 2003 22:13:21 GMT+0100",
        income: "₦550,000",
      },
      {
        name: "Papa Tate",
        gender: "male",
        dob: "Sat Jun 17 1943 22:13:21 GMT+0100",
        income: "₦400,000",
      },
      {
        name: "Papa Andrew",
        gender: "male",
        dob: "Sat Jun 17 1930 22:13:21 GMT+0100",
        income: "₦640,000",
      },
      {
        name: "Papa Joe",
        gender: "male",
        dob: "Sat Jun 17 1940 22:13:21 GMT+0100",
        income: "₦500,000",
      },
    ],
    []
  );

  const [filteredData, setFilteredData] = useState(initialData);

  const searchName = (searchValue) => {
    if (searchValue.length > 0) {
      const filtered = initialData.filter((person) =>
        person.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(initialData); // Show all data when searchValue is empty
    }
  };

  // Calculate the average income
const totalIncome = initialData.reduce(
  (sum, person) => sum + parseFloat(person.income.replace("₦", "").replace(",", "")),
  0
);
const averageIncome = totalIncome / initialData.length;
const formattedAverageIncome = averageIncome.toLocaleString("en-NG", { style: "currency", currency: "NGN" });
// Retrieve the top 5 incomes
const sortedData = [...initialData];
sortedData.sort((a, b) => {
  const incomeA = parseFloat(a.income.replace("₦", "").replace(",", ""));
  const incomeB = parseFloat(b.income.replace("₦", "").replace(",", ""));
  return incomeB - incomeA;
});
// const top5Incomes = sortedData.slice(0, 5).map((person) => parseFloat(person.income.replace("₦", "").replace(",", "")));

// console.log("Average Income:", formattedAverageIncome);
// console.log("Top 5 Incomes:", top5Incomes);

  useEffect(() => {
    setFilteredData(initialData);
  }, [initialData]);

  const calculateAgeGroup = (dob) => {
    const currentDate = new Date();
    const birthDate = new Date(dob);
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age >= 18 && age <= 70 ) {
      return "adult";
    } else if (age < 18) {
      return "child";
    } else {
      return "aged";
    }
  };
  
  const calculateStatistics = (data) => {
    let menCount = 0;
    let womenCount = 0;
    let childrenCount = 0;
    let agedCount = 0;
  
    data.forEach((person) => {
      const ageGroup = calculateAgeGroup(person.dob);
      if (person.gender === "male" && (ageGroup !== "child" && ageGroup !== "aged")) {
        menCount++;
      } else if (person.gender === "female" && (ageGroup !== "child" && ageGroup !== "aged" )) {
        womenCount++;
      }
  
      if (ageGroup === "child") {
        childrenCount++;
      } else if (ageGroup === "aged") {
        agedCount++;
      }
    });
  
    return {
      men: menCount,
      women: womenCount,
      children: childrenCount,
      aged: agedCount,
    };
  };
  
  const statistics = calculateStatistics(initialData);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);
    const option = {
      title: {
        text: 'Gender and Age Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: statistics.men, name: `Men ${statistics.men} ( >= 18 years and < 70 years )` },
            { value: statistics.women, name: `Women ${statistics.women}  ( >= 18 years and < 70 years )` },
            { value: statistics.children, name: `Children ${statistics.children}  ( < 18 years )` },
            { value: statistics.aged, name: `Aged ${statistics.aged}  ( > 70 years )` }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <>
      <Header />
      <div className="dashboard-wrapper">
        <Row>
          <Col>
            <Table data={filteredData} searchName={searchName} />
          </Col>
          <Col>
            <h2>Charts</h2>
            <div ref={chartRef} style={{ width: "100%", height: "400px" }} />
            <h2>Average Income: </h2> {formattedAverageIncome}
          </Col>
          
        </Row>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
