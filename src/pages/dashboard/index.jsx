import React, { useEffect, useState, useRef } from "react";
import * as echarts from "echarts";
import { database, ref, child, get } from "../../firebase";
import { Row, Col } from "react-bootstrap";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Table from "../../components/table";
import "./dashboard.scss";

function convertObjectToArray(object) {
    return Object.keys(object).map((id) => {
        const item = object[id];
        return { id, ...item };
    });
}

function Dashboard() {
    const [initialData, setinitialData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        const dbRef = ref(database);
        get(child(dbRef, "registeredUsers"))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setinitialData(convertObjectToArray(snapshot.val()));
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });

        window.scrollTo(0, 0);
    }, []);

    const searchName = (searchValue) => {
        if (searchValue.length > 0) {
            const filtered = initialData.filter((person) =>
                person.name.toLowerCase().includes(searchValue.toLowerCase()),
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(initialData); // Show all data when searchValue is empty
        }
    };

    // Calculate the average income
    const totalIncome = initialData.reduce(
        (sum, person) => sum + parseFloat(person.income.replace("₦", "").replace(",", "")),
        0,
    );
    const averageIncome = totalIncome / initialData.length;
    const formattedAverageIncome = averageIncome.toLocaleString("en-NG", {
        style: "currency",
        currency: "NGN",
    });
    // Retrieve the top 5 incomes
    const sortedData = [...initialData];
    sortedData.sort((a, b) => {
        const incomeA = parseFloat(a.income.replace("₦", "").replace(",", ""));
        const incomeB = parseFloat(b.income.replace("₦", "").replace(",", ""));
        return incomeB - incomeA;
    });

    useEffect(() => {
        setFilteredData(initialData);
    }, [initialData]);

    const calculateAgeGroup = (dob) => {
        const currentDate = new Date();
        const birthDate = new Date(dob);
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDiff = currentDate.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age >= 18 && age <= 70) {
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
            if (person.gender === "male" && ageGroup !== "child" && ageGroup !== "aged") {
                menCount++;
            } else if (person.gender === "female" && ageGroup !== "child" && ageGroup !== "aged") {
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
                text: "Gender and Age Data",
                left: "center",
            },
            tooltip: {
                trigger: "item",
            },
            legend: {
                orient: "vertical",
                left: "left",
            },
            series: [
                {
                    name: "Access From",
                    type: "pie",
                    radius: "50%",
                    data: [
                        {
                            value: statistics.men,
                            name: `Men: ${statistics.men}`,
                        },
                        {
                            value: statistics.women,
                            name: `Women: ${statistics.women}`,
                        },
                        {
                            value: statistics.children,
                            name: `Children: ${statistics.children}`,
                        },
                        {
                            value: statistics.aged,
                            name: `Aged: ${statistics.aged}`,
                        },
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                },
            ],
        };
        myChart.setOption(option);

        return () => {
            myChart.dispose();
        };
    }, [initialData, statistics.aged, statistics.children, statistics.men, statistics.women]);

    return (
        <>
            <Header />
            <div className='dashboard-wrapper'>
                <Row>
                    <Col>
                        <Table data={filteredData} searchName={searchName} />
                    </Col>
                    <Col>
                        <h2>Charts</h2>
                        <div ref={chartRef} style={{ width: "100%", height: "400px" }} />
                        <div className='gender-age-stats'>
                            <p>{`Men: ${statistics.men} (>= 18 years and < 70 years)`}</p>
                            <p>{`Women: ${statistics.women} (>= 18 years and < 70 years)`}</p>
                            <p>{`Children: ${statistics.children} (< 18 years)`}</p>
                            <p>{`Aged: ${statistics.aged} (> 70 years)`}</p>
                        </div>
                        <h2>Average Income: </h2>{" "}
                        {formattedAverageIncome != "₦NaN" ? formattedAverageIncome : `₦ 0`}
                    </Col>
                </Row>
            </div>
            <Footer />
        </>
    );
}

export default Dashboard;
