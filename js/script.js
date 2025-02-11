document.addEventListener("DOMContentLoaded", function () {
  const getMonthlyData = (month) => {
    const income = document.getElementById(`income-${month}`).value;
    const expenses = document.getElementById(`expenses-${month}`).value;
    return {
      income: parseFloat(income) || 0,
      expenses: parseFloat(expenses) || 0,
    };
  };

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const incomeData = [];
  const expensesData = [];

  months.forEach((month) => {
    const data = getMonthlyData(month);
    incomeData.push(data.income);
    expensesData.push(data.expenses);
  });

  const ctx = document.getElementById("myBarChart").getContext("2d");
  const myBarChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Income",
          data: incomeData,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Expenses",
          data: expensesData,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  const updateChart = () => {
    incomeData.length = 0;
    expensesData.length = 0;

    months.forEach((month) => {
      const data = getMonthlyData(month);
      incomeData.push(data.income);
      expensesData.push(data.expenses);
    });

    myBarChart.update();
  };

  months.forEach((month) => {
    document.getElementById(`income-${month}`).addEventListener("input", updateChart);
    document.getElementById(`expenses-${month}`).addEventListener("input", updateChart);
  });
});
